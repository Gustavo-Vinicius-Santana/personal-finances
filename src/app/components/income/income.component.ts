import { Component, inject } from '@angular/core';
import { FinanceService } from '../../services/finance.service';
import { ButtonAddComponent } from '../button-add/button-add.component';

@Component({
  selector: 'app-income',
  imports: [ButtonAddComponent],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  finance = inject(FinanceService);
}
