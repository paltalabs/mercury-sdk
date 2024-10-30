import { GetSentPaymentsResponse } from "../../types";
import { stellarAssetId } from "../convert";

export interface getSentPaymentsParsed {
  from?: string;
  to?: string;
  amount?: string;
  assetNative?: boolean;
  asset?: string;
}

export const getSentPaymentsParser = (data: GetSentPaymentsResponse): getSentPaymentsParsed[] => {
  const parsedData = data?.paymentsByPublicKey?.edges?.map((payment) => {
    console.log("payment:", payment);
    return {
      from: payment?.node?.accountBySource?.publickey,
      to: payment?.node?.accountByDestination?.publickey,
      amount: payment?.node?.amount,
      assetNative: payment?.node?.assetNative,
      asset: stellarAssetId(payment?.node?.assetByAsset?.code, payment?.node?.assetByAsset?.issuer),
      ledger: payment?.node?.txInfoByTx?.ledgerByLedger?.sequence,
      timestamp: payment?.node?.txInfoByTx?.ledgerByLedger?.closeTime,
    };
  });

  return parsedData;
};
