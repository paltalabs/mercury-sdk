import {
    getSentPaymentsParser,
    getReceivedPaymentsParser,
    getPathPaymentsStrictSendParser,
    getPathPaymentsStrictReceiveParser,
    getLiquidityPoolWithdrawParser,
    getLiquidityPoolDepositParser,
  } from "../utils/parsers";

test('it should retrieve sent payments as an array', async ()=>{
    const payments = {
        ok: true,
        data: {
            paymentsByPublicKey: {
                edges: []
            }
        }
    }
    const parsedPayments = getSentPaymentsParser(payments.data);
    expect(parsedPayments).toEqual([]);
});

test('it should retrieve received payments as an array', async ()=>{
    const payments = {
        ok: true,
        data: {
            paymentsToPublicKey: {
                edges: []
            }
        }
    }
    const parsedPayments = getReceivedPaymentsParser(payments.data);
    expect(parsedPayments).toEqual([]);
});

test('it should retrieve path payments strict send as an array', async ()=>{
    const payments = {
        ok: true,
        data: {
            pathPaymentsStrictSendByPublicKey: {
                nodes: []
            }
        }
    }
    const parsedPayments = getPathPaymentsStrictSendParser(payments.data);
    expect(parsedPayments).toEqual([]);
});

test('it should retrieve path payments strict receive as an array', async ()=>{
    const payments = {
        ok: true,
        data: {
            pathPaymentsStrictReceiveByPublicKey: {
                nodes: []
            }
        }
    }
    const parsedPayments = getPathPaymentsStrictReceiveParser(payments.data);
    expect(parsedPayments).toEqual([]);
});

test('it should retrieve liquidity pool withdraw as an array', async ()=>{
    const payments = {
        ok: true,
        data: {
            liquidityPoolWithdrawByPublicKey: {
                edges: []
            }
        }
    }
    const parsedPayments = getLiquidityPoolWithdrawParser(payments.data);
    expect(parsedPayments).toEqual([]);
});

test('it should retrieve liquidity pool deposit as an array', async ()=>{
    const payments = {
        ok: true,
        data: {
            liquidityPoolDepositByPublicKey: {
                edges: []
            }
        }
    }
    const parsedPayments = getLiquidityPoolDepositParser(payments.data);
    expect(parsedPayments).toEqual([]);
});

