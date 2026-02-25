import { Component, computed, inject, OnInit } from '@angular/core';
import { FinancialMovementComponent } from '../../components/financial-movement/financial-movement.component';
import { FinanceService } from '../../services/finance.service';
import { FormModalService } from '../../services/form-modal.service';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FinanceItemResponse } from '../../models/finance.model';
import { Subscription } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

registerLocaleData(localePt);

@Component({
  selector: 'app-home',
  imports: [FinancialMovementComponent, CurrencyPipe, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  title = 'personal-finances';

  financeService = inject(FinanceService);
  modal = inject(FormModalService);

  incomes: FinanceItemResponse[] = [];
  expenses: FinanceItemResponse[] = [];
  balance = 0;

  private subscriptions: Subscription[] = [];
  loading = false;

  ngOnInit() {
    const subIncome = this.financeService.income$.subscribe(data => {
      this.incomes = data;
      this.updateBalance();
    });

    const subExpense = this.financeService.expense$.subscribe(data => {
      this.expenses = data;
      this.updateBalance();
    });

    this.subscriptions.push(subIncome, subExpense);

    // Carrega dados do backend
    this.loading = true;
    this.financeService.getAll('INCOME')
    .subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
    this.financeService.getAll('EXPENSE')
    .subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  private updateBalance() {
    const totalIncome = this.incomes.reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = this.expenses.reduce((acc, cur) => acc + cur.amount, 0);
    this.balance = totalIncome - totalExpense;
  }

  ngOnDestroy() {
    // Evita memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}