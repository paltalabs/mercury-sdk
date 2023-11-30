import { AxiosError, AxiosHeaders, AxiosInstance, AxiosRequestHeaders } from "axios";
import {
  ApiResponse,
  GraphQLResponse,
  SubscribeToContractEventsArgs,
  SubscribeToFullAccountArgs,
  SubscribeToLedgerEntriesArgs,
  SubscribeToLedgerEntriesExpirationArgs,
} from "./types";
import { createAxiosInstance, toSnakeCase } from "./utils";
interface MercuryOptions {
  backendEndpoint: string;
  accessToken: string;
  graphqlEndpoint: string;
  defaultMaxSingleSize?: number;
  email?: string;
  password?: string;
}

export class Mercury {
  private readonly _backendInstance: AxiosInstance;
  private readonly _graphqlInstance: AxiosInstance;
  private readonly _defaultMaxSingleSize: number;
  private _accessToken: string;
  private _email: string | undefined;
  private _password: string | undefined;

  /**
   * Constructs a Mercury instance with given configuration options.
   * @param options Configuration options for the Mercury instance.
   *  - backendEndpoint: URL of the backend endpoint.
   *  - graphqlEndpoint: URL of the graphql endpoint.
   *  - accessToken: Your mercury access token.
   *  - email: Email associated with the Mercury account (optional).
   *  - password: Password for the Mercury account (optional).
   *  - defaultMaxSingleSize (optional): Default max single size for subscriptions.
   *  If not provided, the default value is 2000.
   */
  constructor(options: MercuryOptions) {
    this._backendInstance = createAxiosInstance(
      options.backendEndpoint,
      options.accessToken
    );
    this._graphqlInstance = createAxiosInstance(
      options.graphqlEndpoint,
      options.accessToken
    );
    this._defaultMaxSingleSize = options.defaultMaxSingleSize ?? 2000;
    this._accessToken = options.accessToken;
    this._email = options.email;
    this._password = options.password;

  }
  /**
   * Updates _accessToken
   * @param token token to be updated
   */
  private _updateAccessToken(token: string) {
    this._accessToken = token;
  }

  /**
   * Creates a request body by combining method arguments with default arguments.
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
   * @returns ApiResponse with data or error information.
   */
  private async _backendRequest<T = any>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url?: string,
    body?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    try {
      const { data } = await this._backendInstance.request<T>({
        method,
        url,
        data: body,
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
 * @param method HTTP method (GET, POST, PUT, DELETE).
 * @param url Endpoint URL.
 * @param body Request body.
 * @returns ApiResponse with data or error information.
 */
  private async _graphqlRequest<T = any>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url?: string,
    body?: Record<string, any>,
    headers?: AxiosRequestHeaders
  ): Promise<ApiResponse<T>> {
    try {
      const { data } = await this._graphqlInstance.request<T>({
        method,
        url,
        data: body,
        headers: headers as AxiosHeaders || this._graphqlInstance.defaults.headers, // Use provided headers or default headers
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
    return this._backendRequest("POST", "/event", body);
  }

  /**
   * Subscribes to the full account details.
   * @param args Arguments for the subscription:
   *   - address: Public key of the account to subscribe to.
   * @returns Subscription result.
   */
  public async subscribeToFullAccount(args: SubscribeToFullAccountArgs) {
    const body = this._createRequestBody(args);
    return this._backendRequest("POST", "/account", body);
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
    return this._backendRequest("POST", "/entry", body);
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
    return this._backendRequest("POST", "/expiration", body);
  }

  /**
 * Updates access token.
 * @returns Update access token result.
 */
  public async updateAccessToken() {
    const mutation = `mutation MyMutation {
      authenticate(input: {email: "${this._email}", password: "${this._password}"}) {
        clientMutationId
        jwtToken
      }
    }`;
    const args = {
      query: mutation
    }
    const headers = {
      Authorization: undefined
    }
    const body = this._createRequestBody(args);
    const res = await this._graphqlRequest<ApiResponse<GraphQLResponse>>("POST", "/graphql", body, headers as AxiosRequestHeaders);
    if (res.ok && res.data && res.data.data) {
      const authenticate = res.data.data.authenticate;
      const {jwtToken} = authenticate;
      this._updateAccessToken(jwtToken)
    }
    return res
  }


}
