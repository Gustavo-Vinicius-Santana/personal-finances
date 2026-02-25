import { Component, inject, input, OnInit, OnDestroy } from '@angular/core';
import { FinanceService } from '../../services/finance.service';
import { ButtonAddComponent } from '../button-add/button-add.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FinanceItemResponse } from '../../models/finance.model';
import { Subscription } from 'rxjs';
import { FormEditComponent } from '../form-edit/form-edit.component';
import { FormModalService } from '../../services/form-modal.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

registerLocaleData(localePt);

type FinancialMovementType = 'income' | 'expense';

@Component({
  selector: 'app-financial-movement',
  imports: [ButtonAddComponent, CurrencyPipe, MatProgressSpinnerModule],
  templateUrl: './financial-movement.component.html',
  styleUrl: './financial-movement.component.scss'
})
export class FinancialMovementComponent implements OnInit, OnDestroy {
  movement = input<FinancialMovementType>();

  modal = inject(FormModalService);

  financeService = inject(FinanceService);

  items: FinanceItemResponse[] = [];
  total = 0;

  private subscription?: Subscription;
  loading = false;

  ngOnInit() {
    const type = this.movement()?.toUpperCase() as 'INCOME' | 'EXPENSE';

    const observable$ = type === 'INCOME' ? this.financeService.income$ : this.financeService.expense$;

    this.loading = true;
    this.subscription = observable$.subscribe(data => {
      this.items = data;
      this.total = data.reduce((acc, cur) => acc + cur.amount, 0);
    });

    this.financeService.getAll(type).subscribe({
      next: () => {
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  openEditModal(item: FinanceItemResponse) {
    const component = FormEditComponent;
    this.modal.open(component, {
      id: item.id,
      description: item.description,
      amount: item.amount,
      typeForm: this.movement() ?? 'income',
      date: new Date(item.date)
    });
  }
}