import { AssetBy } from "./pathPayments";

export interface GetReceivedPaymentsResponse {
  paymentsToPublicKey: PaymentsData;
}

export interface GetSentPaymentsResponse {
  paymentsByPublicKey: PaymentsData;
}

export interface PaymentsData {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  amount: string;
  assetByAsset: AssetBy;
  accountByDestination: AccountBy;
  accountBySource: AccountBy;
  muxedaccountByDestinationMuxed: any;
  muxedaccountBySourceMuxed: any;
  ledgerByLedger: LedgerByLedger;
  assetNative: boolean;
  txInfoByTx: TxInfoByTx;
}

export interface TxInfoByTx {
  ledgerByLedger: LedgerByLedger;
}

export interface AccountBy {
  publickey: string;
}

export interface LedgerByLedger {
  closeTime: number;
  sequence: number;
}
