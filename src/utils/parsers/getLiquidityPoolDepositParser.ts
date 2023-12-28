import { LiquidityPoolDepositByPublicKeyResponse } from "../../types/liquidityPool";

export interface getLiquidityPoolDepositParsed {
  source?: number;
  poolId?: string;
  maxAmountA?: string;
  maxAmountB?: string;
  minPriceN?: number;
  minPriceD?: number;
  maxPriceN?: number;
  maxPriceD?: number;
  ledger?: number;
  timestamp?: number;
}

export const getLiquidityPoolDepositParser = (
  data: LiquidityPoolDepositByPublicKeyResponse
): getLiquidityPoolDepositParsed[] => {
  const parsedData = data?.liquidityPoolDepositByPublicKey?.edges?.map(
    (edge) => {
      return {
        source: edge?.node?.source,
        poolId: edge?.node?.poolId,
        maxAmountA: edge?.node?.maxAmountA,
        maxAmountB: edge?.node?.maxAmountB,
        minPriceN: edge?.node?.minPriceN,
        minPriceD: edge?.node?.minPriceD,
        maxPriceN: edge?.node?.maxPriceN,
        maxPriceD: edge?.node?.maxPriceD,
        ledger: edge?.node?.txInfoByTx?.ledgerByLedger?.sequence,
        timestamp: edge?.node?.txInfoByTx?.ledgerByLedger?.closeTime,
      };
    }
  );

  return parsedData;
};
