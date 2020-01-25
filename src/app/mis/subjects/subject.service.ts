import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Http } from 'src/app/http/http';
import { Subject } from 'src/app/models/subject.model';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  api: string = `${environment.apiUrl}/api`;
  fetchSubjects: Observable<any>;

  constructor(private http: Http) { }

  add(subject: Subject): Observable<any> {
    return this.http._post(`${this.api}/subjects`, subject);
  }

  update(subject: Subject, id): Observable<any> {
    return this.http._put(`${this.api}/subjects?id=${id}`, subject);
  }

  subjects(): Observable<any> {
    if (!this.fetchSubjects) {
      this.fetchSubjects = this.http._get(`${this.api}/subjects`).pipe(publishReplay(1), refCount());
    }
    return this.fetchSubjects;
  }

  delete(id): Observable<any> {
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

  lessoning(): Observable<any> {
    return this.http._get(`${this.api}/subjects/lessoning`);
  }

  saveLessoning(pack: { subject: number, lessons: number, doubles: number, daytime: string }[]): Observable<any> {
    return this.http._post(`${this.api}/subjects/lessoning`, pack);
  }
}
