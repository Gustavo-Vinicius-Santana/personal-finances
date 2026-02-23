import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
    }
  }

  email = new FormControl('', { 
    nonNullable: true,
    validators: [Validators.required]
  });
  password = new FormControl('', { 
    nonNullable: true,
    validators: [Validators.required]
  });
  remember = new FormControl(false, { nonNullable: true });

  handleSubmitLogin() {
    if (this.email.invalid || this.password.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos', 'OK', { 
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    this.login();
  }

  login() {
    this.authService.login({
      email: this.email.value,
      password: this.password.value
    }, this.remember.value).subscribe({
      next: () => {
        this.snackBar.open('Login bem-sucedido!', 'OK', { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['home']);
      },
      error: () => {
        this.snackBar.open('Erro no login', 'OK', { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}