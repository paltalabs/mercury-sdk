import { gql } from "graphql-request";

export const GET_ALL_CONTRACT_EVENT_SUBSCRIPTIONS = gql`
  query MyQuery {
    allContractEventSubscriptions {
      edges {
        node {
          contractId
          topic1
          topic2
          topic3
          topic4
          subscriptionId
          userId
          maxSingleSize
        }
      }
    }
  }
`;
