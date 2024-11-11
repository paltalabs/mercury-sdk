import { Mercury } from "../Mercury";
import * as testConfig from "./testConfig.json";
import "dotenv/config";

const mercuryOptions = {
  backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
  graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
  apiKey: process.env.MERCURY_API_KEY,
};

interface SubscribeToContractEventsResponse {
  ok: boolean;
  data: boolean;
}

interface getAllContractEventSubscriptionsResponse {
  ok: boolean;
  data: {
    allContractEventSubscriptions: {
      edges: any[];
    };
  } | null;
}

interface allFullAccountSubscriptionsResponse {
  ok: boolean;
  data: {
    allFullAccountSubscriptions: {
      edges: any[];
    };
  } | null;
}

const mercuryInstance = new Mercury(mercuryOptions);

test("Should subscribe to conract events successfully", async () => {
  const args = {
    contractId: testConfig.testnet.factoryAddress,
  };
  const subscribe: SubscribeToContractEventsResponse = (await mercuryInstance
    .subscribeToContractEvents(args)
    .catch((err) => {
      console.error(err);
      return { ok: false, data: false };
    })) as SubscribeToContractEventsResponse;
  expect(subscribe.ok).toBeTruthy();
  expect(subscribe.data).toBeTruthy();
}, 10000);

test("Should subscribe to a stellar account successfully", async () => {
  const stellarAddress = "GAB7X5"; // replace with a valid stellar address
  const args = {
    publicKey: stellarAddress,
  };
  const subscribe: SubscribeToContractEventsResponse = (await mercuryInstance
    .subscribeToFullAccount(args)
    .catch((err) => {
      console.error(err);
      return { ok: false, data: false };
    })) as SubscribeToContractEventsResponse;
  expect(subscribe.ok).toBeTruthy();
  expect(subscribe.data).toBeTruthy();
}, 10000);

test("Should subscribe to ledger entries successfully", async () => {
  const args = {
    contractId: testConfig.testnet.factoryAddress,
    keyXdr: "AAAAFA==",
    durability: "persistent",
    hydrate: true,
  };
  const subscribe: SubscribeToContractEventsResponse = (await mercuryInstance
    .subscribeToLedgerEntries(args)
    .catch((err) => {
      console.error(err);
      return { ok: false, data: false };
    })) as SubscribeToContractEventsResponse;
  expect(subscribe.ok).toBeTruthy();
  expect(subscribe.data).toBeTruthy();
}, 10000);

test("Should return all contract event subscriptions", async () => {
  const subscriptions: getAllContractEventSubscriptionsResponse = await mercuryInstance
    .getAllContractEventSubscriptions()
    .catch((err) => {
      console.error(err);
      return { ok: false, data: null };
    });
  const data = subscriptions.data;
  expect(subscriptions.ok).toBeTruthy();
  expect(data).toBeDefined();
  if (data) {
    expect(data.allContractEventSubscriptions).toBeDefined();
    expect(data.allContractEventSubscriptions.edges).toBeDefined();
    expect(data.allContractEventSubscriptions.edges.length).toBeGreaterThan(0);
  }
}, 10000);

test("Should get full account subscriptions successfully", async () => {
  const subscriptions: allFullAccountSubscriptionsResponse = await mercuryInstance
    .getAllFullAccountSubscriptions()
    .catch((err) => {
      console.error(err);
      return { ok: false, data: null };
    });
  const data = subscriptions.data;
  expect(subscriptions.ok).toBeTruthy();
  expect(data).toBeDefined();
  if (data) {
    expect(data.allFullAccountSubscriptions).toBeDefined();
    expect(data.allFullAccountSubscriptions.edges).toBeDefined();
    expect(data.allFullAccountSubscriptions.edges.length).toBeGreaterThan(0);
  }
}, 10000);
