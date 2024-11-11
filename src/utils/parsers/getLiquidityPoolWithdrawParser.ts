import { LiquidityPoolWithdrawByPublicKeyResponse } from "../../types/liquidityPool";

export interface getLiquidityPoolWithdrawParsed {
  source?: number;
  poolId?: string;
  maxAmountA?: string;
  maxAmountB?: string;
  amount?: string;
  ledger?: number;
  timestamp?: number;
}

export const getLiquidityPoolWithdrawParser = (
  data: LiquidityPoolWithdrawByPublicKeyResponse,
): getLiquidityPoolWithdrawParsed[] => {
  const parsedData = data?.liquidityPoolWithdrawByPublicKey?.edges?.map((edge) => {
    return {
      source: edge?.node?.source,
      poolId: edge?.node?.poolId,
      amount: edge?.node?.amount,
      maxAmountA: edge?.node?.maxAmountA,
      maxAmountB: edge?.node?.maxAmountB,
      ledger: edge?.node?.txInfoByTx?.ledgerByLedger?.sequence,
      timestamp: edge?.node?.txInfoByTx?.ledgerByLedger?.closeTime,
    };
  });

  return parsedData;
};
