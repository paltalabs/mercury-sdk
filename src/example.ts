import { Mercury } from "./Mercury";
import { getContractEventsParser } from "./utils/parsers/getContractEventsParser";

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
    contractId: "CAGC46HNBMEZJP62PPTSUBUCS7LWBS5QLRNFSRCA4Q2A57YSPYBKGSTM",
  });
  console.log(JSON.stringify(res.data, null, 2) + "\n");

  const parsed = getContractEventsParser(res.data!);

  console.log(JSON.stringify(parsed, null, 2) + "\n");
})();
