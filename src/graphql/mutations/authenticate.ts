import { gql } from "graphql-request";

export const AUTHENTICATE = gql`
  mutation MyMutation($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      clientMutationId
      jwtToken
    }
  }
`;
