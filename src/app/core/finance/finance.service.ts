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

  addCheque(data): Observable<any> {
    return this.http._post(`${this.api}/cheques`, data);
  }

  updateCheque(data): Observable<any> {
    return this.http._put(`${this.api}/cheques?id=${data.id}`, data);
  }

  getCheque(id): Observable<any> {
    return this.http._get(`${this.api}/cheques?id=${id}`);
  }

  getCheques(options = {}): Observable<any> {
    return this.http._get(`${this.api}/cheques?${createQuery(options)}`);
  }

  addBeneficiaries(beneficiaries: any[]): Observable<any> {
    return this.http._post(`${this.api}/cheques/beneficiaries?bulk=true`, beneficiaries);
  }

  getBeneficiaries(id, options = {}): Observable<any> {
    return this.http._get(`${this.api}/cheques/beneficiaries?${createQuery(options)}&id=${id}`);
  }

  deleteBeneficiary(id): Observable<any> {
    return this.http._delete(`${this.api}/cheques/beneficiaries?id=${id}`)
  }

  deleteCheque(id): Observable<any> {
    return this.http._delete(`${this.api}/cheques?id=${id}`);
  }
}
