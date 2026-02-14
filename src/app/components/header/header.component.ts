import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  goToLogin() {
    this.router.navigate(['']);
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
