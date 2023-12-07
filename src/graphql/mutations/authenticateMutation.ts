export const authenticateMutation = `
mutation MyMutation($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      clientMutationId
      jwtToken
    }
  }
  `