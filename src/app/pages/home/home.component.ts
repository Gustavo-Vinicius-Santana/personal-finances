import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { ExpensesComponent } from '../../components/expenses/expenses.component';
import { IncomeComponent } from '../../components/income/income.component';
import { FormAddComponent } from '../../components/form-add/form-add.component';
import { FinanceService } from '../../services/finance.service';
import { FormModalService } from '../../services/form-modal.service';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, HeaderComponent, ExpensesComponent, IncomeComponent, FormAddComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  finance = inject(FinanceService);

  title = 'personal-finances';

  modal = inject(FormModalService);

}
