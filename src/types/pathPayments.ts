export interface GetPathPaymentsStrictSendByPublicKeyResponse {
  pathPaymentsStrictSendByPublicKey: PathPaymentsNodes<NodeStrictSend>;
}
export interface GetPathPaymentsStrictReceiveByPublicKeyResponse {
  pathPaymentsStrictReceiveByPublicKey: PathPaymentsNodes<NodeStrictReceive>;
}

export interface PathPaymentsNodes<N extends NodeBase = Node> {
  nodes: N[];
}

export interface NodeBase {
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
  path1Native: boolean;
  path2Native: boolean;
  path3Native: boolean;
  path4Native: boolean;
  path5Native: AssetBy;
  sendAssetNative: boolean;
}

export interface NodeStrictSend extends NodeBase {
  sendAmount: string;
  destMin: string;
}

export interface NodeStrictReceive extends NodeBase {
  destAmount: string;
  sendMax: string;
}

export type Node = NodeStrictSend | NodeStrictReceive;

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
