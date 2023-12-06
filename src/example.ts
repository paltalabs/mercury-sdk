import { Mercury } from "./Mercury";
import dotenv from "dotenv";
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

  // const res2 = await mercuryInstance.getSentPayments({
  //   publicKey: "GCHR5WWPDFF3U3HP2NA6TI6FCQPYEWS3UOPIPJKZLAAFM57CEG4ZYBWP",
  // });

  // const res3 = await mercuryInstance.getReceivedPayments({
  //   publicKey: "GCHR5WWPDFF3U3HP2NA6TI6FCQPYEWS3UOPIPJKZLAAFM57CEG4ZYBWP",
  // });

  const res4 = await mercuryInstance.getPathPaymentsStrictSend({
    publicKey: "GBXRF7BXKPNQIIWAAO6Y6CFIUXX6GCVLILANFPSENPKAFFZA4KOVCLMB",
  });

  // const res5 = await mercuryInstance.getPathPaymentsStrictReceive({
  //   publicKey: "GBXRF7BXKPNQIIWAAO6Y6CFIUXX6GCVLILANFPSENPKAFFZA4KOVCLMB",
  // });

  const res6 = await mercuryInstance.getLiquidityPoolWithdraw({
    publicKey: "GBXRF7BXKPNQIIWAAO6Y6CFIUXX6GCVLILANFPSENPKAFFZA4KOVCLMB",
  });

  const res7 = await mercuryInstance.getLiquidityPoolDeposit({
    publicKey: "GBXRF7BXKPNQIIWAAO6Y6CFIUXX6GCVLILANFPSENPKAFFZA4KOVCLMB",
  });

  console.log(JSON.stringify({ res4, res6, res7 }));
})();
