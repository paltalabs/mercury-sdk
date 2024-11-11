const { createInterface } = require("readline/promises");
const { readFile, writeFile } = require("fs/promises");
const { Mercury } = require("./dist/index.js");
require("dotenv/config");

/**
 * We want to ensure that the SDK has access to an API in `.env`. We get a JWT
 * either from the environment or directly from the user, and use it to obtain
 * an API key from the server.
 */
async function getJWT() {
  if (process.env.MERCURY_JWT) return process.env.MERCURY_JWT;

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const token = await rl.question(
    '\nTo generate the key, please enter your Mercury JWT. You can find it in your Mercury dashboard under "Get access token": ',
  );

  rl.close();
  return token;
}

async function setup() {
  console.log(
    "Welcome to the Mercury SDK setup! To ensure we can communicate with your Mercury account, we need an API key.",
  );

  let key = process.env.MERCURY_API_KEY;

  if (key) {
    const envContent = await readFile(".env", "utf8").catch(() => "");

    if (envContent.includes("MERCURY_API_KEY=")) {
      console.log("I see it is already set in your .env file.");
      return;
    }
  } else {
    try {
      const mercury = new Mercury({
        backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT,
        graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT,
        shouldFetchApiKey: true,
        jwt: await getJWT(),
      });

      key = await mercury.generateApiKey();
    } catch (error) {
      process.exit(1);
    }
  }

  await writeFile(".env", `\nMERCURY_API_KEY=${key}`, { flag: "a" }).catch((error) => {
    console.error("Failed to save the API key to .env file:", error.message);
    process.exit(1);
  });

  console.log("The API key was saved to .env file.");
}

setup();
