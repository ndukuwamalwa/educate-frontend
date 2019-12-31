import { Injectable } from '@angular/core';
import { Http } from 'src/app/http/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  api = `${environment.apiUrl}/api`;

  constructor(private http: Http) { }

  streamBalance(id: number, options): Observable<any> {
    return this.http._get(`${this.api}/fees/stream?id=${id}&${createQuery(options)}`);
  }

  classBalance(id: number, options): Observable<any> {
    return this.http._get(`${this.api}/fees/class?id=${id}&${createQuery(options)}`);
  }

  studentBalance(adm): Observable<any> {
    return this.http._get(`${this.api}/fees/student?adm=${adm}`);
  }
}
