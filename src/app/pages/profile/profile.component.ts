import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

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

  updateProfile() {
    this.authService.updateUser({
      name: this.name.value as string,
    }).subscribe({
      next: (data) => {
        console.log('Perfil atualizado:', data);
        this.snackBar.open('Perfil atualizado com sucesso', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil:', err);
        this.snackBar.open('Erro ao atualizar perfil', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  goToChangeEmail() {
    console.log('Navegando para change-email, enviando email:', this.email.value);
    this.router.navigate(['/change-email'], {state: { email: this.email.value }});
  }

  goToChangePassword() {
    console.log('Navegando para change-password, enviando email:', this.email.value);
    this.router.navigate(['/change-password'], {state: { email: this.email.value }});
  }


}
