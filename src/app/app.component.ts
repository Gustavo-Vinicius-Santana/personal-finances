import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomeComponent } from './components/income/income.component';
import { FinanceService } from './services/finance.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ExpensesComponent, IncomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  finance = inject(FinanceService);
  title = 'personal-finances';
}
