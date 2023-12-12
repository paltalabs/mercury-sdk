import { GetSentPaymentsResponse } from "../../types";

export interface getSentPaymentsParsed {
  from?: string;
  to?: string;
  amount?: string;
  assetNative?: boolean;
  asset?: string;
}

export const getSentPaymentsParser = (
  data: GetSentPaymentsResponse
): getSentPaymentsParsed[] => {
  const parsedData = data?.paymentsByPublicKey?.edges?.map((payment) => {
    return {
      from: payment?.node?.accountBySource?.publickey,
      to: payment?.node?.accountByDestination?.publickey,
      amount: payment?.node?.amount,
      assetNative: payment?.node?.assetNative,
      asset: payment?.node?.assetByAsset?.issuer,
    };
  });

  return parsedData;
};
