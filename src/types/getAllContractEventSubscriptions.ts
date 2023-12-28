export interface GetAllContractEventSubscriptionsResponse {
  allContractEventSubscriptions: AllContractEventSubscriptions;
}

export interface AllContractEventSubscriptions {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  contractId: null | string;
  topic1: string | null;
  topic2: string | null;
  topic3: string | null;
  topic4: string | null;
  subscriptionId: string;
  userId: number;
  maxSingleSize: number;
}
