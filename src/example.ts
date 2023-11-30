import { Mercury } from "./Mercury";
import dotenv from "dotenv";
dotenv.config();

(async function () {
  const mercuryInstance = new Mercury({
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    accessToken: process.env.MERCURY_ACCESS_TOKEN!,
  });

  const res = await mercuryInstance.subscribeToContractEvents({
    contractId: "GDKXVNZXCJERWN7FSBOUPE5HKQ62LKYVZZYI4PMZHFVN6IWOFVRVI6LH",
  });

  console.log(res);
})();
