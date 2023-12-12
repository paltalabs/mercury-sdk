import { Mercury } from "./Mercury";
import dotenv from "dotenv";

import {
  getSentPaymentsParser,
  getReceivedPaymentsParser,
  getPathPaymentsStrictSendParser,
  getPathPaymentsStrictReceiveParser,
  getLiquidityPoolWithdrawParser,
  getLiquidityPoolDepositParser,
} from "./utils/parsers";

dotenv.config();

(async function () {
  const mercuryArgs = {
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    email: process.env.MERCURY_TESTER_EMAIL,
    password: process.env.MERCURY_TESTER_PASSWORD,
  };

  console.log(mercuryArgs);

  const mercuryInstance = new Mercury({
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    email: process.env.MERCURY_TESTER_EMAIL!,
    password: process.env.MERCURY_TESTER_PASSWORD!,
  });

  // const res = await mercuryInstance.subscribeToContractEvents({
  //   contractId: "GDKXVNZXCJERWN7FSBOUPE5HKQ62LKYVZZYI4PMZHFVN6IWOFVRVI6LH",
  // });

  const res2 = await mercuryInstance.getSentPayments({
    publicKey: "GCHR5WWPDFF3U3HP2NA6TI6FCQPYEWS3UOPIPJKZLAAFM57CEG4ZYBWP",
  });

  const res3 = await mercuryInstance.getReceivedPayments({
    publicKey: "GCHR5WWPDFF3U3HP2NA6TI6FCQPYEWS3UOPIPJKZLAAFM57CEG4ZYBWP",
  });

  const res4 = await mercuryInstance.getPathPaymentsStrictSend({
    publicKey: "GBXRF7BXKPNQIIWAAO6Y6CFIUXX6GCVLILANFPSENPKAFFZA4KOVCLMB",
  });

  const res5 = await mercuryInstance.getPathPaymentsStrictReceive({
    publicKey: "GBXRF7BXKPNQIIWAAO6Y6CFIUXX6GCVLILANFPSENPKAFFZA4KOVCLMB",
  });

  const res6 = await mercuryInstance.getLiquidityPoolWithdraw({
    publicKey: "GBXRF7BXKPNQIIWAAO6Y6CFIUXX6GCVLILANFPSENPKAFFZA4KOVCLMB",
  });

  const res7 = await mercuryInstance.getLiquidityPoolDeposit({
    publicKey: "GBXRF7BXKPNQIIWAAO6Y6CFIUXX6GCVLILANFPSENPKAFFZA4KOVCLMB",
  });

  const parsedSentPayments = getSentPaymentsParser(res2.data!);
  const parsedReceivedPayments = getReceivedPaymentsParser(res3.data!);
  const parsedPathPaymentsStrictSend = getPathPaymentsStrictSendParser(
    res4.data!
  );
  const parsedPathPaymentsStrictReceive = getPathPaymentsStrictReceiveParser(
    res5.data!
  );
  const parsedLiquidityPoolWithdraw = getLiquidityPoolWithdrawParser(
    res6.data!
  );
  const parsedLiquidityPoolDeposit = getLiquidityPoolDepositParser(res7.data!);

  console.log({ parsedSentPayments });
  console.log({ parsedReceivedPayments });
  console.log({ parsedPathPaymentsStrictSend });
  console.log({ parsedPathPaymentsStrictReceive });
  console.log({ parsedLiquidityPoolWithdraw });
  console.log({ parsedLiquidityPoolDeposit });

  //Sent payments
  const sentPaymentsResponse = await mercuryInstance.getSentPayments({
    publicKey: "someStellarAddress",
  });
  if (sentPaymentsResponse.ok) {
    const sentPaymentsParsedData = getSentPaymentsParser(
      sentPaymentsResponse.data!
    );
  }

  //Received payments
  const receivedPaymentsResponse = await mercuryInstance.getReceivedPayments({
    publicKey: "someStellarAddress",
  });
  if (receivedPaymentsResponse.ok) {
    const receivedPaymentsParsedData = getReceivedPaymentsParser(
      receivedPaymentsResponse.data!
    );
  }

  //Path Payments Strict Send
  const pathPaymentsStrictSendResponse =
    await mercuryInstance.getPathPaymentsStrictSend({
      publicKey: "someStellarAddress",
    });

  if (pathPaymentsStrictSendResponse.ok) {
    const pathPaymentsStrictSendParsedData = getPathPaymentsStrictSendParser(
      pathPaymentsStrictSendResponse.data!
    );
  }

  //Path Payments Strict Receive
  const pathPaymentsStrictReceiveResponse =
    await mercuryInstance.getPathPaymentsStrictReceive({
      publicKey: "someStellarAddress",
    });

  if (pathPaymentsStrictReceiveResponse.ok) {
    const pathPaymentsStrictReceiveParsedData =
      getPathPaymentsStrictReceiveParser(
        pathPaymentsStrictReceiveResponse.data!
      );
  }

  //Liquidity Pool Withdraw
  const liquidityPoolWithdrawResponse =
    await mercuryInstance.getLiquidityPoolWithdraw({
      publicKey: "someStellarAddress",
    });

  if (liquidityPoolWithdrawResponse.ok) {
    const liquidityPoolWithdrawParsedData = getLiquidityPoolWithdrawParser(
      liquidityPoolWithdrawResponse.data!
    );
  }

  //Liquidity Pool Deposit
  const liquidityPoolDepositResponse =
    await mercuryInstance.getLiquidityPoolDeposit({
      publicKey: "someStellarAddress",
    });

  if (liquidityPoolDepositResponse.ok) {
    const liquidityPoolDepositParsedData = getLiquidityPoolDepositParser(
      liquidityPoolDepositResponse.data!
    );
  }
})();
