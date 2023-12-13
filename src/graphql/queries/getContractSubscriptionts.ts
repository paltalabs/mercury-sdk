import { gql } from "graphql-request";

export const GET_CONTRACT_SUBSCRIPTIONS = gql`
  query MyQuery($contractId: String!) {
    eventByContractId(searchedContractId: $contractId) {
      edges {
        node {
          contractId
          data
          ledger
          ledgerTimestamp
          topic2
          topic1
          topic4
          topic3
        }
      }
    }
  }
`;
