import { GetPathPaymentsStrictSendByPublicKeyResponse } from "../../types";

export interface getPathPaymentsStrictSendParsed {
  from?: string;
  to?: string;
  sendAmount?: string;
  sendAsset?: string;
  destMin?: string;
  destAsset?: string;
}

export const getPathPaymentsStrictSendParser = (
  data: GetPathPaymentsStrictSendByPublicKeyResponse
): getPathPaymentsStrictSendParsed[] => {
  const parsedData = data?.pathPaymentsStrictSendByPublicKey?.nodes?.map(
    (node) => {
      return {
        from: node?.accountBySource?.publickey,
        to: node?.accountByDestination?.publickey,
        sendAmount: node?.sendAmount,
        sendAsset: node?.assetBySendAsset?.issuer,
        destMin: node?.destMin,
        destAsset: node?.assetByDestAsset?.issuer,
      };
    }
  );

  return parsedData;
};
