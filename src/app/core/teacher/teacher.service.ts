import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  api: string = `${API}/teachers`;

  constructor(private http: Http) { }

  getTeachers(options): Observable<any> {
    return this.http._get(`${this.api}?${createQuery(options)}`);
  }

  add(employee): Observable<any> {
    return this.http._post(this.api, { employee });
  }

  getTeacher(id): Observable<any> {
    return this.http._get(`${this.api}?id=${id}`);
  }

  addRole(form): Observable<any> {
    return this.http._post(`${this.api}/roles`, form);
  }

  getTeacherRoles(teacherId): Observable<any> {
    return this.http._get(`${this.api}/roles?teacher=${teacherId}`);
  }

  removeRole(id): Observable<any> {
    return this.http._delete(`${this.api}/roles?id=${id}`);
  }
}
