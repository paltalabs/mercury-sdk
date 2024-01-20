export interface ContractEntriesResponse {
  entryUpdateByContractId: ContractEntries;
}

export interface ContractEntries {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  valueXdr: string;
}