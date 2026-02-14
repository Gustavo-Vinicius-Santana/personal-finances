import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';

export type FormType = 'income' | 'expense';

@Injectable({ providedIn: 'root' })
export class FormModalService {

  private dialog = inject(MatDialog);
  private dialogRef?: MatDialogRef<ModalComponent>;

  open(form: FormType) {
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '500px',
      disableClose: false,
      data: form,
      panelClass: 'app-dialog-theme'
    });

    return this.dialogRef.afterClosed();
  }

  close() {
    this.dialogRef?.close();
  }

  switch(form: FormType) {
    this.dialogRef?.close();
    this.open(form);
  }
}
