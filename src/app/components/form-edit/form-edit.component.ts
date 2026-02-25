import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormModalService } from '../../services/form-modal.service';
import { FinanceService } from '../../services/finance.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-edit',
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
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
  ],
})
export class FormEditComponent implements OnInit {

  private snackBar = inject(MatSnackBar);
  private data = inject(MAT_DIALOG_DATA) as 
  { 
    id: string, 
    description: string, 
    amount: number, 
    typeForm: 'income' | 'expense',
    date?: Date
  };

  typeForm = signal<string | null>(this.data?.typeForm ?? null);

  labelForm = computed(() =>
    this.typeForm() === 'income'
      ? 'Editar Receita'
      : 'Editar Despesa'
  );

  modal = inject(FormModalService);
  finance = inject(FinanceService);

  submitted = false;
  today = new Date();

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
    this.name.setValue(this.data.description);
    this.money.setValue(this.data.amount);
    this.date.setValue(this.data.date ?? new Date());

    this.updateFormattedValue(this.data.amount);
  }

  onMoneyInput(event: Event) {
    const input = event.target as HTMLInputElement;

    const onlyNumbers = input.value.replace(/\D/g, '');
    const numericValue = Number(onlyNumbers || 0) / 100;

    this.money.setValue(numericValue);
    this.updateFormattedValue(numericValue);

    input.value = this.formattedMoney;
  }

  private updateFormattedValue(value: number) {
    const formatted = value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    this.formattedMoney =
      this.typeForm() === 'expense'
        ? `- ${formatted}`
        : formatted;
  }

  onSubmit() {
    this.submitted = true;

    if (this.name.invalid || this.money.invalid || this.date.invalid) {
      return;
    }

    this.finance.update(this.data.id, {
      description: this.name.value,
      amount: this.money.value,
      type: this.typeForm()?.toUpperCase() as 'INCOME' | 'EXPENSE',
      date: this.date.value!
    }).subscribe({
      next: () => {
        this.snackBar.open('Item atualizado com sucesso!', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.modal.close();
      },
      error: () => {
        this.snackBar.open('Erro ao atualizar item. Tente novamente.', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  onDelete() {
    this.finance.remove({
      id: this.data.id,
      description: this.name.value,
      amount: this.money.value,
      type: this.typeForm()?.toUpperCase() as 'INCOME' | 'EXPENSE',
      date: this.date.value!
    }).subscribe({
      next: () => {
        this.snackBar.open('Item removido com sucesso!', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.modal.close();
      },
      error: () => {
        this.snackBar.open('Erro ao remover item. Tente novamente.', undefined, { 
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }
}