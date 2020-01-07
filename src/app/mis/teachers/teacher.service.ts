import { Injectable } from '@angular/core';
import { Http } from 'src/app/http/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  api = `${environment.apiUrl}/api`;

  constructor(private http: Http) { }

  nonTeachers(options): Observable<any> {
    return this.http._get(`${this.api}/non-teachers?${createQuery(options)}`);
  }

  add(teachers): Observable<any> {
    return this.http._post(`${this.api}/teachers`, teachers);
  }

  active(options): Observable<any> {
    return this.http._get(`${this.api}/teachers?type=active&${createQuery(options)}`);
  }

  transfered(options): Observable<any> {
    return this.http._get(`${this.api}/teachers?type=transfered&${createQuery(options)}`);
  }

  retired(options): Observable<any> {
    return this.http._get(`${this.api}/teachers?type=retired&${createQuery(options)}`);
  }

  allActive(): Observable<any> {
    return this.http._get(`${this.api}/teachers/all`);
  }

  saveClassTeachers(data: { teacher: number, stream: number, role: string, year: number }[]): Observable<any> {
    return this.http._post(`${this.api}/teachers/classes`, data);
  }

  getClassTeachers(year: number): Observable<any> {
    return this.http._get(`${this.api}/teachers/classes?year=${year}`);
  }

  saveSubjectAssignment(data: {teacher: number,stream: number,subject: number,year: number}[]): Observable<any> {
    return this.http._post(`${this.api}/teachers/subjects`, data);
  }

  getSubjectAssignments(clas: number, year: number): Observable<any> {
    return this.http._get(`${this.api}/teachers/subjects?class=${clas}&year=${year}`);
  }
}
