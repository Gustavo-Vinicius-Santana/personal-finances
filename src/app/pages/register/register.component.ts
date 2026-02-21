import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);

  private formBuilder = inject(FormBuilder);
  submitted = false;

  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email] ],
    password: ['', 
      [
        Validators.required, 
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9]).+$/)
      ]
    ],
    confirmPassword: ['', Validators.required]
  },
  {
    validators: this.passwordsMatchValidator
  });

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }

  get formControls() {
    return this.form.controls;
  }

  register() {
    this.submitted = true;

    if (this.form.invalid) {
      console.log('Formulário inválido');
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.value);

    this.authService.register({
      name: this.formControls.name.value as string,
      email: this.formControls.email.value as string,
      password: this.formControls.password.value as string
    }).subscribe({
      next: () => {
        this.snackBar.open('Registro bem-sucedido!', 'OK', { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.router.navigate(['home']);
      },
      error: () => {
        this.snackBar.open('Erro no registro', 'OK', { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }
}
