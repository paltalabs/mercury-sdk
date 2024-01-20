import { gql } from "graphql-request";

export const GET_CONTRACT_ENTRIES = gql`
query MyQuery($contractId: String!) {
    entryUpdateByContractId(contract: $contractId) {
        edges {
            node {
                keyXdr
                valueXdr
            }
        }
    }
}
`;
