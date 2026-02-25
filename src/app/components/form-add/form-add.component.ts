import { Component, computed, inject, input } from '@angular/core';
import { FormModalService } from '../../services/form-modal.service';
import { FinanceService } from '../../services/finance.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add',
  imports: [ReactiveFormsModule],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {
  typeForm = input.required<string | null>();

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


  onSubmit() {
    this.submitted = true;

    if (this.name.invalid || this.money.invalid) {
      return;
    }

    this.finance.create({
      description: this.name.value ,
      amount: this.money.value,
      type: this.typeForm()?.toUpperCase() as 'INCOME' | 'EXPENSE',
      date: new Date()
    }).subscribe();

    this.modal.close();
  }
}
