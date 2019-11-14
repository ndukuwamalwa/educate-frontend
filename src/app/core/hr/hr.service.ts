import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  api: string = `${API}/hr`;

  constructor(private http: HttpClient) { }

  getNonTeachers(): Observable<any> {
    return this.http.get(`${this.api}?notTeachers=true`);
  }

  addEmployee(data): Observable<any> {
    return this.http.post(this.api, data);
  } 

  getEmployee(id: number | string): Observable<any> {
    return this.http.get(`${this.api}?id=${id}`);
  }

  getEmployees(options = {}): Observable<any> {
    return this.http.get(`${this.api}?${createQuery(options)}`);
  }

  updateEmployee(data): Observable<any> {
    return this.http.put(`${this.api}?id=${data.id}`, data);
  }

  saveSalary(data): Observable<any> {
    if (data.id) return this.http.post(`${this.api}/salaries?id=${data.id}`, data);
    return this.http.post(`${this.api}/salaries`, data);
  }

  getSalary(employee): Observable<any> {
    return this.http.get(`${this.api}/salaries?employee=${employee}`);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.api}?id=${id}`);
  }
}
