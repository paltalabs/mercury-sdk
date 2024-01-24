export interface SubscribeToContractEventsArgs {
  contractId: string;
  maxSingleSize?: number;
  topic1?: string;
  topic2?: string;
  topic3?: string;
  topic4?: string;
}

export interface SubscribeToLedgerEntriesArgs {
  contractId: string;
  keyXdr: string;
  durability: string;
  maxSingleSize?: number;
}

export interface SubscribeToMultipleLedgerEntriesArgs {
  contractId: Array<string>;
  keyXdr: string;
  durability: string;
  maxSingleSize?: number;
}

export interface SubscribeToLedgerEntriesExpirationArgs {
  hashXdr: string;
}

export interface SubscribeToFullAccountArgs {
  publicKey: string;
}
