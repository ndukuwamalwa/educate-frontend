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

  add(student: Student | Student[], bulk: boolean = false): Observable<any> {
    if (bulk) {
      return this.http._post(`${this.api}/students?bulk=true`, student);
    } else {
      return this.http._post(`${this.api}/students`, student);
    }
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

  archive(id, reason: string): Observable<any> {
    return this.http._post(`${this.api}/students/archive`, { student: id, reason });
  }

  restore(id): Observable<any> {
    return this.http._get(`${this.api}/students/restore?id=${id}`);
  }

  expell(id, reason: string): Observable<any> {
    return this.http._post(`${this.api}/students/expell`, { student: id, reason });
  }

  grantLeave(data): Observable<any> {
    return this.http._post(`${this.api}/students/leaves`, data);
  }

  getLeaves(id): Observable<any> {
    return this.http._get(`${this.api}/students/leaves?id=${id}`);
  }

  deleteLeave(id): Observable<any> {
    return this.http._delete(`${this.api}/students/leaves?id=${id}`);
  }

  suspend(data): Observable<any> {
    return this.http._post(`${this.api}/students/suspensions`, data);
  }

  getSuspensions(id): Observable<any> {
    return this.http._get(`${this.api}/students/suspensions?id=${id}`);
  }

  deleteSuspension(id): Observable<any> {
    return this.http._delete(`${this.api}/students/leaves?id=${id}`);
  }

  getMisplaced(options): Observable<any> {
    return this.http._get(`${this.api}/students/misplaced?${createQuery(options)}`);
  }

  deleteContact(id): Observable<any> {
    return this.http._delete(`${this.api}/students/contacts?id=${id}`);
  }

  getPreviewByAdms(adms: string[]): Observable<any> {
    return this.http._post(`${this.api}/students/previews`, adms);
  }
}
