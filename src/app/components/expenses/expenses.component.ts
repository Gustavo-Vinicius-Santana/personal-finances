import { Component, inject } from '@angular/core';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'app-expenses',
  imports: [],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  finance = inject(FinanceService);
}
