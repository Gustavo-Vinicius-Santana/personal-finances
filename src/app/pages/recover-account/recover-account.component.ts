import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recover-account',
  imports: [],
  templateUrl: './recover-account.component.html',
  styleUrl: './recover-account.component.scss'
})
export class RecoverAccountComponent {
  private router = inject(Router);

  goToLogin() {
    this.router.navigate(['']);
  }
}
