import { Injectable, signal, computed } from '@angular/core';
import { FinanceItemRequest, FinanceItemResponse } from '../models/finance.model';
import { inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment.development';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceService {

  private apiUrl = `${environment.apiUrl}`;
  readonly items = signal<FinanceItemResponse[]>([]);

  private incomeSubject = new BehaviorSubject<FinanceItemResponse[]>([]);
  readonly income$ = this.incomeSubject.asObservable();

  private expenseSubject = new BehaviorSubject<FinanceItemResponse[]>([]);
  readonly expense$ = this.expenseSubject.asObservable();

  readonly total = signal<number>(0);

  private refreshTotal() {
  this.http
    .get<{ total: number }>(`${this.apiUrl}/finance-movement/user-finances`)
    .subscribe(response => {
      this.total.set(response.total);
    });
}

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  create(data: FinanceItemRequest) {
    this.loadingService.show();
    return this.http
    .post<FinanceItemResponse>(
      `${this.apiUrl}/finance-movement`,
      data
    ).pipe(
      tap((newItem: FinanceItemResponse) => { 
        if(newItem.type === 'INCOME') {
          this.incomeSubject.next([...this.incomeSubject.value, newItem]);
        }
        if(newItem.type === 'EXPENSE') {
          this.expenseSubject.next([...this.expenseSubject.value, newItem]);
        }

        this.refreshTotal();
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  update(id: string, data: Partial<FinanceItemRequest>) {
    this.loadingService.show();
    return this.http.put<FinanceItemResponse>(
      `${this.apiUrl}/finance-movement/${id}`,
      data
    ).pipe(
      tap((updatedItem: FinanceItemResponse) => {
        if(updatedItem.type === 'INCOME') {
          this.incomeSubject.next(this.incomeSubject.value.map(item => item.id === id ? updatedItem : item));
        }
        if(updatedItem.type === 'EXPENSE') {
          this.expenseSubject.next(this.expenseSubject.value.map(item => item.id === id ? updatedItem : item));
        }
        this.refreshTotal();
      }
    ),
    finalize(() => this.loadingService.hide())
  );
  }

  getById(id: string) {
    return this.http.get<FinanceItemResponse>(
      `${this.apiUrl}/finance-movement/${id}`
    );
  }

  getAll(type?: 'INCOME' | 'EXPENSE' | '') {
    return this.http.get<FinanceItemResponse[]>(
      `${this.apiUrl}/finance-movement?type=${type}`
    ).pipe(
      tap((data: FinanceItemResponse[]) =>{
        if(type === 'INCOME') {
          this.refreshTotal();
          this.incomeSubject.next(data);
        }
        if(type === 'EXPENSE') {
          this.expenseSubject.next(data);
        }
      })
    );
  }

  remove(item: FinanceItemResponse) {
    this.loadingService.show();
    return this.http.delete(`${this.apiUrl}/finance-movement/${item.id}`).pipe(
      tap(() => {
        if (item.type === 'INCOME')
          this.incomeSubject.next(this.incomeSubject.value.filter(i => i.id !== item.id));
        if (item.type === 'EXPENSE')
          this.expenseSubject.next(this.expenseSubject.value.filter(i => i.id !== item.id));
        this.refreshTotal();
      }),
      finalize(() => this.loadingService.hide())
    );
  }

  getUserFinances() {
    return this.http.get(`${this.apiUrl}/finance-movement/user-finances`).pipe();
  }
}
