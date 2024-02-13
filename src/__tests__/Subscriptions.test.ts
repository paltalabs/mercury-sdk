import { Mercury } from "../Mercury";

const mercuryOptions = {
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    email: process.env.MERCURY_TESTER_EMAIL!,
    password: process.env.MERCURY_TESTER_PASSWORD!,
};

interface SubscribeToContractEventsResponse {
    ok: boolean;
    data: boolean;
}

interface getAllContractEventSubscriptionsResponse {
    ok: boolean;
    data: {
        allContractEventSubscriptions: {
            edges: any[]
        };
    } | null;
}

interface allFullAccountSubscriptionsResponse {
    ok: boolean;
    data: {
        allFullAccountSubscriptions: {
            edges: any[]
        };
    } | null;
}

const mercuryInstance = new Mercury(mercuryOptions);

test("Should subscribe to conract events successfully", async () => {
    const factoryAddress = "CC4UOWU7HWS44WM5VEU4JWG6FMRKBREFQMWNQLYH6TLM7IY6NPASW5OM";
    const args = {
        contractId: factoryAddress,
    }
    const subscribe: SubscribeToContractEventsResponse = await mercuryInstance.subscribeToContractEvents(args).catch((err) => {
        console.error(err);
        return { ok: false, data: false };
    }) as SubscribeToContractEventsResponse;
    expect(subscribe.ok).toBeTruthy();
    expect(subscribe.data).toBeTruthy();
}, 10000);

test("Should subscribe to a stellar account successfully", async () => {
    const stellarAddress = "GAB7X5" // replace with a valid stellar address
    const args = {
        publicKey: stellarAddress,
    }      
    const subscribe: SubscribeToContractEventsResponse = await mercuryInstance.subscribeToFullAccount(args).catch((err) => {
        console.error(err);
        return { ok: false, data: false };
    }) as SubscribeToContractEventsResponse;
    expect(subscribe.ok).toBeTruthy();
    expect(subscribe.data).toBeTruthy();
}, 10000);

test("Should subscribe to ledger entries successfully", async () => {
    const factoryAddress = "CC4UOWU7HWS44WM5VEU4JWG6FMRKBREFQMWNQLYH6TLM7IY6NPASW5OM";
    const args = {
        contractId: factoryAddress,
        keyXdr: "AAAAFA==",
        durability: "persistent",
        hydrate: true,
    }
    const subscribe: SubscribeToContractEventsResponse = await mercuryInstance.subscribeToLedgerEntries(args).catch((err) => {
        console.error(err);
        return { ok: false, data: false };
    }) as SubscribeToContractEventsResponse;
    expect(subscribe.ok).toBeTruthy();
    expect(subscribe.data).toBeTruthy();
}
, 10000);

test("Should return all contract event subscriptions", async () => {
    const subscriptions: getAllContractEventSubscriptionsResponse = await mercuryInstance.getAllContractEventSubscriptions().catch((err) => {
        console.error(err);
        return { ok: false, data: null };
    });
    const data = subscriptions.data
    expect(subscriptions.ok).toBeTruthy();
    expect(data).toBeDefined();
    if(data){
    expect(data.allContractEventSubscriptions).toBeDefined();
    expect(data.allContractEventSubscriptions.edges).toBeDefined();
    expect(data.allContractEventSubscriptions.edges.length).toBeGreaterThan(0);
    }
}, 10000);

test("Should get full account subscriptions successfully", async () => {
    const subscriptions: allFullAccountSubscriptionsResponse = await mercuryInstance.getAllFullAccountSubscriptions().catch((err) => {
        console.error(err);
        return { ok: false, data: null };
    });
    const data = subscriptions.data    
    expect(subscriptions.ok).toBeTruthy();
    expect(data).toBeDefined();
    if(data){
    expect(data.allFullAccountSubscriptions).toBeDefined();
    expect(data.allFullAccountSubscriptions.edges).toBeDefined();
    expect(data.allFullAccountSubscriptions.edges.length).toBeGreaterThan(0);
    }
}, 10000);