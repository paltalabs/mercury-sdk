import { ContractEntriesResponse, PairEntry } from "../../types";
import { scValToJs } from "../convert";
import * as StellarSdk from "@stellar/stellar-sdk";
enum keyNames {
    Token0 = 0, // address public token0;
    Token1 = 1, // address public token1;
    Reserve0 = 2, //uint112 private reserve0;
    Reserve1 = 3, // uint112 private reserve1;
    FactoryAddress = 4,  // address public factory; 
    TotalShares = 5, // TotalShares,
    PairToken = 6, // liquidity pool token,
    PairAddress = 7, // PairAddress,
}

export const pairInstanceParser = (data: ContractEntriesResponse) => {
    if (!data.entryUpdateByContractId) {
      throw new Error("No entries provided")
    }
    const allEntries = data.entryUpdateByContractId.edges
    const parsedEntries: PairEntry[] = []
    for (const entry of allEntries) {
        if (!entry.node.valueXdr) {
            throw new Error("No valueXdr found in the entry")
        }        
        const base64Xdr = entry.node.valueXdr
        const parsedXdr = StellarSdk.xdr.ScVal.fromXDR(base64Xdr, "base64");
        const jsValues: any = scValToJs(parsedXdr)
        const parsedEntry = {} as PairEntry
        if(typeof(jsValues.storage) !== "undefined"){
            for (let key in jsValues.storage()) {
                const i: number = parseInt(key)
                const element = jsValues.storage()[key].val()
                Object.assign(parsedEntry, {[keyNames[i]]: scValToJs(element)})
            }
            parsedEntries.push(parsedEntry)
        }
    }
    return parsedEntries;
};
