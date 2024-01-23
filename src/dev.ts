
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
        keyXdr: "AAAFA==",
        durability: "persistent"
    }
/*     const subscribe = await mercuryInstance.subscribeToLedgerEntries(args).catch((err) => {
        console.error(err)
    })
    console.log(subscribe) */
    const factoryEntries: ApiResponse<any> | void = await mercuryInstance.getContractEntries(args)
    .catch((err: any) => {
        console.log(err)
    })
    if(factoryEntries && factoryEntries.ok){
        const parsedEntries: ParsedRouterEntry[] = factoryInstanceParser(factoryEntries.data)
        console.log(parsedEntries[0].AllPairs)
    }
    const pairContractArgs= {
        contractId: pairAddress,
    }
    /*  console.log(pairContractArgs) */
    const pairContractData: ApiResponse<any> | void = await mercuryInstance.getContractEntries(pairContractArgs)
    .catch((err) => {
        console.error(err)
    })
    if(pairContractData && pairContractData.ok){
        const parsedContractData = pairInstanceParser(pairContractData.data)
        console.log(parsedContractData)
    }
})();
