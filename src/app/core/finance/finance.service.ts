import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  api: string = `${API}/finance`;

  constructor(private http: HttpClient) { }

  getStudentPayments(studentId): Observable<any> {
    return this.http.get(`${this.api}/payments?student=${studentId}`);
  }

  balances(options): Observable<any> {
    return this.http.get(`${this.api}/balances?${createQuery(options)}`);
  }

  getStudentBalanceByAdm(adm): Observable<any> {
    return this.http.get(`${this.api}/balances?adm=${adm}`);
  }

  getBatchBalance(id, options = {}): Observable<any> {
    return this.http.get(`${this.api}/balances?batch=${id}&${createQuery(options)}`);
  }

  getPayments(options): Observable<any> {
    return this.http.get(`${this.api}/payments?${createQuery(options)}`);
  }

  pay(formData): Observable<any> {
    return this.http.post(`${this.api}/payments`, formData);
  }
}
