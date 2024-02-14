import { Mercury } from "../Mercury";
const mercuryOptions = {
    backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
    graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
    email: process.env.MERCURY_TESTER_EMAIL!,
    password: process.env.MERCURY_TESTER_PASSWORD!,
};
const testnetAccount = [
    {
        // account 1
        publicKey: 'GAALDIAGTB2IVBBEDDH63DM24WUHSI5R5EKXA4XR25OGPRAD6SXFPIL3',
        secretKey: 'SC7H2ZUCRVNB6ASWYVD6TE6KBY5FW3CDYRGIEWR4NBHD6FP3ICZW5A3Q',
    },
    {
        // account 2
        publicKey: 'GDQOERLYYOGW7F76WYBR5X4XLQPGZVBM5DGXOAAV33EPE6XJ7MUFMVSF',
        secretKey: 'SAMR4UNRZSIO6W7URK2ADIG6GXKX6KUWRUA4BDG4O7E7KOINTOUXDPKK',
    },
]

test('it should retrieve sent payments as an array', async ()=>{
    const mercury = new Mercury(mercuryOptions);
    const payments = await mercury.getSentPayments({publicKey: testnetAccount[0].publicKey});
    expect(payments).toBeDefined();
    expect(payments.ok).toBe(true);
    expect(Array.isArray(payments.data?.paymentsByPublicKey.edges)).toBe(true);
})

test('Should get received payments as an array', async () => {
    const publicKey = testnetAccount[0].publicKey;
    const mercuryInstance = new Mercury(mercuryOptions);
    const receivedPayments = await mercuryInstance.getReceivedPayments({ publicKey });
    expect(receivedPayments).toBeDefined();
    expect(receivedPayments.ok).toBe(true);
    expect(Array.isArray(receivedPayments.data?.paymentsToPublicKey.edges)).toBe(true);
  });

test('Should get path payments strict send', async () => {
    const publicKey = testnetAccount[0].publicKey;
    const mercuryInstance = new Mercury(mercuryOptions);
    const pathPaymentsStrictSend = await mercuryInstance.getPathPaymentsStrictSend({ publicKey });
    expect(pathPaymentsStrictSend).toBeDefined();
    expect(pathPaymentsStrictSend.ok).toBe(true);
    expect(Array.isArray(pathPaymentsStrictSend.data?.pathPaymentsStrictSendByPublicKey.nodes)).toBe(true);
  });

test('Should get path payments strict receive', async () => {
    const publicKey = testnetAccount[0].publicKey;
    const mercuryInstance = new Mercury(mercuryOptions);
    const pathPaymentsStrictReceive = await mercuryInstance.getPathPaymentsStrictReceive({ publicKey });
    expect(pathPaymentsStrictReceive).toBeDefined();
    expect(pathPaymentsStrictReceive.ok).toBe(true);
    expect(Array.isArray(pathPaymentsStrictReceive.data?.pathPaymentsStrictReceiveByPublicKey.nodes)).toBe(true);
  });

test('Should get liquidity pool deposit as an array', async () => {
    const publicKey = testnetAccount[0].publicKey;
    const mercuryInstance = new Mercury(mercuryOptions);
    const liquidityPoolDeposit = await mercuryInstance.getLiquidityPoolDeposit({ publicKey });
    expect(liquidityPoolDeposit).toBeDefined();
    expect(liquidityPoolDeposit.ok).toBe(true);
    expect(Array.isArray(liquidityPoolDeposit.data?.liquidityPoolDepositByPublicKey.edges)).toBe(true);
  });

test('Should get liquidity pool withdraw as an array', async () => {
    const publicKey = testnetAccount[0].publicKey;
    const mercuryInstance = new Mercury(mercuryOptions);
    const liquidityPoolWithdraw = await mercuryInstance.getLiquidityPoolWithdraw({ publicKey });
    expect(liquidityPoolWithdraw).toBeDefined();
    expect(liquidityPoolWithdraw.ok).toBe(true);
    expect(Array.isArray(liquidityPoolWithdraw.data?.liquidityPoolWithdrawByPublicKey.edges)).toBe(true);
  });

test('Should get contract events as an array', async () => {
    const contractId = 'CC4UOWU7HWS44WM5VEU4JWG6FMRKBREFQMWNQLYH6TLM7IY6NPASW5OM';
    const mercuryInstance = new Mercury(mercuryOptions);
    const contractEvents = await mercuryInstance.getContractEvents({ contractId });
    expect(contractEvents).toBeDefined();
    expect(contractEvents.ok).toBe(true);
    expect(Array.isArray(contractEvents.data?.eventByContractId.edges)).toBe(true);
  });