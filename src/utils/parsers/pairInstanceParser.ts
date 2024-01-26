import { ContractEntriesResponse, PairEntry } from "../../types";
import { scValToJs } from "../convert";
import * as StellarSdk from "@stellar/stellar-sdk";

/**
 * Enum representing the key names for pair instance properties.
 */
enum keyNames {
    token0 = 0,         // address public token0;
    token1 = 1,         // address public token1;
    reserve0 = 2,       // uint112 private reserve0;
    reserve1 = 3,       // uint112 private reserve1;
    factoryAddress = 4, // address public factory; 
    totalShares = 5,    // TotalShares;
    pairToken = 6,      // liquidity pool token:
    pairAddress = 7,    // PairAddress;
}

/**
 * Parses the contract entries response and returns an array of parsed pair entries.
 * @param data The contract entries response object.
 * @returns An array of parsed pair entries.
 * @throws Error if no entries are provided or if no valueXdr is found in an entry.
 */
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
