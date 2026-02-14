import { Component, inject } from '@angular/core';
import { FinanceService } from '../../services/finance.service';
import { ButtonAddComponent } from '../button-add/button-add.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-income',
  imports: [ButtonAddComponent, CurrencyPipe],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  finance = inject(FinanceService);
}
