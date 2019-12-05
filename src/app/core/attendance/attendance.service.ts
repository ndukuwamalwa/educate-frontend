import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  api: string = `${API}/attendance`;

  constructor(private http: Http) { }

  send(studentIds: string[]): Observable<any> {
    return this.http._post(`${this.api}?bulk=true`, studentIds);
  }

  getRegister(stream, date): Observable<any> {
    return this.http._get(`${this.api}?stream=${stream}&date=${date}`);
  }

  delete(id): Observable<any> {
    return this.http._delete(`${this.api}?id=${id}`);
  }

  getUnmarked(stream): Observable<any> {
    return this.http._get(`${this.api}/unmarked?stream=${stream}`);
  }
}
