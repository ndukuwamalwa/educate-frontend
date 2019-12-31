import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';
import { environment } from 'src/environments/environment';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class HostelService {
  api = `${environment.apiUrl}/api`;

  constructor(private http: Http) { }

  add(data): Observable<any> {
    return this.http._post(`${this.api}/hostels`, data);
  }

  list(): Observable<any> {
    return this.http._get(`${this.api}/hostels`);
  }

  delete(id): Observable<any> {
    return this.http._delete(`${this.api}/hostels?id=${id}`);
  }

  update(hostel, id): Observable<any> {
    return this.http._put(`${this.api}/hostels?id=${id}`, hostel);
  }

  removeStudent(id): Observable<any> {
    return this.http._delete(`${this.api}/hostels/students?id=${id}`);
  }

  getStudents(id, options): Observable<any> {
    return this.http._get(`${this.api}/hostels/students?id=${id}&${createQuery(options)}`);
  }

  unallocated(clas): Observable<any> {
    return this.http._get(`${this.api}/hostels/unallocated?class=${clas}`);
  }

  addStudents(hostel: number, students: number[]): Observable<any> {
    return this.http._post(`${this.api}/hostels/students`, { hostel, students });
  }
}
