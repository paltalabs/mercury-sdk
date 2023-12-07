export interface GetReceivedPaymentsResponse {
  paymentsToPublicKey: PaymentsData;
}

export interface GetSentPaymentsResponse {
  paymentsByPublicKey: PaymentsData;
}

export interface PaymentsData {
  edges: any[];
}
