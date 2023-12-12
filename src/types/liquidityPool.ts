export interface LiquidityPoolDepositByPublicKeyResponse {
  liquidityPoolDepositByPublicKey: LiquidityPoolDepositByPublicKey;
}

export interface LiquidityPoolDepositByPublicKey {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  source: number;
  sourceMuxed: null;
  poolId: string;
  maxAmountA: string;
  maxAmountB: string;
  minPriceN: number;
  minPriceD: number;
  maxPriceN: number;
  maxPriceD: number;
  ledger: number;
}

export interface LiquidityPoolWithdrawByPublicKeyResponse {
  liquidityPoolWithdrawByPublicKey: LiquidityPoolWithdrawByPublicKey;
}

export interface LiquidityPoolWithdrawByPublicKey {
  edges: Edge[];
}

export interface Node {
  source: number;
  sourceMuxed: null;
  poolId: string;
  amount: string;
  maxAmountA: string;
  maxAmountB: string;
  minPriceN: number;
  minPriceD: number;
  maxPriceN: number;
  maxPriceD: number;
  ledger: number;
}
