import { Injectable } from '@angular/core';
import { Http } from 'src/app/http/http';
import { environment } from 'src/environments/environment';
import { Employee } from 'src/app/models/employee.model';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { EmployeeBank } from 'src/app/models/employee-bank-details.model';
import { CacheService } from 'src/app/cache-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  api: string = `${environment.apiUrl}/api`;

  constructor(private http: Http, private cacheService: CacheService) { }

  add(employee: Employee | Employee[]): Observable<any> {
    this.cacheService.clear(`${this.api}/employees`);
    return this.http._post(`${this.api}/employees`, employee);
  }

  active(options): Observable<any> {
    return this.cacheService.cache(`${this.api}/employees?type=active&${createQuery(options)}`);
  }

  retired(options): Observable<any> {
    return this.cacheService.cache(`${this.api}/employees?type=retired&${createQuery(options)}`);
  }

  transfered(options): Observable<any> {
    return this.cacheService.cache(`${this.api}/employees?type=transfered&${createQuery(options)}`);
  }

  update(employee: Employee, id: number): Observable<any> {
    this.cacheService.clear(`${this.api}/employees`);
    return this.http._put(`${this.api}/employees?id=${id}`, employee);
  }

  bankDetails(empId: number): Observable<any> {
    return this.cacheService.cache(`${this.api}/employees/bank-details?id=${empId}`);
  }

  employeeContacts(empId: number): Observable<any> {
    return this.cacheService.cache(`${this.api}/employees/contacts?id=${empId}`);
  }

  updateBankDetails(details: EmployeeBank, id: number): Observable<any> {
    this.cacheService.clear(`${this.api}/employees/bank-details?id=${id}`);
    return this.http._put(`${this.api}/employees/bank-details?id=${id}`, details);
  }

  addBankDetails(details: EmployeeBank): Observable<any> {
    return this.http._post(`${this.api}/employees/bank-details`, details);
  }

  addContact(data): Observable<any> {
    return this.http._post(`${this.api}/employees/contacts`, data);
  }

  deleteContact(id): Observable<any> {
    return this.http._delete(`${this.api}/employees/contacts?id=${id}`);
  }

  delete(ids: number[]): Observable<any> {
    this.cacheService.clear(`${this.api}/employees`);
    return this.http._delete(`${this.api}/employees?id=${ids.join(',')}`);
  }

  retire(ids: number[]): Observable<any> {
    this.cacheService.clear(`${this.api}/employees`);
    return this.http._post(`${this.api}/employees/retire`, ids);
  }

  transfer(ids: number[]): Observable<any> {
    this.cacheService.clear(`${this.api}/employees`);
    return this.http._post(`${this.api}/employees/transfer`, ids);
  }

  restore(ids: number[]): Observable<any> {
    this.cacheService.clear(`${this.api}/employees`);
    return this.http._post(`${this.api}/employees/activate`, ids);
  }
}
