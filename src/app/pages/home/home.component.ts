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
export class HomeComponent {
  title = 'personal-finances';

  financeService = inject(FinanceService);
  modal = inject(FormModalService);

  loading = false;

  total = computed(() => this.financeService.total());

}