import axios, { AxiosInstance } from "axios";

export class Mercury {
  private jwtToken: string;
  private backendInstance: AxiosInstance;

  constructor(backendEndpoint: string, token: string) {
    this.jwtToken = token
    this.backendInstance = axios.create({
      baseURL: backendEndpoint,
      headers: {
        Authorization: `Bearer ${token} `,
      },
    })
  }

  // async query<T>(query: string, variables?: { [key: string]: any }): Promise<T> {
  //   try {
  //     return await this.client.request<T>(query, variables);
  //   } catch (error) {
  //     console.error('GraphQL query failed:', error);
  //     throw error;
  //   }
  // }

  // Add more methods if needed for mutations or subscriptions
}

// export const axiosBackendInstance = axios.create({
//   baseURL: process.env.MERCURY_BACKEND_ENDPOINT,
//   headers: {
//     Authorization: `Bearer ${process.env.MERCURY_ACCESS_TOKEN} `,
//   },
// });

// export const axiosGraphqlInstance = axios.create({
//   baseURL: `${process.env.MERCURY_GRAPHQL_ENDPOINT}/graphql`,
//   headers: {
//     Authorization: `Bearer ${process.env.MERCURY_ACCESS_TOKEN} `,
//   },
// });

// export default MercuryGraphQL;
