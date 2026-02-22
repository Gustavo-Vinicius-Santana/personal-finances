import { Component, inject, Injector, Input, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

export type FormType = 'income' | 'expense';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule
],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() component!: Type<any>;

  data = inject(MAT_DIALOG_DATA);

  injector = Injector.create({
    providers: [{ provide: MAT_DIALOG_DATA, useValue: this.data }],
    parent: inject(Injector)
  });

}
