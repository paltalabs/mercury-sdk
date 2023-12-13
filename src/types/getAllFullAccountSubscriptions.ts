export interface GetAllFullAccountSubscriptionsResponse {
  allFullAccountSubscriptions: AllFullAccountSubscriptions;
}

export interface AllFullAccountSubscriptions {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  id: number;
  nodeId: string;
  publickey: string;
  userId: number;
}
