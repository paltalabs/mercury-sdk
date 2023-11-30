import { Mercury } from "./Mercury";
import dotenv from "dotenv";
dotenv.config();

(async function () {
  const mercuryArgs = {
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    accessToken: process.env.MERCURY_ACCESS_TOKEN!,
    email: process.env.MERCURY_TESTER_EMAIL,
    password: process.env.MERCURY_TESTER_PASSWORD,
  }
  console.log(mercuryArgs)
  const mercuryInstance = new Mercury({
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    accessToken: process.env.MERCURY_ACCESS_TOKEN!,
    email: process.env.MERCURY_TESTER_EMAIL,
    password: process.env.MERCURY_TESTER_PASSWORD,
  });

  // const res = await mercuryInstance.subscribeToContractEvents({
  //   contractId: "GDKXVNZXCJERWN7FSBOUPE5HKQ62LKYVZZYI4PMZHFVN6IWOFVRVI6LH",
  // });

  const res = await mercuryInstance.updateAccessToken()
  console.log(res);
})();
