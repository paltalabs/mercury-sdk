import { GetReceivedPaymentsResponse } from "../../types";
import { stellarAssetId } from "../convert";
import * as StellarSdk from "@stellar/stellar-sdk";

export interface getReceivedPaymentsParsed {
  from?: string;
  to?: string;
  amount?: string;
  assetNative?: boolean;
  asset?: string;
  ledger?: number;
  timestamp?: number;
}

export const getReceivedPaymentsParser = (
  data: GetReceivedPaymentsResponse,
): getReceivedPaymentsParsed[] => {
  const parsedData = data?.paymentsToPublicKey?.edges?.map((payment) => {
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
