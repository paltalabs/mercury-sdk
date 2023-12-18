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

  const mercuryInstance = new Mercury({
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    email: process.env.MERCURY_TESTER_EMAIL!,
    password: process.env.MERCURY_TESTER_PASSWORD!,
  });

  const res = await mercuryInstance.getContractEvents({
    contractId: "GDKXVNZXCJERWN7FSBOUPE5HKQ62LKYVZZYI4PMZHFVN6IWOFVRVI6LH",
  });
  const res2 = await mercuryInstance.getAllContractEventSubscriptions();
  const res3 = await mercuryInstance.getAllFullAccountSubscriptions();

  console.log(JSON.stringify(res, null, 2));
  console.log(JSON.stringify(res2, null, 2));
  console.log(JSON.stringify(res3, null, 2));
})();
