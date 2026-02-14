import { Component, inject, input } from '@angular/core';
import { FinanceService } from '../../services/finance.service';
import { ButtonAddComponent } from '../button-add/button-add.component';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

type FinancialMovementType = 'income' | 'expense';

@Component({
  selector: 'app-financial-movement',
  imports: [ButtonAddComponent, CurrencyPipe],
  templateUrl: './financial-movement.component.html',
  styleUrl: './financial-movement.component.scss'
})
export class FinancialMovementComponent {
  movement = input<FinancialMovementType>();

  finance = inject(FinanceService);
}
