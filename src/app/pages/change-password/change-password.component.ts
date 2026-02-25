import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  countdown = 0;
  private intervalId: any;

  email = '';

  code = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    this.email = history.state?.email;
  }

  sendCode() {
    this.startCountdown();

    this.authService.forgotPassword(this.email!)
    .subscribe({
      next: () => {
        console.log('Código de recuperação enviado para o email:', this.email);

        this.snackBar.open('Código de recuperação enviado para o email', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
      },
      error: (err) => {
        console.error('Erro ao enviar código de recuperação:', err);
        this.snackBar.open('Erro ao enviar código de recuperação', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  startCountdown() {
  this.countdown = 30;

  this.intervalId = setInterval(() => {
    this.countdown--;

    if (this.countdown <= 0) {
      clearInterval(this.intervalId);
    }
  }, 1000);
}

  changePassword() {
    if (this.code.invalid || this.newPassword.invalid) {
      this.code.markAsTouched();
      this.newPassword.markAsTouched();
      return;
    }

    this.authService.resetPassword({
      email: history.state?.email,
      code: this.code.value!,
      newPassword: this.newPassword.value!
    }).subscribe({
      next: () => {
        this.snackBar.open('Senha alterada com sucesso!', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Erro ao alterar senha', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/profile']);
  }

}
