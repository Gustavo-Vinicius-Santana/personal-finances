import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormModalService } from '../../services/form-modal.service';
import { FinanceService } from '../../services/finance.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.scss'
})
export class FormEditComponent {
  private data = inject(MAT_DIALOG_DATA) as 
  { 
    id: string, 
    description: string, 
    amount: number, 
    typeForm: 'income' | 'expense' 
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

  name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  money = new FormControl(0, {
    nonNullable: true,
    validators: [Validators.required, Validators.min(0.01)]
  });

  formattedMoney = '';

  onMoneyInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // Remove tudo que não for número
    const onlyNumbers = input.value.replace(/\D/g, '');

    input.value = onlyNumbers;

    const numericValue = Number(onlyNumbers) / 100;

    this.money.setValue(numericValue);

    this.formattedMoney = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });


    input.value = this.formattedMoney;
  }

  ngOnInit() {
    console.log('Dados recebidos:', this.data);

    this.name.setValue(this.data.description);

    // 👇 ESSENCIAL
    this.money.setValue(this.data.amount);

    this.formattedMoney = this.data.amount.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }


  onSubmit() {
    this.submitted = true;

    if (this.name.invalid || this.money.invalid) {
      return;
    }

    this.finance.update(this.data.id, {
      description: this.name.value ,
      amount: this.money.value,
      type: this.typeForm()?.toUpperCase() as 'INCOME' | 'EXPENSE',
      date: new Date()
    }).subscribe();

    this.modal.close();
  }

  onDelete() {
    this.finance.remove(
      { 
        id: this.data.id,
        description: this.data.description,
        amount: this.data.amount,
        type: this.typeForm()?.toUpperCase() as 'INCOME' | 'EXPENSE',
        date: new Date()
      }
    ).subscribe({
      next: () => {
        this.modal.close();
      },
      error: console.error
    });
  }
}
