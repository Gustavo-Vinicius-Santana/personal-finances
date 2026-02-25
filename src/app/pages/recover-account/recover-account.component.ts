import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

type Step = 'email' | 'reset';

@Component({
  selector: 'app-recover-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatSnackBarModule],
  templateUrl: './recover-account.component.html',
  styleUrl: './recover-account.component.scss'
})
export class RecoverAccountComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  step: Step = 'email';
  loading = false;

  email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  });

  code = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(6)]
  });

  newPassword = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(6)]
  });

  sendEmail() {
    if (this.email.invalid) {
      this.email.markAsTouched();
      return;
    }

    this.loading = true;

    this.authService.forgotPassword(this.email.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.snackBar.open(
            'Código enviado para seu email',
            undefined,
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-success']
            }
          );

          this.step = 'reset';
        },
        error: () => {
          this.snackBar.open(
            'Erro ao enviar código. Tente novamente.',
            undefined,
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-error']
            }
          );
        }
      });
  }

  changePassword() {
    if (this.code.invalid || this.newPassword.invalid) {
      this.code.markAsTouched();
      this.newPassword.markAsTouched();
      return;
    }

    this.loading = true;

    this.authService.resetPassword({
      email: this.email.value,
      code: this.code.value,
      newPassword: this.newPassword.value
    })
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: () => {
        this.snackBar.open(
          'Senha alterada com sucesso',
          undefined,
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          }
        );

        this.router.navigate(['']);
      },
      error: () => {
        this.snackBar.open(
          'Código inválido ou expirado',
          undefined,
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          }
        );
      }
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}