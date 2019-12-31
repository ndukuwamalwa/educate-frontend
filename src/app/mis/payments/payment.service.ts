import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Http } from 'src/app/http/http';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  api = `${environment.apiUrl}/api`;

  constructor(private http: Http) { }

  addBankslip(payment): Observable<any> {
    return this.http._post(`${this.api}/payments/bankslip`, payment);
  }

  updateBankslip(payment, id): Observable<any> {
    return this.http._put(`${this.api}/payments/bankslip?id=${id}`, payment);
  }

  deleteBankslip(id): Observable<any> {
    return this.http._delete(`${this.api}/payments/bankslip?id=${id}`);
  }

  getBankslips(options): Observable<any> {
    return this.http._get(`${this.api}/payments/bankslip?${createQuery(options)}`);
  }

  viewBankslip(id): Observable<any> {
    return this.http._get(`${this.api}/payments/bankslip?id=${id}`);
  }

  addCash(payment): Observable<any> {
    return this.http._post(`${this.api}/payments/cash`, payment);
  }

  updateCash(payment, id): Observable<any> {
    return this.http._post(`${this.api}/payments/cash?id=${id}`, payment);
  }

  deleteCash(id): Observable<any> {
    return this.http._delete(`${this.api}/payments/cash?id=${id}`);
  }

  getCash(options): Observable<any> {
    return this.http._get(`${this.api}/payments/cash?${createQuery(options)}`);
  }

  viewCash(id): Observable<any> {
    return this.http._get(`${this.api}/payments/cash?id=${id}`);
  }

  getMPESA(options): Observable<any> {
    return this.http._get(`${this.api}/payments/mpesa?${createQuery(options)}`);
  }

  delete(id): Observable<any> {
    return this.http._delete(`${this.api}/payments?id=${id}`);
  }

  addCheque(data): Observable<any> {
    return this.http._post(`${this.api}/payments/cheque`, data);
  }

  getCheques(options): Observable<any> {
    return this.http._get(`${this.api}/payments/cheque?${createQuery(options)}`);
  }

  deleteCheque(id): Observable<any> {
    return this.http._delete(`${this.api}/payments/cheque?id=${id}`);
  }

  getBeneficiaries(chequeId): Observable<any> {
    return this.http._get(`${this.api}/payments/cheque/beneficiaries?id=${chequeId}`);
  }

  deleteBeneficiary(id): Observable<any> {
    return this.http._delete(`${this.api}/payments/cheque/beneficiaries?id=${id}`);
  }

  addBeneficiary(data): Observable<any> {
    return this.http._post(`${this.api}/payments/cheque/beneficiaries`, data);
  }
}
