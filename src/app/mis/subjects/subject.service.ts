import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Http } from 'src/app/http/http';
import { Subject } from 'src/app/models/subject.model';
import { Observable } from 'rxjs';
import { CacheService } from 'src/app/cache-service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  api: string = `${environment.apiUrl}/api`;

  constructor(private http: Http, private cacheService: CacheService) { }

  add(subject: Subject): Observable<any> {
    this.cacheService.clear(`${this.api}/subjects`);
    return this.http._post(`${this.api}/subjects`, subject);
  }

  update(subject: Subject, id): Observable<any> {
    this.cacheService.clear(`${this.api}/subjects`);
    return this.http._put(`${this.api}/subjects?id=${id}`, subject);
  }

  subjects(): Observable<any> {
    return this.cacheService.cache(`${this.api}/subjects`);
  }

  delete(id): Observable<any> {
    this.cacheService.clear(`${this.api}/subjects`);
    return this.http._delete(`${this.api}/subjects?id=${id}`);
  }

  nonregistered(subject: number, stream: number): Observable<any> {
    return this.http._get(`${this.api}/subjects/nonregistered?subject=${subject}&stream=${stream}`);
  }

  register(pkg: any[]): Observable<any> {
    return this.http._post(`${this.api}/subjects/register`, pkg);
  }

  viewRegister(subject, stream): Observable<any> {
    return this.http._get(`${this.api}/subjects/register?subject=${subject}&stream=${stream}`);
  }

  deregister(id): Observable<any> {
    return this.http._delete(`${this.api}/subjects/register?id=${id}`);
  }
  
}
