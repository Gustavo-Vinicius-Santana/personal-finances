import { Component, inject, input, OnInit, OnDestroy } from '@angular/core';
import { FinanceService } from '../../services/finance.service';
import { ButtonAddComponent } from '../button-add/button-add.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FinanceItemResponse } from '../../models/finance.model';
import { Subscription } from 'rxjs';

registerLocaleData(localePt);

type FinancialMovementType = 'income' | 'expense';

@Component({
  selector: 'app-financial-movement',
  imports: [ButtonAddComponent, CurrencyPipe],
  templateUrl: './financial-movement.component.html',
  styleUrl: './financial-movement.component.scss'
})
export class FinancialMovementComponent implements OnInit, OnDestroy {
  movement = input<FinancialMovementType>();

  financeService = inject(FinanceService);

  items: FinanceItemResponse[] = [];
  total = 0;

  private subscription?: Subscription;

  ngOnInit() {
    const type = this.movement()?.toUpperCase() as 'INCOME' | 'EXPENSE';

    const observable$ = type === 'INCOME' ? this.financeService.income$ : this.financeService.expense$;

    this.subscription = observable$.subscribe(data => {
      this.items = data;
      this.total = data.reduce((acc, cur) => acc + cur.amount, 0);
    });

    this.financeService.getAll(type).subscribe({
      next: () => {},
      error: console.error
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}