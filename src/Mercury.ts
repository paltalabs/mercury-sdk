import axios, { AxiosError } from "axios";
import { GraphQLClient } from "graphql-request";
import {
  ApiResponse,
  backendRequestArgs,
  GetPathPaymentsStrictSendByPublicKeyResponse,
  GetPathPaymentsStrictReceiveByPublicKeyResponse,
  GetReceivedPaymentsResponse,
  GetSentPaymentsResponse,
  LiquidityPoolDepositByPublicKeyResponse,
  GraphQLRequestArgs,
  SubscribeToFullAccountArgs,
  SubscribeToLedgerEntriesArgs,
  SubscribeToLedgerEntriesExpirationArgs,
  LiquidityPoolWithdrawByPublicKeyResponse,
  GetContractEventsResponse,
  GetAllContractEventSubscriptionsResponse,
  GetAllFullAccountSubscriptionsResponse,
  ContractEntriesResponse,
  SubscribeToMultipleLedgerEntriesArgs,
} from "./types";
import { SubscribeToContractEventsArgs } from "./types/subscriptions";
import { toSnakeCase } from "./utils";
import { QUERIES } from "./graphql";

interface MercuryOptions {
  backendEndpoint: string;
  graphqlEndpoint: string;
  defaultMaxSingleSize?: number;
  shouldFetchApiKey?: boolean;
  jwt?: string;
  apiKey?: string;
}

export class Mercury {
  private readonly _backendEndpoint: string;
  private readonly _graphqlClient: GraphQLClient;
  private readonly _defaultMaxSingleSize: number;
  private _accessToken: string = "";

  /**
   * Constructs a Mercury instance with given configuration options.
   * @param options Configuration options for the Mercury instance.
   *  - backendEndpoint: URL of the backend endpoint.
   *  - graphqlEndpoint: URL of the graphql endpoint.
   *  - defaultMaxSingleSize (optional): Default max single size for subscriptions.
   *    If not provided, the default value is 2000.
   *  - shouldFetchApiKey (optional): Whether to fetch an API key from the server or not.
   *    If not provided, it is left undefined.
   *  - jwt (optional): JWT token for fetching an API key. Must be provided if shouldFetchApiKey is true.
   *  - apiKey (optional): API key for the Mercury account. Must always be provided, except in the
   *    post-install script, which is where the key is fetched to begin with.
   */
  constructor(options: MercuryOptions) {
    if (options.shouldFetchApiKey && options.jwt) {
      this._accessToken = `Bearer ${options.jwt}`;
    } else if (options.shouldFetchApiKey) {
      throw new Error("You must provide a JWT token if you want to fetch an API key.");
    } else if (options.jwt) {
      throw new Error("Please provide a JWT token only if you are creating an API key");
    } else if (options.apiKey) {
      this._accessToken = options.apiKey;
    } else {
      throw new Error("You must provide an API key.");
    }

    this._backendEndpoint = options.backendEndpoint;
    this._graphqlClient = new GraphQLClient(options.graphqlEndpoint + "/graphql");
    this._defaultMaxSingleSize = options.defaultMaxSingleSize ?? 2000;
  }

  /**
   * Generates a new API key for the Mercury account.
   * @returns The new API key.
   */
  public async generateApiKey() {
    const response = await this._backendRequest<{ key: string }>({
      method: "POST",
      url: "/v2/key",
    });

    if (response.ok && response.data?.key) {
      return response.data.key;
    }

    throw new Error("Failed to generate API key.");
  }

  /**
   * Useful for creating request bodies in snake case for the Mercury backend.
   * @param methodArgs Arguments specific to the method.
   * @param defaultArgs Default arguments to be combined.
   * @returns The combined arguments in snake case.
   */
  private _createRequestBody(methodArgs: any, defaultArgs?: any) {
    const combinedArgs = {
      ...defaultArgs,
      ...methodArgs,
    };
    return toSnakeCase(combinedArgs);
  }

  /**
   * Generic method to make a backend request.
   * @param args Object containing the following properties:
   * - method HTTP method (GET, POST, PUT, DELETE).
   * - url Endpoint URL.
   * - body Request body.
   * @returns ApiResponse with data or error information.
   */
  private async _backendRequest<T = any>(args: backendRequestArgs): Promise<ApiResponse<T>> {
    const { method, body, url } = args;
    try {
      const { data } = await axios.request<T>({
        method,
        url: this._backendEndpoint + url,
        data: body,
        headers: {
          Authorization: this._accessToken,
          "Content-Type": "application/json",
        },
      });
      return { ok: true, data };
    } catch (error: unknown) {
      return {
        ok: false,
        data: null,
        error: (error as AxiosError)?.message ?? "Unknown error",
      };
    }
  }

  /**
   * Generic method to make a graphql request.
   * @param args Object containing the following properties:
   *  - body: Request body.
   *    - request: GraphQL request.
   *    - variables: GraphQL variables.
   *  - headers: Request headers.
   * @returns ApiResponse with data or error information.
   */
  private async _graphqlRequest<T = any>(args: GraphQLRequestArgs): Promise<ApiResponse<T>> {
    const { body, headers } = args;
    try {
      const data = await this._graphqlClient.request<T>(
        body.request,
        body.variables,
        headers ?? {
          Authorization: this._accessToken,
        },
      );

      return { ok: true, data };
    } catch (error: unknown) {
      return {
        ok: false,
        data: null,
        error: (error as AxiosError)?.message ?? "Unknown error",
      };
    }
  }

  /**
   * Create a new subscription to a contract event
   * @param args Arguments for the subscription:
   *   - contractId: ID of the contract to subscribe to.
   *   - maxSingleSize (optional): How much will one event cost at most (default: 2000)
   *   - topic1, topic2, topic3, topic4 (optional): Topics to filter the events.
   * @returns Subscription result.
   */
  public async subscribeToContractEvents(args: SubscribeToContractEventsArgs) {
    const body = this._createRequestBody(args, {
      maxSingleSize: this._defaultMaxSingleSize,
    });
    return this._backendRequest({ method: "POST", url: "/event", body });
  }

  /**
   * Subscribes to the full account details.
   * @param args Arguments for the subscription:
   *   - publicKey: Public key of the account to subscribe to.
   * @returns Subscription result.
   */
  public async subscribeToFullAccount(args: SubscribeToFullAccountArgs) {
    const publickey = args.publicKey;

    return this._backendRequest({
      method: "POST",
      url: "/account",
      body: { publickey },
    });
  }

  /**
   * Create a new subscription to a ledger entry. This is especially useful in scenarios where events alone don't give you enough context.
   * @param args Arguments for the subscription:
   *   - contractId: ID of the contract.
   *   - keyXdr: Entry key as base64 xdr.
   *   - durability: Durability of the entry.
   *   - maxSingleSize (optional): How much will one event cost at most (default: 2000)
   * @returns Subscription result.
   */
  public async subscribeToLedgerEntries(args: SubscribeToLedgerEntriesArgs) {
    const body = this._createRequestBody(args, {
      maxSingleSize: this._defaultMaxSingleSize,
      durability: args.durability,
      keyXdr: args.keyXdr,
      hydrate: args.hydrate ?? true,
    });
    const response = await this._backendRequest({
      method: "POST",
      url: "/entry",
      body,
    }).catch((error: string) => {
      console.error(error);
    });
    return response;
  }

  /**
   * Subscribes to multiple ledger entries.
   *
   * @param args - The arguments for subscribing to multiple ledger entries.
   * @returns An array of results for each subscribed ledger entry.
   */
  public async subscribeToMultipleLedgerEntries(args: SubscribeToMultipleLedgerEntriesArgs) {
    const results = [];
    for (let i = 0; i < args.contractId.length; i++) {
      const body = this._createRequestBody({
        contractId: args.contractId[i],
        keyXdr: args.keyXdr,
        durability: args.durability,
        hydrate: args.hydrate ?? true,
      });
      const response = await this._backendRequest({
        method: "POST",
        url: "/entry",
        body,
      });
      results.push(response);
    }
    return results;
  }

  /**
   * Subscribes to the expiration of ledger entries.
   * @param args Arguments for the subscription:
   *   - hashXdr: Base64 xdr of your entry's hash
   * @returns Subscription result.
   */
  public async subscribeToLedgerEntriesExpiration(args: SubscribeToLedgerEntriesExpirationArgs) {
    const body = this._createRequestBody(args);
    return this._backendRequest({ method: "POST", url: "/expiration", body });
  }

  /**
   * Retrieves sent payments.
   * @param args Arguments for the query:
   *  - publicKey: Public key of the account to retrieve sent payments from.
   * @returns The result of the getSentPayments GraphQL query.
   */
  public async getSentPayments(args: { publicKey: string }) {
    return this._graphqlRequest<GetSentPaymentsResponse>({
      body: {
        request: QUERIES.GET_SENT_PAYMENTS,
        variables: args,
      },
    });
  }

  /**
   * Retrieves received payments.
   * @param args Arguments for the query:
   * - publicKey: Public key of the account to retrieve received payments from.
   * @returns Received payments of given public key.
   */
  public async getReceivedPayments(args: { publicKey: string }) {
    return this._graphqlRequest<GetReceivedPaymentsResponse>({
      body: {
        request: QUERIES.GET_RECEIVED_PAYMENTS,
        variables: args,
      },
    });
  }

  /**
   * @param args Arguments for the query:
   * - publicKey: Public key of the account to retrieve path payments strict send from.
   * @returns Path payments strict send by public key.
   */
  public async getPathPaymentsStrictSend(args: { publicKey: string }) {
    return this._graphqlRequest<GetPathPaymentsStrictSendByPublicKeyResponse>({
      body: {
        request: QUERIES.GET_PATH_PAYMENTS_STRICT_SEND_BY_PUBLIC_KEY,
        variables: args,
      },
    });
  }

  /**
   * @param args Arguments for the query:
   * - publicKey: Public key of the account to retrieve path payments strict receive from.
   * @returns Path payments strict receive by public key.
   */
  public async getPathPaymentsStrictReceive(args: { publicKey: string }) {
    return this._graphqlRequest<GetPathPaymentsStrictReceiveByPublicKeyResponse>({
      body: {
        request: QUERIES.GET_PATH_PAYMENTS_STRICT_RECEIVE_BY_PUBLIC_KEY,
        variables: args,
      },
    });
  }

  /**
   * @param args Arguments for the query:
   * - publicKey: Public key of the account to retrieve liquidity pool withdraw from.
   * @returns Liquidity pool withdraw by public key.
   */
  public async getLiquidityPoolWithdraw(args: { publicKey: string }) {
    //TODO: Type the response

    return this._graphqlRequest<LiquidityPoolWithdrawByPublicKeyResponse>({
      body: {
        request: QUERIES.GET_LIQUIDITY_POOL_WITHDRAW_BY_PUBLIC_KEY,
        variables: args,
      },
    });
  }

  /**
   * @param args Arguments for the query:
   * - publicKey: Public key of the account to retrieve liquidity pool deposit from.
   * @returns Liquidity pool deposit by public key.
   */
  public async getLiquidityPoolDeposit(args: { publicKey: string }) {
    return this._graphqlRequest<LiquidityPoolDepositByPublicKeyResponse>({
      body: {
        request: QUERIES.GET_LIQUIDITY_POOL_DEPOSIT_BY_PUBLIC_KEY,
        variables: args,
      },
    });
  }

  /**
   * @returns All contracts event subscriptions.
   */
  public async getAllContractEventSubscriptions() {
    return this._graphqlRequest<GetAllContractEventSubscriptionsResponse>({
      body: {
        request: QUERIES.GET_ALL_CONTRACT_EVENT_SUBSCRIPTIONS,
      },
    });
  }

  /**
   * @returns All full account subscriptions.
   */
  public async getAllFullAccountSubscriptions() {
    return this._graphqlRequest<GetAllFullAccountSubscriptionsResponse>({
      body: {
        request: QUERIES.GET_ALL_FULL_ACCOUNT_SUBSCRIPTIONS,
      },
    });
  }

  /**
   * @param args Arguments for the query:
   * - contractId: Contract ID to retrieve subscriptions from.
   * @returns Events the contract is subscribed to.
   */
  public async getContractEvents(args: { contractId: string }) {
    return this._graphqlRequest<GetContractEventsResponse>({
      body: {
        request: QUERIES.GET_CONTRACT_EVENTS,
        variables: args,
      },
    });
  }

  /**
   * Retrieves all factory contract data based on the provided contract ID.
   * @param args - The arguments for the request.
   * @param args.contractId - The ID of the factory contract.
   * @returns A promise that resolves to the response containing the factory contract data.
   */
  public async getContractEntries(args: { contractId: string }) {
    return this._graphqlRequest<ContractEntriesResponse>({
      body: {
        request: QUERIES.GET_CONTRACT_ENTRIES,
        variables: args,
      },
    });
  }

  /**
   * Executes a custom GrapihQL query.
   * @param args - The query request and optional variables.
   * @returns A promise that resolves to the result of the query.
   */
  public async getCustomQuery(args: { request: string; variables?: any }) {
    return this._graphqlRequest({
      body: {
        request: QUERIES.getCustomQuery(args.request),
        variables: args.variables,
      },
    });
  }

  /**
   * Calls a specific serverless function with the provided arguments.
   * @param args Object containing the following properties:
   *  - functionName: Name of the serverless function to call.
   *  - arguments: Arguments to be passed to the function in object format.
   * @returns ApiResponse with data or error information.
   */
  public async callServerlessFunction(args: { functionName: string; arguments: Object }) {
    try {
      JSON.stringify(args.arguments);
    } catch (error) {
      return {
        ok: false,
        data: null,
        error: "Invalid arguments",
      };
    }

    const body = {
      mode: {
        Function: {
          fname: args.functionName,
          arguments: JSON.stringify(args.arguments),
        },
      },
    };

    return this._backendRequest({
      method: "POST",
      url: "/zephyr/execute",
      body,
    });
  }
}
