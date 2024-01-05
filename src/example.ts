import { Mercury } from "./Mercury";
// import { getContractEventsParser } from "./utils/parsers/getContractEventsParser";

import {
  getSentPaymentsParser,
  getReceivedPaymentsParser,
  getLiquidityPoolWithdrawParser,
  getLiquidityPoolDepositParser,
  getContractEventsParser,
  getSoroswapReserves,
  MOCK_PARSED_CONTRACT_EVENTS
} from "."
import dotenv from "dotenv";
import { log } from "console";
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

  const publicKey = "GBDJYBFPYUY7XXI5XCT473VJRT7PRGMRA2AJ2TKUKGPLJ5ZGVPJYKEAR";
  const publicKey2 = "GARDNDBY2VPXVQ46JJR52LNLFHIRQCQZATAYGOERKM4YBWZRUKIJ73BC";
  const routerContractAddress = "CCKXLDNKPXWJZP5YMHGDOQJDKVJIF4T44BQIZRTBFYUIKVE4CYHU47BK";
  const tokenA = "CBKZMWGE7E3VDJRCHRNLAHKYL2JMCC4METUJA262WXKN2SANJXVQYE3N";
  const tokenB = "CCFB3TPPJHDLDYRTPJEFYJ37FOVASDCIZEJ3DYKOFUQO4WJHHZ7SML2D";

  const sentPaymentsResponse = await mercuryInstance.getSentPayments({
    publicKey,
  });

  if (sentPaymentsResponse.ok) {
    const sentPaymentsParsedData = getSentPaymentsParser(
      sentPaymentsResponse.data!
    );
    // console.log("sentPaymentsParsedData")
    // console.log(JSON.stringify(sentPaymentsParsedData, null, 2) + "\n");
  }

  //Received payments
  const receivedPaymentsResponse = await mercuryInstance.getReceivedPayments({
    publicKey,
  });

  if (receivedPaymentsResponse.ok) {
    const receivedPaymentsParsedData = getReceivedPaymentsParser(
      receivedPaymentsResponse.data!
    );
    // console.log("receivedPaymentsParsedData")
    // console.log(JSON.stringify(receivedPaymentsParsedData, null, 2) + "\n");
  }

  //Liquidity Pool Withdraw
  const liquidityPoolWithdrawResponse =
    await mercuryInstance.getLiquidityPoolWithdraw({
      publicKey: publicKey2,
    });

  if (liquidityPoolWithdrawResponse.ok) {
    const liquidityPoolWithdrawParsedData = getLiquidityPoolWithdrawParser(
      liquidityPoolWithdrawResponse.data!
    );
    // console.log("liquidityPoolWithdrawParsedData")
    // console.log(JSON.stringify(liquidityPoolWithdrawParsedData, null, 2) + "\n");
  }

  //Liquidity Pool Deposit
  const liquidityPoolDepositResponse =
    await mercuryInstance.getLiquidityPoolDeposit({
      publicKey,
    });

  if (liquidityPoolDepositResponse.ok) {
    const liquidityPoolDepositParsedData = getLiquidityPoolDepositParser(
      liquidityPoolDepositResponse.data!
    );
    // console.log("liquidityPoolDepositParsedData")
    // console.log(JSON.stringify(liquidityPoolDepositParsedData, null, 2) + "\n");
  }


  const getContractEventsRes = await mercuryInstance.getContractEvents({
    contractId: routerContractAddress,
  });
  const parsedContractEvents = getContractEventsParser(getContractEventsRes.data!);
  console.log();
  console.log();
  console.log("Parsed Contract Events");
  console.log(parsedContractEvents);
  console.log();
  console.log();
  const eventByPublicKey = parsedContractEvents.filter((event) => event.to === publicKey);
  // console.log("eventByPublicKey")
  // console.log(JSON.stringify(eventByPublicKey, null, 2) + "\n");

  //Soroswap reserves
  const soroswapReserves = await getSoroswapReserves(MOCK_PARSED_CONTRACT_EVENTS, tokenA, tokenB);
  console.log(soroswapReserves);
  
  




})();
