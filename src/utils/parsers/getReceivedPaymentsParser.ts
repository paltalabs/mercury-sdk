import { GetReceivedPaymentsResponse } from "../../types";

export interface getReceivedPaymentsParsed {
  from?: string;
  to?: string;
  amount?: string;
  assetNative?: boolean;
  asset?: string;
}

export const getReceivedPaymentsParser = (
  data: GetReceivedPaymentsResponse
): getReceivedPaymentsParsed[] => {
  const parsedData = data?.paymentsToPublicKey?.edges?.map((payment) => {
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
