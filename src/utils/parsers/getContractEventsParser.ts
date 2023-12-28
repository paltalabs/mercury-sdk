import { GetContractEventsResponse } from "../../types";
import { scValToJs } from "../convert";
import * as StellarSdk from "@stellar/stellar-sdk";

export const getContractEventsParser = (data: GetContractEventsResponse) => {
  const parsedData = data.eventByContractId.edges.map((edge) => {
    const base64Xdr = edge.node.data;

    const data = StellarSdk.xdr.ScVal.fromXDR(base64Xdr, "base64");

    const jsValues = scValToJs(data);

    return jsValues;
  });

  return parsedData;
};
