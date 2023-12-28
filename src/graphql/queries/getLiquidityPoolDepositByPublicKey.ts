import { gql } from "graphql-request";

export const GET_LIQUIDITY_POOL_DEPOSIT_BY_PUBLIC_KEY = gql`
  query MyQuery($publicKey: String!) {
    liquidityPoolDepositByPublicKey(publicKeyText: $publicKey) {
      edges {
        node {
          source
          sourceMuxed
          poolId
          maxAmountA
          maxAmountB
          minPriceN
          minPriceD
          maxPriceN
          maxPriceD
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
