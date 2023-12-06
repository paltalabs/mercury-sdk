# mercury-sdk

## Usage

### Instantiate
Create an instance of mercury:
```typescript
import {Mercury} from "mercury-sdk";

const mercuryInstance = new Mercury({
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT ,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT ,
    email: process.env.MERCURY_TESTER_EMAIL ,
    password: process.env.MERCURY_TESTER_PASSWORD 
})

```

### Subscriptions
Subscribe to an event:
```typescript
mercuryInstance.subscribeToContractEvents({
    contractId:"someContractId"
})
```

Subscribe to full accounts:
```typescript
mercuryInstance.subscribeToFullAccount({
    address:"someStellarAddress"
})
```
Review subscriptions:
```typescript
mercuryInstance.getContractSubscriptions({
    address:"someStellarAddress"
})
```
or for Accounts
```typescript
mercuryInstance.getFullAccountSubscriptions({
    address:"someStellarAddress"
})
```

### Retrieve information

retrieve sent payments:
```typescript
mercuryInstance.getSentPayments({
    address:"someStellarAddress"
})
```

retrieve received payments:
```typescript
mercuryInstance.getReceivedPayments({
    address:"someStellarAddress"
})
```

retrieve path payments strict send:
```typescript
mercuryInstance.getPathPaymentsStrictSend({
    address:"someStellarAddress"
})
```

retrieve path payments strict receive:
```typescript
mercuryInstance.getPathPaymentsStrictReceive({
    address:"someStellarAddress"
})
```

retrieve SDEX add liquidity:
```typescript
mercuryInstance.getLiquidityPoolDeposit({
    address:"someStellarAddress"
})
```
retrieve SDEX remove liquidity:
```typescript
mercuryInstance.getLiquidityPoolWithdraw({
    address:"someStellarAddress"
})
```


### Parse results

Parse sent payments:
```typescript
import { parseSentPayment } from "mercury-sdk/utils";
async function someFunction() {
    const data = await mercuryInstance.getSentPayments({
    address:"someStellarAddress"
})
    const parsedData = parseSentPayment(data)
    console.log("parsedData:", parsedData)
}
```

## Local development
Use `yarn`

You can use the script `run.sh`. To run a docker image with node. 

Install dependencies with `yarn`

In order to get your changes reflected in another project that is using `yarn link` to point to this one you need to run:
```
yarn tsc
```
This will compile typescript into the folder `dist/` where other projects will look for the code.