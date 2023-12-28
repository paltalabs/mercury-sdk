import { gql } from "graphql-request";

export const GET_LIQUIDITY_POOL_WITHDRAW_BY_PUBLIC_KEY = gql`
  query MyQuery($publicKey: String!) {
    liquidityPoolWithdrawByPublicKey(publicKeyText: $publicKey) {
      edges {
        node {
          source
          sourceMuxed
          poolId
          amount
          minAmountA
          minAmountB
          txInfoByTx {
            ledgerByLedger {
              sequence
              closeTime
            }
          }
        }
      }
    }
  }
`;
