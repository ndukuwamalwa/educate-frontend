import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  api: string = `${API}/teachers`;

  constructor(private http: HttpClient) { }

  getTeachers(options): Observable<any> {
    return this.http.get(`${this.api}?${createQuery(options)}`);
  }

  add(employee): Observable<any> {
    return this.http.post(this.api, { employee });
  }

  getTeacher(id): Observable<any> {
    return this.http.get(`${this.api}?id=${id}`);
  }

  addRole(form): Observable<any> {
    return this.http.post(`${this.api}/roles`, form);
  }

  getTeacherRoles(teacherId): Observable<any> {
    return this.http.get(`${this.api}/roles?teacher=${teacherId}`);
  }

  removeRole(id): Observable<any> {
    return this.http.delete(`${this.api}/roles?id=${id}`);
  }
}
