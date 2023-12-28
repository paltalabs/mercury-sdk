import { gql } from "graphql-request";

export const GET_RECEIVED_PAYMENTS = gql`
  query receivedPayments($publicKey: String!) {
    paymentsToPublicKey(publicKeyText: $publicKey) {
      edges {
        node {
          amount
          assetByAsset {
            code
            issuer
          }
          accountByDestination {
            publickey
          }
          accountBySource {
            publickey
          }
          muxedaccountByDestinationMuxed {
            publickey
            muxedaccountid
          }
          muxedaccountBySourceMuxed {
            publickey
            muxedaccountid
          }
          txInfoByTx {
            ledgerByLedger {
              closeTime
              sequence
            }
          }
          assetNative
        }
      }
    }
  }
`;
