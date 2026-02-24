import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { FormModalService } from '../../services/form-modal.service';
import { FinanceService } from '../../services/finance.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss',
  providers: [
  provideNativeDateAdapter(),
  { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
],
})
export class FormAddComponent implements OnInit {

  private data = inject(MAT_DIALOG_DATA) as { typeForm: 'income' | 'expense' };
  private snackBar = inject(MatSnackBar);

  today = new Date();

  typeForm = signal<string | null>(this.data?.typeForm ?? null);

  labelForm = computed(() =>
    this.typeForm() === 'income'
      ? 'Adicionar Receita'
      : 'Adicionar Despesa'
  );

  modal = inject(FormModalService);
  finance = inject(FinanceService);

  submitted = false;

  name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)]
  });

  money = new FormControl(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0.01)]
  });

  date = new FormControl<Date | null>(new Date(), {
    validators: [Validators.required]
  });

  formattedMoney = '0,00';

  ngOnInit() {
    this.money.setValue(0);
  }

  onMoneyInput(event: Event) {
    const input = event.target as HTMLInputElement;

    const onlyNumbers = input.value.replace(/\D/g, '');
    const numericValue = Number(onlyNumbers || 0) / 100;

    this.money.setValue(numericValue);

    const formatted = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    this.formattedMoney =
      this.typeForm() === 'expense'
        ? `- ${formatted}`
        : formatted;

    input.value = this.formattedMoney;
  }

  onSubmit() {
    this.submitted = true;

    if (this.name.invalid || this.money.invalid || this.date.invalid) {
      return;
    }

    this.finance.create({
      description: this.name.value,
      amount: this.money.value,
      type: this.typeForm()?.toUpperCase() as 'INCOME' | 'EXPENSE',
      date: this.date.value!
    }).subscribe(({
      next: () => {
        this.snackBar.open(`${this.typeForm() === 'income' ? 'Receita' : 'Despesa'} adicionada com sucesso!`, undefined, {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
      },
      error: () => {
        this.snackBar.open(`Erro ao adicionar ${this.typeForm() === 'income' ? 'receita' : 'despesa'}. Tente novamente.`, undefined, {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    }));

    this.modal.close();
  }
}