import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Student } from 'src/app/models/student.model';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  api: string = API;

  constructor(private http: Http) { }

  add(student: Student): Observable<any> {
    return this.http._post(`${this.api}/students`, student);
  }

  getStudent(id): Observable<any> {
    return this.http._get(`${this.api}/students?id=${id}`);
  }

  getStudents(options): Observable<any> {
    return this.http._get(`${this.api}/students?${createQuery(options)}`);
  }

  update(data: Student): Observable<any> {
    return this.http._put(`${this.api}/students?id=${data.id}`, data);
  }

  addContact(contact): Observable<any> {
    return this.http._post(`${this.api}/students/contacts`, contact);
  }

  getContacts(id): Observable<any> {
    return this.http._get(`${this.api}/students/contacts?student=${id}`);
  }

  getAttendance(id, startDate, endDate): Observable<any> {
    return this.http._get(`${this.api}/attendance?student=${id}&startDate=${startDate}&endDate=${endDate}`);
  }

  delete(id): Observable<any> {
    return this.http._delete(`${this.api}/students?id=${id}`);
  }
}
