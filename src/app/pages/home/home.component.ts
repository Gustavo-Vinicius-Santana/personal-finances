import { Component, inject } from '@angular/core';
import { FormAddComponent } from '../../components/form-add/form-add.component';
import { FinancialMovementComponent } from '../../components/financial-movement/financial-movement.component';
import { FinanceService } from '../../services/finance.service';
import { FormModalService } from '../../services/form-modal.service';
import { CurrencyPipe, registerLocaleData  } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-home',
  imports: [ FormAddComponent, FinancialMovementComponent, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  finance = inject(FinanceService);

  title = 'personal-finances';

  modal = inject(FormModalService);

}
