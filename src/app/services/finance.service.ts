import { Injectable, signal, computed } from '@angular/core';
import { FinanceItem } from '../models/finance.model';
import { FINANCE_MOCK } from '../data/finance.mock';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {
  private items = signal<FinanceItem[]>([]);

  constructor() {
    this.items.set(FINANCE_MOCK);
  }

  readonly all = this.items.asReadonly();

  readonly incomes = computed(() =>
    this.items().filter(item => item.type === 'income')
  );

  readonly expenses = computed(() =>
    this.items().filter(item => item.type === 'expense')
  );

  readonly totalIncome = computed(() =>
    this.incomes().reduce((acc, cur) => acc + cur.amount, 0)
  );

  readonly totalExpense = computed(() =>
    this.expenses().reduce((acc, cur) => acc + cur.amount, 0)
  );

  readonly balance = computed(() =>
    this.totalIncome() - this.totalExpense()
  );

  add(item: FinanceItem) {
    this.items.update(list => [...list, item]);
  }

  remove(id: string) {
    this.items.update(list => list.filter(item => item.id !== id));
  }
}
