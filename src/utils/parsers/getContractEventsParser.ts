import { GetContractEventsResponse } from "../../types";
import { scValToJs } from "../convert";
import * as StellarSdk from "@stellar/stellar-sdk";

export const getContractEventsParser = (data: GetContractEventsResponse) => {
  const parsedData = data.eventByContractId.nodes.map((node) => {
    const base64Xdr = node.data;

    const data = StellarSdk.xdr.ScVal.fromXDR(base64Xdr, "base64");

    const jsValues: any = scValToJs(data);

    const topic1Xdr = StellarSdk.xdr.ScVal.fromXDR(node.topic1, "base64")
    const topic1Js = scValToJs(topic1Xdr);
    const topic2Xdr = StellarSdk.xdr.ScVal.fromXDR(node.topic2, "base64")
    const topic2Js = scValToJs(topic2Xdr);
        
    jsValues.topic1 = topic1Js;
    jsValues.topic2 = topic2Js;
    // Add ledger number and timestamp
    jsValues.ledger = node.ledger;
    jsValues.timestamp = node.ledgerTimestamp;

    return jsValues;
  });

  return parsedData;
};
