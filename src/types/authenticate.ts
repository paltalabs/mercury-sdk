export interface AuthenticateData {
  clientMutationId: string | null;
  jwtToken: string;
}

export interface AuthenticateResponse {
  authenticate: AuthenticateData;
}
