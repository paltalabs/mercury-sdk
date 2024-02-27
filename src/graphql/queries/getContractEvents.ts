import { gql } from "graphql-request";

export const GET_CONTRACT_EVENTS = gql`
query MyQuery {
  eventByContractId(searchedContractId: "CONTRACT_ID") {
    nodes {
      contractId
      data
      topic1
      topic2
      topic3
      topic4
      txInfoByTx {
        ledgerByLedger {
          closeTime
          sequence
        }
        memo
        txHash
        opCount
        fee
      }
    }
  }
}

`;
