import { Mercury } from "./Mercury";
// import { getContractEventsParser } from "./utils/parsers/getContractEventsParser";

import {
  getSentPaymentsParser,
  getReceivedPaymentsParser,
  getLiquidityPoolWithdrawParser,
  getLiquidityPoolDepositParser,
  getContractEventsParser,
} from ".";
import dotenv from "dotenv";
dotenv.config();

(async function () {
  const mercuryArgs = {
    // Make sure all of these variables are set in your `.env` file!
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    apiKey: process.env.MERCURY_API_KEY,
  };

  const mercuryInstance = new Mercury(mercuryArgs);

  const publicKey = "GBDJYBFPYUY7XXI5XCT473VJRT7PRGMRA2AJ2TKUKGPLJ5ZGVPJYKEAR";
  const publicKey2 = "GARDNDBY2VPXVQ46JJR52LNLFHIRQCQZATAYGOERKM4YBWZRUKIJ73BC";
  const routerContractAddress = "CCKXLDNKPXWJZP5YMHGDOQJDKVJIF4T44BQIZRTBFYUIKVE4CYHU47BK";

  const sentPaymentsResponse = await mercuryInstance.getSentPayments({
    publicKey,
  });

  if (sentPaymentsResponse.ok) {
    const sentPaymentsParsedData = getSentPaymentsParser(sentPaymentsResponse.data!);
    console.log("sentPaymentsParsedData");
    console.log(JSON.stringify(sentPaymentsParsedData, null, 2) + "\n");
  }

  //Received payments
  const receivedPaymentsResponse = await mercuryInstance.getReceivedPayments({
    publicKey,
  });

  if (receivedPaymentsResponse.ok) {
    const receivedPaymentsParsedData = getReceivedPaymentsParser(receivedPaymentsResponse.data!);
    console.log("receivedPaymentsParsedData");
    console.log(JSON.stringify(receivedPaymentsParsedData, null, 2) + "\n");
  }

  //Liquidity Pool Withdraw
  const liquidityPoolWithdrawResponse = await mercuryInstance.getLiquidityPoolWithdraw({
    publicKey: publicKey2,
  });

  if (liquidityPoolWithdrawResponse.ok) {
    const liquidityPoolWithdrawParsedData = getLiquidityPoolWithdrawParser(
      liquidityPoolWithdrawResponse.data!,
    );
    console.log("liquidityPoolWithdrawParsedData");
    console.log(JSON.stringify(liquidityPoolWithdrawParsedData, null, 2) + "\n");
  }

  //Liquidity Pool Deposit
  const liquidityPoolDepositResponse = await mercuryInstance.getLiquidityPoolDeposit({
    publicKey,
  });

  if (liquidityPoolDepositResponse.ok) {
    const liquidityPoolDepositParsedData = getLiquidityPoolDepositParser(
      liquidityPoolDepositResponse.data!,
    );
    console.log("liquidityPoolDepositParsedData");
    console.log(JSON.stringify(liquidityPoolDepositParsedData, null, 2) + "\n");
  }

  const getContractEventsRes = await mercuryInstance.getContractEvents({
    contractId: routerContractAddress,
  });
  const parsedContractEvents = getContractEventsParser(getContractEventsRes.data!);
  const eventByPublicKey = parsedContractEvents.filter((event) => event.to === publicKey);
  console.log("eventByPublicKey");
  console.log(JSON.stringify(eventByPublicKey, null, 2) + "\n");
})();
