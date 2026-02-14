import { Component, inject, output } from '@angular/core';
import { FinanceService } from '../../services/finance.service';
import { ButtonAddComponent } from '../button-add/button-add.component';
import { FormModalService } from '../../services/form-modal.service';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-expenses',
  imports: [ButtonAddComponent, CurrencyPipe],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  finance = inject(FinanceService);
}
