
export interface Transaction {
    id: number;
    transactionTypeId: number;
    transactionType?: string;
    categoryId: number;
    category?: string;
    title: string;
    description?: string;
    amount: number;
    creationDate: Date;
  }