import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

type Step = 'email' | 'reset';

@Component({
  selector: 'app-recover-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './recover-account.component.html',
  styleUrl: './recover-account.component.scss'
})
export class RecoverAccountComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

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
      .subscribe({
        next: () => {
          this.loading = false;
          this.step = 'reset';
        },
        error: () => {
          this.loading = false;
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
    .subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['']);
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}