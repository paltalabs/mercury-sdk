import { ContractEntriesResponse } from "../../types";
import { scValToJs } from "../convert";
import * as StellarSdk from "@stellar/stellar-sdk";

export const FactoryInstanceParser = (data: ContractEntriesResponse) => {
  const base64Xdr = data.entryUpdateByContractId.edges[0].node.valueXdr
  const parsedData:any = StellarSdk.xdr.ScVal.fromXDR(base64Xdr, "base64");
  const jsValues: any = scValToJs(parsedData)
  const storageValues = jsValues.storage()[2].val()
  const parsedValues: Array<any> = scValToJs(storageValues)
  console.log("values:", parsedValues)

  return parsedValues;
};
