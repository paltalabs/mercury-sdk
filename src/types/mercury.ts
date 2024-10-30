import { GraphQLClientRequestHeaders } from "graphql-request/build/esm/types";

export interface GraphQLRequestArgs {
  body: { request: string; variables?: any };
  headers?: GraphQLClientRequestHeaders;
}

export interface backendRequestArgs {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url?: string;
  body?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  data: T | null;
  error?: string;
}
