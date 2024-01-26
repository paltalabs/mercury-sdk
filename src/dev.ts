
import { Mercury } from "./Mercury";
import {
    factoryInstanceParser, pairInstanceParser
} from "."
import dotenv from "dotenv";
import { ApiResponse, ParsedRouterEntry } from "./types";
dotenv.config();

(async function () {
    const mercuryArgs = {
        backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
        graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
        email: process.env.MERCURY_TESTER_EMAIL,
        password: process.env.MERCURY_TESTER_PASSWORD,
    };

    const mercuryInstance = new Mercury({
        backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
        graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
        email: process.env.MERCURY_TESTER_EMAIL!,
        password: process.env.MERCURY_TESTER_PASSWORD!,
    });

    const factoryAddress = "CDSUTAZNBTBAMG2SVZ63FRIBIJOEBSRVVR4GZ3TDXX25AHUN5N3ZYMYU";
    const pairAddress = "CDYLINP2CX64S2YC4CCI44XH4H7K6Z2WB5UV3U33VIK36T7YATR2QTXP"
    const nullAddress= "CAFQFTDI3TW4BIK3UCDWV5VWODDYIOSCBZPS3LUHXE5PAPFCJMXM4QRJ"
    const args = {
        contractId: factoryAddress,
        keyXdr: "AAAAFA==",
        durability: "persistent"
    }
/*     const subscribe = await mercuryInstance.subscribeToLedgerEntries(args).catch((err) => {
        console.error(err)
    })
    console.log(subscribe) */
    
    //getContractEntries demo factory case
    const factoryEntries: ApiResponse<any> | void = await mercuryInstance.getContractEntries(args)
    .catch((err: any) => {
        console.log(err)
    })
    let allPairs: string[] = []
    if(factoryEntries && factoryEntries.ok){
        const parsedEntries: ParsedRouterEntry[] = factoryInstanceParser(factoryEntries.data)
        //console.log(parsedEntries[0].allPairs)
        allPairs = parsedEntries[0].allPairs
    }
    //getContractEntries demo pairs case
    const pairContractArgs= {
        contractId: pairAddress,
    }
    /*  console.log(pairContractArgs) */
/*     const pairContractData: ApiResponse<any> | void = await mercuryInstance.getContractEntries(pairContractArgs)
    .catch((err) => {
        console.error(err)
    })
    if(pairContractData && pairContractData.ok){
        const parsedContractData = pairInstanceParser(pairContractData.data)
        console.log(parsedContractData)
    } */

    //getCustomQuery demo
   /*  const query1Args = {
        request: 
            `query MyQuery {
                allLedgerEntrySubscriptions {
                  edges {
                    node {
                      id
                    }
                  }
                }
              }`,
    }
    const query2Args = {
        request: 
            `query MyQuery($contractId: String!) {
                entryUpdateByContractId(contract: $contractId) {
                  edges {
                    node {
                      keyXdr
                      valueXdr
                    }
                  }
                }
              }`,
        variables: {
            contractId: factoryAddress
        }
    }
    const query1Response = await mercuryInstance.getCustomQuery(query1Args)
    console.log(query1Response.data)
    const query2Response = await mercuryInstance.getCustomQuery(query2Args)
    console.log(query2Response.data) */

    //subscribeToMultipleLedgerEntries demo
    const pairsArray = [allPairs[0], allPairs[1], allPairs[2], allPairs[3], allPairs[4]]
    const multipleLedgerEntriesArgs = {
        contractId: pairsArray,
        keyXdr: "AAAAFA==",
        durability: "persistent"
    }
    const multipleLedgerEntriesResponse = await mercuryInstance.subscribeToMultipleLedgerEntries(multipleLedgerEntriesArgs)
    console.log('Subscribe various ledgers responseonse',multipleLedgerEntriesResponse)
    
    const subscribeLedgerEntriesResponse = await mercuryInstance.subscribeToLedgerEntries(args)
    if (subscribeLedgerEntriesResponse && subscribeLedgerEntriesResponse.data) {
        console.log('Subscribe one ledger response:', subscribeLedgerEntriesResponse)
    }
})();
