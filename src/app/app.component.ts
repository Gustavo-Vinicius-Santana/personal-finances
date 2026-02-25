import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FinanceService } from './services/finance.service';
import { FormModalService } from './services/form-modal.service';
import { FormAddComponent } from './components/form-add/form-add.component';
import { LoadingOverlayComponent } from "./components/loading-overlay/loading-overlay.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingOverlayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
