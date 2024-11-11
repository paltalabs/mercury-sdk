import { Mercury } from "../Mercury";
import * as testConfig from "./testConfig.json";
import "dotenv/config";

const mercuryOptions = {
  backendEndpoint: process.env.MERCURY_BACKEND_ENDPOINT!,
  graphqlEndpoint: process.env.MERCURY_GRAPHQL_ENDPOINT!,
  apiKey: process.env.MERCURY_API_KEY!,
};

const testnetAccount = testConfig.testnet.testnetAccounts;

test("Should retrieve sent payments as an array", async () => {
  const mercury = new Mercury(mercuryOptions);
  const payments = await mercury.getSentPayments({ publicKey: testnetAccount[0].publicKey });
  expect(payments).toBeDefined();
  expect(payments.ok).toBe(true);
  expect(payments.data?.paymentsByPublicKey.edges).toBeDefined();
}, 10000);

test("Should get received payments as an array", async () => {
  const publicKey = testnetAccount[0].publicKey;
  const mercuryInstance = new Mercury(mercuryOptions);
  const receivedPayments = await mercuryInstance.getReceivedPayments({ publicKey });
  expect(receivedPayments).toBeDefined();
  expect(receivedPayments.ok).toBe(true);
  expect(receivedPayments.data?.paymentsToPublicKey.edges).toBeDefined();
}, 10000);

test("Should get path payments strict send", async () => {
  const publicKey = testnetAccount[0].publicKey;
  const mercuryInstance = new Mercury(mercuryOptions);
  const pathPaymentsStrictSend = await mercuryInstance.getPathPaymentsStrictSend({ publicKey });
  expect(pathPaymentsStrictSend).toBeDefined();
  expect(pathPaymentsStrictSend.ok).toBe(true);
  expect(pathPaymentsStrictSend.data?.pathPaymentsStrictSendByPublicKey.nodes).toBeDefined();
}, 10000);

test("Should get path payments strict receive", async () => {
  const publicKey = testnetAccount[0].publicKey;
  const mercuryInstance = new Mercury(mercuryOptions);
  const pathPaymentsStrictReceive = await mercuryInstance.getPathPaymentsStrictReceive({
    publicKey,
  });
  expect(pathPaymentsStrictReceive).toBeDefined();
  expect(pathPaymentsStrictReceive.ok).toBe(true);
  expect(pathPaymentsStrictReceive.data?.pathPaymentsStrictReceiveByPublicKey.nodes).toBeDefined();
}, 10000);

test("Should get liquidity pool deposit as an array", async () => {
  const publicKey = testnetAccount[0].publicKey;
  const mercuryInstance = new Mercury(mercuryOptions);
  const liquidityPoolDeposit = await mercuryInstance.getLiquidityPoolDeposit({ publicKey });
  expect(liquidityPoolDeposit).toBeDefined();
  expect(liquidityPoolDeposit.ok).toBe(true);
  expect(liquidityPoolDeposit.data?.liquidityPoolDepositByPublicKey.edges).toBeDefined();
}, 10000);

test("Should get liquidity pool withdraw as an array", async () => {
  const publicKey = testnetAccount[0].publicKey;
  const mercuryInstance = new Mercury(mercuryOptions);
  const liquidityPoolWithdraw = await mercuryInstance.getLiquidityPoolWithdraw({ publicKey });
  expect(liquidityPoolWithdraw).toBeDefined();
  expect(liquidityPoolWithdraw.ok).toBe(true);
  expect(liquidityPoolWithdraw.data?.liquidityPoolWithdrawByPublicKey.edges).toBeDefined();
}, 10000);

test("Should get contract events as an array", async () => {
  const contractId = testConfig.testnet.factoryAddress;
  const mercuryInstance = new Mercury(mercuryOptions);
  const contractEvents = await mercuryInstance.getContractEvents({ contractId });
  expect(contractEvents).toBeDefined();
  expect(contractEvents.ok).toBe(true);
  expect(contractEvents.data?.eventByContractId.nodes).toBeDefined();
}, 10000);
