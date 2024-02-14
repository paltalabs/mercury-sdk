export interface GetContractEventsResponse {
  eventByContractId: EventByContractID;
}

export interface EventByContractID {
  nodes: Node[];
}

export interface Node {
  contractId: string;
  data: string;
  ledger: number;
  ledgerTimestamp: number;
  topic2: string;
  topic1: string;
  topic4: string;
  topic3: string;
}
