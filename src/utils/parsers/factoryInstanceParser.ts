import { ContractEntriesResponse, ParsedRouterEntry } from "../../types";
import { scValToJs } from "../convert";
import * as StellarSdk from "@stellar/stellar-sdk";
enum DataKey {
  FeeTo = 0,        // address public feeTo;
  FeeToSetter = 1,  // address public feeToSetter;
  AllPairs = 2,     //  address[] public allPairs;
  PairsMapping = 3, // Map of pairs
  PairWasmHash = 4,
  FeesEnabled = 5, // bool is taking fees?
}

export const factoryInstanceParser = (data: ContractEntriesResponse) => {
  if (!data.entryUpdateByContractId) {
    throw new Error("No entries provided")
  }
  const parsedEntries: ParsedRouterEntry[] = []
  for (const entry of data.entryUpdateByContractId.edges) {
    const base64Xdr = entry.node.valueXdr
    if (!base64Xdr) {
        throw new Error("No valueXdr found in the entry")
    }
    const parsedData:any = StellarSdk.xdr.ScVal.fromXDR(base64Xdr, "base64");
    const jsValues: any = scValToJs(parsedData)
    const parsedValue = {} as ParsedRouterEntry
    if(typeof(jsValues.storage) !== "undefined"){
      for (let key in jsValues.storage()) {
          const i: number = parseInt(key)
          const element = jsValues.storage()[key].val()
          Object.assign(parsedValue, {[DataKey[i]]: scValToJs(element)})
      }
    parsedEntries.push(parsedValue)
    }
  }
  return parsedEntries;
};