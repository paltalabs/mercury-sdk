/* 
Crear una funcion que obtenga todos los pares desde factory:
    -Para eso necesito una query de entryUpdateByContractId que
    reciba como parametros contractId y durability, dentro de headers un JWT

Obtener los datos de los pares,
 */
import { Mercury } from "./Mercury";
// import { getContractEventsParser } from "./utils/parsers/getContractEventsParser";

import {
    FactoryInstanceParser
} from "."
import dotenv from "dotenv";
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

     const routerContractAddress = "CDSUTAZNBTBAMG2SVZ63FRIBIJOEBSRVVR4GZ3TDXX25AHUN5N3ZYMYU";
    const pairAddress = "CADHF2DQJIH7LUQVZY7KIP4GBSHVICDQJNJPGSP4P4HWGXU76JILV6HP"
    const args = {
        contractId: routerContractAddress,
        keyXdr: "AAAFA==",
        durability: "persistent"
    }
/*     const subscribe = await mercuryInstance.subscribeToLedgerEntries(args).catch((err) => {
        console.error(err)
    })
    console.log(subscribe) */
/*     const entries: any = await mercuryInstance.getAllFactoryContract(args)
    .catch((err) => {
        console.log(err)
    })
    if(entries.ok){
        const parsedEntries = factoryInstanceParser(entries.data!)
    } */

    const pairContractArgs= {
        contractId: routerContractAddress,
    }
    const pairContractData:any = await mercuryInstance.getContractEntries(pairContractArgs)
    .catch((err) => {
        console.error(err)
    })
    if(pairContractData.ok){
        const parsedContractData = pairContractData.data
        console.log(parsedContractData)
    }
})();
