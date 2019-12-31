import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Http } from 'src/app/http/http';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  api: string = `${environment.apiUrl}`;

  constructor(private http: Http) { }

  addTerm(term): Observable<any> {
    return this.http._post(`${this.api}/api/terms`, term);
  }

  updateTerm(term, id): Observable<any> {
    return this.http._put(`${this.api}/api/terms?id=${id}`, term);
  }

  deleteTerm(id): Observable<any> {
    return this.http._delete(`${this.api}/api/terms?id=${id}`);
  }

  terms(options = {}): Observable<any> {
    return this.http._get(`${this.api}/api/terms?${createQuery(options)}`);
  }
}
