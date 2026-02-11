import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomeComponent } from './components/income/income.component';
import { FinanceService } from './services/finance.service';
import { FormModalService } from './services/form-modal.service';
import { FormAddComponent } from './components/form-add/form-add.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ExpensesComponent, IncomeComponent, FormAddComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  finance = inject(FinanceService);

  title = 'personal-finances';

  modal = inject(FormModalService);
}
