import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Http } from 'src/app/http/http';
import { createQuery } from 'src/app/utilities';
import { CacheService } from 'src/app/cache-service';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  api: string = `${environment.apiUrl}`;

  constructor(private http: Http, private cacheService: CacheService) { }

  addTerm(term): Observable<any> {
    this.cacheService.clear(`${this.api}/api/terms`);
    return this.http._post(`${this.api}/api/terms`, term);
  }

  updateTerm(term, id): Observable<any> {
    this.cacheService.clear(`${this.api}/api/terms`);
    return this.http._put(`${this.api}/api/terms?id=${id}`, term);
  }

  deleteTerm(id): Observable<any> {
    this.cacheService.clear(`${this.api}/api/terms`);
    return this.http._delete(`${this.api}/api/terms?id=${id}`);
  }

  terms(options = {}): Observable<any> {
    return this.cacheService.cache(`${this.api}/api/terms?${createQuery(options)}`);
  }
}
