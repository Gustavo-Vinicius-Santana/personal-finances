export type FinanceType = 'INCOME' | 'EXPENSE';

export interface FinanceItemResponse {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: FinanceType;
}

export interface FinanceItemRequest {
  description: string;
  amount: number;
  date: Date;
  type: FinanceType;
}
