import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  api: string = `${API}/finance`;

  constructor(private http: Http) { }

  getStudentPayments(studentId): Observable<any> {
    return this.http._get(`${this.api}/payments?student=${studentId}`);
  }

  balances(options): Observable<any> {
    return this.http._get(`${this.api}/balances?${createQuery(options)}`);
  }

  getStudentBalanceByAdm(adm): Observable<any> {
    return this.http._get(`${this.api}/balances?adm=${adm}`);
  }

  getClassBalance(id, options = {}): Observable<any> {
    return this.http._get(`${this.api}/balances?class=${id}&${createQuery(options)}`);
  }

  getPayments(options): Observable<any> {
    return this.http._get(`${this.api}/payments?${createQuery(options)}`);
  }

  pay(formData): Observable<any> {
    return this.http._post(`${this.api}/payments`, formData);
  }
}
