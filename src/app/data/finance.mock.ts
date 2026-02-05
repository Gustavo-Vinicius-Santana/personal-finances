import { FinanceItem } from '../models/finance.model';

export const FINANCE_MOCK: FinanceItem[] = [
  {
    id: '1',
    description: 'Salário',
    amount: 5000,
    date: new Date(),
    type: 'income',
  },
  {
    id: '2',
    description: 'Aluguel',
    amount: 1800,
    date: new Date(),
    type: 'expense',
  },
];
