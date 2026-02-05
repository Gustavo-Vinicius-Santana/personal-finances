export type FinanceType = 'income' | 'expense';

export interface FinanceItem {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: FinanceType;
}
