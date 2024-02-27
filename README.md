# mercury-sdk

[![npm version](https://badge.fury.io/js/mercury-sdk.svg)](https://badge.fury.io/js/mercury-sdk)

The `mercury-sdk` is a comprehensive SDK that empowers developers to seamlessly interact with the [Mercury Indexer](https://mercurydata.app/). It has been developed and it's currently supported by the [PaltaLabs 🥑](https://paltalabs.io/) Team.

**Useful links:**
- Documentation: https://mercury-sdk.paltalabs.io/
- NPM Package: https://www.npmjs.com/package/mercury-sdk
- Github Repo: https://github.com/paltalabs/mercury-sdk/
- Discord: https://discord.gg/QaezKEWXqX


## Installation

You can install the package via npm:

```bash
npm install mercury-sdk
```
Create and fill the `.env` file
```bash
cp .env.example .env
```

## Usage

### Instantiate

Create an instance of mercury:

```typescript
import { Mercury } from "mercury-sdk";

const mercuryInstance = new Mercury({
  backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT,
  graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT,
  email: process.env.MERCURY_TESTER_EMAIL,
  password: process.env.MERCURY_TESTER_PASSWORD,
});
```

endpoints should be without "/" and without /graphql or any other path. It should be only domain:port.

### Subscriptions

Subscribe to an event:

```typescript
mercuryInstance.subscribeToContractEvents({
  contractId: "someContractId",
});
```

Subscribe to full accounts:

```typescript
mercuryInstance.subscribeToFullAccount({
  address: "someStellarAddress",
});
```

Subscribe to ledger entries:

```typescript
const contractAddress = "CDSUTAZNBTBAMG2SVZ63FRIBIJOEBSRVVR4GZ3TDXX25AHUN5N3ZYMYU";
const args = {
    contractId: contractAddress,
    keyXdr: "AAAAFA==",
    durability: "persistent",
    hydrate: true,
}
const subscribe = await mercuryInstance.subscribeToLedgerEntries(args).catch((err) => {
    console.error(err)
})
```

Review subscriptions:

```typescript
mercuryInstance.getAllContractEventSubscriptions();
```

or for Accounts

```typescript
mercuryInstance.getAllFullAccountSubscriptions();
```

### Retrieve information

retrieve sent payments:

```typescript
mercuryInstance.getSentPayments({
  publicKey: "someStellarAddress",
});
```

retrieve received payments:

```typescript
mercuryInstance.getReceivedPayments({
  publicKey: "someStellarAddress",
});
```

retrieve path payments strict send:

```typescript
mercuryInstance.getPathPaymentsStrictSend({
  publicKey: "someStellarAddress",
});
```

retrieve path payments strict receive:

```typescript
mercuryInstance.getPathPaymentsStrictReceive({
  publicKey: "someStellarAddress",
});
```

retrieve SDEX add liquidity:

```typescript
mercuryInstance.getLiquidityPoolDeposit({
  publicKey: "someStellarAddress",
});
```

retrieve SDEX remove liquidity:

```typescript
mercuryInstance.getLiquidityPoolWithdraw({
  publicKey: "someStellarAddress",
});
```

retrieve contract events: 
  
  ```typescript
mercuryInstance.getContractEvents({
  contractId: "someContractId",
});
```

### Parse data results

You can use data parsers to get the results in a cleaner way than just the big GraphQL response

Available parsers:

```typescript
import {
  getSentPaymentsParser,
  getReceivedPaymentsParser,
  getPathPaymentsStrictSendParser,
  getPathPaymentsStrictReceiveParser,
  getLiquidityPoolWithdrawParser,
  getLiquidityPoolDepositParser,
} from "mercury-sdk";

async function someFunction() {
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
}
  // Soroswap Events:
  const soroswapEvents = 
    await mercuryInstance.getContractEvents({
      contractId: "someContractId",
    });
  const soroswapEventsParsedData = await getContractEventsParser(
    soroswapEvents.data!
  );
```

## Local development

Setup your environment variables:

```
cp .env.example .env
```
complete the data

You can use the script `run.sh`. To run a docker image with node.

Use `yarn`
Install dependencies with `yarn`

You can play around with the code in `src/example.ts` and run it with:

```
yarn start:example
```

In order to get your changes reflected in another project that is using `yarn link` to point to this one you need to run:

```
yarn tsc
```

This will compile typescript into the folder `dist/` where other projects will look for the code.

## Publish a new version

Make sure you have setup the npm token in your environment variables.
Run `yarn publish` and follow the instructions.