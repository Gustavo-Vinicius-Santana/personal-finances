import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormAddComponent } from "../form-add/form-add.component";

export type FormType = 'income' | 'expense';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    FormAddComponent
],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  formType = inject(MAT_DIALOG_DATA) as FormType;

}
