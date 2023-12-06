import axios, { AxiosError } from "axios";

import { getMutationFromFile, getQueryFromFile, toSnakeCase } from "./utils";
import { GraphQLClient } from "graphql-request";
import { QUERIES_FILES, MUTATIONS_FILES } from "./graphql";
import {
  ApiResponse,
  backendRequestArgs,
  AuthenticateResponse,
  GetPathPaymentsStrictSendByPublicKeyResponse,
  GetPathPaymentsStrictReceiveByPublicKeyResponse,
  GetReceivedPaymentsResponse,
  GetSentPaymentsResponse,
  LiquidityPoolDepositByPublicKeyResponse,
  GraphQLRequestArgs,
  SubscribeToFullAccountArgs,
  SubscribeToLedgerEntriesArgs,
  SubscribeToLedgerEntriesExpirationArgs,
} from "./types";
import { SubscribeToContractEventsArgs } from "./types/subscriptions";

interface MercuryOptions {
  backendEndpoint: string;
  graphqlEndpoint: string;
  defaultMaxSingleSize?: number;
  email: string;
  password: string;
  updateTokenOnRequest?: boolean;
}

export class Mercury {
  private readonly _backendEndpoint: string;
  private readonly _graphqlClient: GraphQLClient;
  private readonly _defaultMaxSingleSize: number;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _updateTokenOnRequest: boolean;
  private _accessToken: string = "";

  /**
   * Constructs a Mercury instance with given configuration options.
   * @param options Configuration options for the Mercury instance.
   *  - backendEndpoint: URL of the backend endpoint.
   *  - graphqlEndpoint: URL of the graphql endpoint.
   *  - email: Email associated with the Mercury account (optional).
   *  - password: Password for the Mercury account (optional).
   *  - defaultMaxSingleSize (optional): Default max single size for subscriptions.
   *  If not provided, the default value is 2000.
   * - updateTokenOnRequest (optional): Whether to update the access token when calling a request or not.
   *  If not provided, the default value is true. If you set this to false, you will have to manually call updateAccessToken() to generate/update the access token.
   */
  constructor(options: MercuryOptions) {
    this._backendEndpoint = options.backendEndpoint;
    this._graphqlClient = new GraphQLClient(
      options.graphqlEndpoint + "/graphql"
    );
    this._defaultMaxSingleSize = options.defaultMaxSingleSize ?? 2000;
    this._email = options.email;
    this._password = options.password;
    this._updateTokenOnRequest = options.updateTokenOnRequest ?? true;
  }

  /**
   * Updates _accessToken
   * @param token token to be updated
   */
  private _updateAccessToken(token: string) {
    this._accessToken = token;
  }

  /**
   * Usefull for creating request bodies in snake case for the mercury backend.
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
   * @param method HTTP method (GET, POST, PUT, DELETE).
   * @param url Endpoint URL.
   * @param body Request body.
   * @param updateToken Whether to update the access token when calling the request or not.
   * @returns ApiResponse with data or error information.
   */
  private async _backendRequest<T = any>({
    method,
    body,
    url,
    updateToken = this._updateTokenOnRequest,
  }: backendRequestArgs): Promise<ApiResponse<T>> {
    try {
      if (updateToken) {
        await this.updateAccessToken();
      }
      const { data } = await axios.request<T>({
        method,
        url: this._backendEndpoint + url,
        data: body,
        headers: {
          Authorization: `Bearer ${this._accessToken}`,
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
   * @param body Request body.
   *  - request: GraphQL request.
   *  - variables: GraphQL variables.
   * @param updateToken Whether to update the access token when calling the request or not.
   * @param headers Request headers.
   * @returns ApiResponse with data or error information.
   */
  private async _graphqlRequest<T = any>({
    body,
    headers,
    updateToken = this._updateTokenOnRequest,
  }: GraphQLRequestArgs): Promise<ApiResponse<T>> {
    try {
      if (updateToken) {
        await this.updateAccessToken();
      }

      const data = await this._graphqlClient.request<T>(
        body.request,
        body.variables,
        headers ?? {
          Authorization: `Bearer ${this._accessToken}`,
        }
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
   *   - address: Public key of the account to subscribe to.
   * @returns Subscription result.
   */
  public async subscribeToFullAccount(args: SubscribeToFullAccountArgs) {
    const body = this._createRequestBody(args);
    return this._backendRequest({ method: "POST", url: "/account", body });
  }

  /**
   * Create a new subscription to a ledger entry. This is especially useful in scenarios where events alone don't give you enough context.
   * @param args Arguments for the subscription:
   *   - contractId: ID of the contract.
   *   - keyXdr: Entry key as base64 xdr
   *   - maxSingleSize (optional): How much will one event cost at most (default: 2000)
   * @returns Subscription result.
   */
  public async subscribeToLedgerEntries(args: SubscribeToLedgerEntriesArgs) {
    const body = this._createRequestBody(args, {
      maxSingleSize: this._defaultMaxSingleSize,
    });
    return this._backendRequest({ method: "POST", url: "/entry", body });
  }

  /**
   * Subscribes to the expiration of ledger entries.
   * @param args Arguments for the subscription:
   *   - hashXdr: Base64 xdr of your entry's hash
   * @returns Subscription result.
   */
  public async subscribeToLedgerEntriesExpiration(
    args: SubscribeToLedgerEntriesExpirationArgs
  ) {
    const body = this._createRequestBody(args);
    return this._backendRequest({ method: "POST", url: "/expiration", body });
  }

  /**
   * Updates access token.
   * @returns Update access token result.
   */
  public async updateAccessToken() {
    const mutation = getMutationFromFile(MUTATIONS_FILES.AUTHENTICATE);

    const res = await this._graphqlRequest<AuthenticateResponse>({
      body: {
        request: mutation,
        variables: {
          email: this._email,
          password: this._password,
        },
      },
      headers: {},
      updateToken: false,
    });

    if (res.ok && res.data?.authenticate?.jwtToken) {
      this._updateAccessToken(res.data.authenticate.jwtToken);
    }

    return res;
  }

  /**
   * Retrieves sent payments.
   * @param args Arguments for the query:
   *  - publicKey: Public key of the account to retrieve sent payments from.
   * @returns The result of the getSentPayments GraphQL query.
   */
  public async getSentPayments(args: { publicKey: string }) {
    const query = getQueryFromFile(QUERIES_FILES.GET_SENT_PAYMENTS);

    return this._graphqlRequest<GetSentPaymentsResponse>({
      body: {
        request: query,
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
    const query = getQueryFromFile(QUERIES_FILES.GET_RECEIVED_PAYMENTS);

    return this._graphqlRequest<GetReceivedPaymentsResponse>({
      body: {
        request: query,
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
    const query = getQueryFromFile(
      QUERIES_FILES.GET_PATH_PAYMENTS_STRICT_SEND_BY_PUBLIC_KEY
    );

    return this._graphqlRequest<GetPathPaymentsStrictReceiveByPublicKeyResponse>(
      {
        body: {
          request: query,
          variables: args,
        },
      }
    );
  }

  /**
   * @param args Arguments for the query:
   * - publicKey: Public key of the account to retrieve path payments strict receive from.
   * @returns Path payments strict receive by public key.
   */
  public async getPathPaymentsStrictReceive(args: { publicKey: string }) {
    const query = getQueryFromFile(
      QUERIES_FILES.GET_PATH_PAYMENTS_STRICT_RECEIVE_BY_PUBLIC_KEY
    );

    return this._graphqlRequest<GetPathPaymentsStrictSendByPublicKeyResponse>({
      body: {
        request: query,
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
    const query = getQueryFromFile(
      QUERIES_FILES.GET_LIQUIDITY_POOL_WITHDRAW_BY_PUBLIC_KEY
    );

    //TODO: Type the response

    return this._graphqlRequest({
      body: {
        request: query,
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
    const query = getQueryFromFile(
      QUERIES_FILES.GET_LIQUIDITY_POOL_DEPOSIT_BY_PUBLIC_KEY
    );

    return this._graphqlRequest<LiquidityPoolDepositByPublicKeyResponse>({
      body: {
        request: query,
        variables: args,
      },
    });
  }
}
