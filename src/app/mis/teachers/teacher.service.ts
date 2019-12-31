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
}
