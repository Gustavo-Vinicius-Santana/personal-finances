import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [MatIconModule, MatMenuModule, MatProgressSpinnerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  name: string | null = null;
  loading = false;

  ngOnInit() {
    this.getUserName();
  }

  getUserName() {
    this.loading = true;
    this.authService.user$.subscribe(user => {
      this.name = user?.name
        ? this.formatName(user.name)
        : null;
      this.loading = false;
    });

    this.authService.getCurrentUser()
      .subscribe();
  }

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

  private formatName(fullName: string): string {
  if (!fullName) return '';

  const parts = fullName.trim().split(' ').filter(p => p.length > 0);

  if (parts.length === 1) {
    return parts[0]; // só tem primeiro nome
  }

  const firstName = parts[0];
  const secondInitial = parts[1].charAt(0).toUpperCase();

  return `${firstName} ${secondInitial}.`;
}
}
