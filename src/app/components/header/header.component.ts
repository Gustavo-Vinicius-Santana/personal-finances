import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  name: string | null = null;

  ngOnInit() {
    this.getUserName();
  }

  getUserName() {
    this.authService.getCurrentUser()
    .subscribe(user => {
      this.name = user.name;
    });
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
}
