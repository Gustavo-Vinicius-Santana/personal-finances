import { Injectable, signal } from '@angular/core';

export type FormType = 'income' | 'expense' | null;

@Injectable({ providedIn: 'root' })
export class FormModalService {
  activeForm = signal<FormType>(null);

  open(form: FormType) {
    this.activeForm.set(form);
  }

  close() {
    this.activeForm.set(null);
  }

  switch(form: FormType) {
    this.activeForm.set(form);
  }
}
