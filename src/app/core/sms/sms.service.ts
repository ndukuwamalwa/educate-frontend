import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  api: string = `${API}/sms`;

  constructor(private http: Http) { }
  sendCustom(message: string, recipients: string[]): Observable<any> {
    return this.http._post(`${this.api}/custom`, { message, recipients })
  }
  sendToTeachers(message: string): Observable<any> {
    return this.http._post(`${this.api}/teachers`, { message })
  }
  sendToEmployees(message: string): Observable<any> {
    return this.http._post(`${this.api}/employees`, { message })
  }
  sendToParents(message, group): Observable<any> {
    return this.http._post(`${this.api}/parents`, { message, group })
  }
  sendToStudents(message, group): Observable<any> {
    return this.http._post(`${this.api}/students`, { message, group })
  }
  getPrevious(options): Observable<any> {
    return this.http._get(`${this.api}?${createQuery(options)}`);
  }
}
