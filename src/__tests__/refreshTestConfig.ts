import { Keypair } from "@stellar/stellar-sdk";
import { writeFileSync } from "fs";

/**
 * This script refreshes the config for the tests after the testnet is rebooted.
 */

async function main() {
  // Create two accounts
  const accounts = await Promise.all(
    [0, 1].map(async () => {
      const pair = Keypair.random();
      console.log(pair);
      await fetch(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
      return {
        publicKey: pair.publicKey(),
        secretKey: pair.secret(),
      };
    }),
  );

  // Get factory address
  const contractsResponse = await fetch(
    "https://raw.githubusercontent.com/soroswap/core/main/public/testnet.contracts.json",
  );
  const contracts = await contractsResponse.json();

  const config = {
    testnet: {
      factoryAddress: contracts.ids.factory,
      testnetAccounts: accounts,
    },
  };

  writeFileSync("./src/__tests__/testConfig.json", JSON.stringify(config, null, 2));
}

main().catch(console.error);
