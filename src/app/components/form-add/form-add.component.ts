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

    // Atualiza o valor visível imediatamente
    input.value = onlyNumbers;

    // Converte para número real (centavos)
    const numericValue = Number(onlyNumbers) / 100;

    // Atualiza o FormControl
    this.money.setValue(numericValue);

    // Atualiza o valor formatado
    this.formattedMoney = numericValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    // Atualiza o input com a máscara final
    input.value = this.formattedMoney;
  }


  onSubmit() {
    this.submitted = true;

    if (this.name.invalid || this.money.invalid) {
      return;
    }

    this.finance.add({
      id: crypto.randomUUID(),
      description: this.name.value,
      amount: this.money.value,
      date: new Date(),
      type: this.typeForm() === 'income' ? 'income' : 'expense'
    });

    this.modal.close();
  }
}
