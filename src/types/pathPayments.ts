export interface GetPathPaymentsStrictSendByPublicKeyResponse {
  pathPaymentsStrictSendByPublicKey: PathPaymentsNodes;
}
export interface GetPathPaymentsStrictReceiveByPublicKeyResponse {
  pathPaymentsStrictReceiveByPublicKey: PathPaymentsNodes;
}

export interface PathPaymentsNodes {
  nodes: Node[];
}

export interface Node {
  ledgerByLedger: LedgerByLedger;
  accountBySource: AccountBy;
  accountByDestination: AccountBy;
  assetByDestAsset: AssetBy;
  assetByPath1: AssetBy;
  assetByPath2: AssetBy;
  assetByPath3: AssetBy;
  assetByPath4: AssetBy;
  assetByPath5: AssetBy;
  assetBySendAsset: AssetBy;
  destAssetNative: boolean;
  destMin: string;
  path1Native: boolean;
  path2Native: boolean;
  path3Native: boolean;
  path4Native: boolean;
  path5Native: AssetBy;
  sendAmount: string;
  sendAssetNative: boolean;
}

export interface AccountBy {
  publickey: string;
}

export interface AssetBy {
  code: string;
  issuer: string;
}

export interface LedgerByLedger {
  closeTime: number;
  sequence: number;
}
