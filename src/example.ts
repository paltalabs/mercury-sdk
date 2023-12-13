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

  const mercuryInstance = new Mercury({
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    email: process.env.MERCURY_TESTER_EMAIL!,
    password: process.env.MERCURY_TESTER_PASSWORD!,
  });

  const res = await mercuryInstance.getContractSubscriptions({
    contractId: "GDKXVNZXCJERWN7FSBOUPE5HKQ62LKYVZZYI4PMZHFVN6IWOFVRVI6LH",
  });

  console.log(JSON.stringify(res, null, 2));
})();
