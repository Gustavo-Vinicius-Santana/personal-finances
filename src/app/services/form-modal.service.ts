import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';

export type FormType = 'income' | 'expense';

@Injectable({ providedIn: 'root' })
export class FormModalService {

  private dialog = inject(MatDialog);
  private dialogRef?: MatDialogRef<ModalComponent>;

  open<T>(component: any, data?: any) {
    this.dialogRef = this.dialog.open(component, {
      width: '500px',
      disableClose: false,
      data,
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
