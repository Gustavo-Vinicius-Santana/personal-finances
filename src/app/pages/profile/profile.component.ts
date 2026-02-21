import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  name = new FormControl('');
  email = new FormControl('');

  goBack() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.getUserData();
  }

  getUserData() {
    this.authService.getCurrentUser()
    .subscribe({
      next: (data) => {
        console.log('Dados do usuário:', data);
        this.name.setValue(data.name);
        this.email.setValue(data.email);
      },
      error: (err) => {
        console.error('Erro ao obter dados do usuário:', err);
      }
    });
  }


}
