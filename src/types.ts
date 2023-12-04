import { GraphQLClientRequestHeaders } from "graphql-request/build/esm/types";

export interface GraphQLRequestArgs {
  body: { request: string; variables?: any };
  headers?: GraphQLClientRequestHeaders;
  updateToken?: boolean;
}

export interface backendRequestArgs {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url?: string;
  body?: Record<string, any>;
  updateToken?: boolean;
}

export interface SubscribeToContractEventsArgs {
  contractId: string;
  maxSingleSize?: number;
  topic1?: string;
  topic2?: string;
  topic3?: string;
  topic4?: string;
}

export interface SubscribeToLedgerEntriesArgs {
  contractId: string;
  keyXdr: string;
  maxSingleSize?: number;
}

export interface SubscribeToLedgerEntriesExpirationArgs {
  hashXdr: string;
}

export interface SubscribeToFullAccountArgs {
  address: string;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  data: T | null;
  error?: string;
}

export interface GraphQLAuthenticateData {
  clientMutationId: string | null;
  jwtToken: string;
}

export interface GraphQLAuthenticateResponse {
  authenticate: GraphQLAuthenticateData;
}

export interface GraphQLGetReceivedPaymentsResponse {
  paymentsToPublicKey: PaymentsData;
}

export interface GraphQLGetSentPaymentsResponse {
  paymentsByPublicKey: PaymentsData;
}

export interface PaymentsData {
  edges: any[];
}
