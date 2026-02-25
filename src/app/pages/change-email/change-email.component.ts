import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-email',
  imports: [ReactiveFormsModule],
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.scss'
})
export class ChangeEmailComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  currentEmail = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  newEmail = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    console.log('Email recebido via state:', history.state?.email);
    this.currentEmail.setValue(history.state?.email);
  }

  changeEmail() {
    if (this.currentEmail.invalid || this.newEmail.invalid) {
      this.currentEmail.markAsTouched();
      this.newEmail.markAsTouched();
      return;
    }

    if (this.currentEmail.value === this.newEmail.value) {
      this.snackBar.open('Novo email deve ser diferente do atual', undefined, {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      })
      return;
    }

    this.authService.changeEmail({
      currentEmail: this.currentEmail.value!,
      newEmail: this.newEmail.value!,
      password: this.password.value!
    }).subscribe({
      next: () => {
        this.snackBar.open('Email atualizado com sucesso', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Erro ao atualizar email', undefined, { 
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
