import { Component, inject } from '@angular/core';
import { ExpensesComponent } from '../../components/expenses/expenses.component';
import { IncomeComponent } from '../../components/income/income.component';
import { FormAddComponent } from '../../components/form-add/form-add.component';
import { FinanceService } from '../../services/finance.service';
import { FormModalService } from '../../services/form-modal.service';
import { CurrencyPipe, registerLocaleData  } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-home',
  imports: [ ExpensesComponent, IncomeComponent, FormAddComponent, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  finance = inject(FinanceService);

  title = 'personal-finances';

  modal = inject(FormModalService);

}
