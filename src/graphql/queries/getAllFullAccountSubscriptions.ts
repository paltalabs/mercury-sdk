import { gql } from "graphql-request";

export const GET_ALL_FULL_ACCOUNT_SUBSCRIPTIONS = gql`
  query MyQuery {
    allFullAccountSubscriptions {
      edges {
        node {
          id
          nodeId
          publickey
          userId
        }
      }
    }
  }
`;
