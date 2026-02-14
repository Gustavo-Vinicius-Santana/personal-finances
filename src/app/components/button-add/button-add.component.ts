import { Component, input, inject, computed } from '@angular/core';
import { FormModalService, FormType } from '../../services/form-modal.service';

@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html'
})
export class ButtonAddComponent {
  label = input.required<string>();
  typeFormAdd = input.required<FormType>();

  labelText = computed(() => `Adicionar ${this.label()}`);

  modal = inject(FormModalService);

  onAdd() {
    this.modal.open(this.typeFormAdd());
  }
}
