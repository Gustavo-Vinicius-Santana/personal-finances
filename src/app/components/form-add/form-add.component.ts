import { Component, inject, input, output } from '@angular/core';
import { FormModalService } from '../../services/form-modal.service';

@Component({
  selector: 'app-form-add',
  imports: [],
  templateUrl: './form-add.component.html',
  styleUrl: './form-add.component.scss'
})
export class FormAddComponent {
  typeForm = input.required<string | null>();

  modal = inject(FormModalService);

  onClose() {
    this.modal.close();
  }
}
