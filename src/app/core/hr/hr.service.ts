import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  api: string = `${API}/hr`;

  constructor(private http: Http) { }

  getNonTeachers(): Observable<any> {
    return this.http._get(`${this.api}?notTeachers=true`);
  }

  addEmployee(data): Observable<any> {
    return this.http._post(this.api, data);
  } 

  getEmployee(id: number | string): Observable<any> {
    return this.http._get(`${this.api}?id=${id}`);
  }

  getEmployees(options = {}): Observable<any> {
    return this.http._get(`${this.api}?${createQuery(options)}`);
  }

  updateEmployee(data): Observable<any> {
    return this.http._put(`${this.api}?id=${data.id}`, data);
  }

  saveSalary(data): Observable<any> {
    if (data.id) return this.http._post(`${this.api}/salaries?id=${data.id}`, data);
    return this.http._post(`${this.api}/salaries`, data);
  }

  getSalary(employee): Observable<any> {
    return this.http._get(`${this.api}/salaries?employee=${employee}`);
  }

  delete(id): Observable<any> {
    return this.http._delete(`${this.api}?id=${id}`);
  }
}
