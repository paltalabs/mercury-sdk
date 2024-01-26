import { gql } from "graphql-request";

export const getCustomQuery = (query: string) => { 
    return gql`${query}`
}
