import path from "path";
import * as fs from "fs";
import { sentPaymentsQuery } from './graphql/queries/sentPaymentsQuery';
import { receivedPaymentsQuery } from './graphql/queries/receivedPaymentsQuery';
import { authenticateMutation } from "./graphql/mutations/authenticateMutation";
import { MUTATIONS_FILES } from "./graphql";
import { QUERIES_FILES } from "./graphql";
export const toSnakeCase = <T extends Record<string, any>>(
  obj: T
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      return [snakeKey, value];
    })
  );
};

export const getMutationFromFile = (name: string) => {
  switch (name) {
    case MUTATIONS_FILES.AUTHENTICATE:
      return authenticateMutation;
    default:
      // Handle other cases or throw an error
      throw new Error(`Mutation not found: ${name}`);
  }
};

export const getQueryFromFile = (name: string) => {
  switch (name) {
    case QUERIES_FILES.GET_RECEIVED_PAYMENTS:
      return receivedPaymentsQuery;
    case QUERIES_FILES.GET_SENT_PAYMENTS:
      return sentPaymentsQuery;
    default:
      // Handle other cases or throw an error
      throw new Error(`Query not found: ${name}`);
  }
};
