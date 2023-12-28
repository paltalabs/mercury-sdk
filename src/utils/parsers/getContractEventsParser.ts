import { GetContractEventsResponse } from "../../types";
import { scValToJs } from "../convert";
import * as StellarSdk from "@stellar/stellar-sdk";

export const getContractEventsParser = (data: GetContractEventsResponse) => {
  const parsedData = data.eventByContractId.edges.map((edge) => {
    const base64Xdr = edge.node.data;

    const data = StellarSdk.xdr.ScVal.fromXDR(base64Xdr, "base64");

    const jsValues: any = scValToJs(data);

    const topic1Xdr = StellarSdk.xdr.ScVal.fromXDR(edge.node.topic1, "base64")
    const topic1Js = scValToJs(topic1Xdr);
    const topic2Xdr = StellarSdk.xdr.ScVal.fromXDR(edge.node.topic2, "base64")
    const topic2Js = scValToJs(topic2Xdr);
    console.log("topic1Js:", topic1Js)
    console.log("topic2Js:", topic2Js)
    
    jsValues.topic1 = topic1Js;
    jsValues.topic2 = topic2Js;

    return jsValues;
  });

  return parsedData;
};
