export interface SearchDebtsPayload {
  phrase: string;
}

export interface Debt {
  Id: number;
  Name: string;
  NIP: string;
  Date: Date;
  Value: number;
  Address: string;
  DocumentType: string;
  Price: number;
  Number: string;
}
