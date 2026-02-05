import { Component, inject } from '@angular/core';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'app-income',
  imports: [],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  finance = inject(FinanceService);
}
