import { Injectable } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Http } from 'src/app/http/http';
import { createQuery } from 'src/app/utilities';
import { CacheService } from 'src/app/cache-service';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  api = `${environment.apiUrl}/api`;

  constructor(private http: Http, private cacheService: CacheService) { }

  add(student: Student | Student[]): Observable<any> {
    this.cacheService.clear(`${this.api}/students`);
    return this.http._post(`${this.api}/students`, student);
  }

  active(options): Observable<any> {
    return this.cacheService.cache(`${this.api}/students?type=active&${createQuery(options)}`);
  }

  archived(options): Observable<any> {
    return this.cacheService.cache(`${this.api}/students?type=archived&${createQuery(options)}`);
  }

  expelled(options): Observable<any> {
    return this.cacheService.cache(`${this.api}/students?type=expelled&${createQuery(options)}`);
  }

  suspended(options): Observable<any> {
    return this.cacheService.cache(`${this.api}/students/suspensions?${createQuery(options)}`);
  }

  leave(options): Observable<any> {
    return this.cacheService.cache(`${this.api}/students/leave?${createQuery(options)}`);
  }

  archive(data): Observable<any> {
    this.cacheService.clear(`${this.api}/students`);
    return this.http._post(`${this.api}/students/archive`, data);
  }

  sentOnLeave(leave): Observable<any> {
    this.cacheService.clear(`${this.api}/students`);
    return this.http._post(`${this.api}/students/leave`, leave);
  }

  suspend(suspension): Observable<any> {
    this.cacheService.clear(`${this.api}/students`);
    return this.http._post(`${this.api}/students/suspensions`, suspension);
  }

  expell(expulsion): Observable<any> {
    this.cacheService.clear(`${this.api}/students`);
    return this.http._post(`${this.api}/students/expell`, expulsion);
  }

  delete(ids: number[]): Observable<any> {
    this.cacheService.clear(`${this.api}/students`);
    return this.http._delete(`${this.api}/students?id=${ids.join(',')}`);
  }

  restore(ids: number[]): Observable<any> {
    this.cacheService.clear(`${this.api}/students`);
    return this.http._post(`${this.api}/students/activate`, ids);
  }

  viewByAdm(adm): Observable<any> {
    return this.cacheService.cache(`${this.api}/students?adm=${adm}&verbose=true`);
  }

  update(data, id): Observable<any> {
    this.cacheService.clear(`${this.api}/students`);
    return this.http._put(`${this.api}/students?id=${id}`, data);
  }

  check(adm: string): Observable<any> {
    return this.http._get(`${this.api}/students/check?adm=${adm}`);
  }
}
