import { gql } from "graphql-request";

export const GET_SENT_PAYMENTS = gql`
  query sentPayments($publicKey: String!) {
    paymentsByPublicKey(publicKeyText: $publicKey) {
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
          ledgerByLedger {
            closeTime
            sequence
          }
          assetNative
        }
      }
    }
  }
`;
