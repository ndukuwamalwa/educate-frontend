import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Class } from 'src/app/models/class.model';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';
import { Stream } from 'src/app/models/stream.model';
import { createQuery } from 'src/app/utilities';
import { CacheService } from 'src/app/cache-service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  api: string = `${environment.apiUrl}/api`;
  constructor(private http: Http, private cacheService: CacheService) { }

  addClass(clas: Class): Observable<any> {
    this.cacheService.clear(`${this.api}/class`);
    return this.http._post(`${this.api}/class`, clas);
  }

  deleteClass(id): Observable<any> {
    this.cacheService.clear(`${this.api}/class`);
    return this.http._delete(`${this.api}/class?id=${id}`);
  }

  classes(): Observable<any> {
    return this.cacheService.cache(`${this.api}/class`);
  }

  updateClass(clas: Class, id): Observable<any> {
    this.cacheService.clear(`${this.api}/class`);
    return this.http._put(`${this.api}/class?id=${id}`, clas);
  }

  addStream(stream: Stream): Observable<any> {
    this.cacheService.clear(`${this.api}/streams`);
    return this.http._post(`${this.api}/streams`, stream);
  }

  streams(): Observable<any> {
    return this.cacheService.cache(`${this.api}/streams`);
  }

  deleteStream(id): Observable<any> {
    this.cacheService.clear(`${this.api}/streams`);
    return this.http._delete(`${this.api}/streams?id=${id}`);
  }

  updateStream(stream: Stream, id): Observable<any> {
    this.cacheService.clear(`${this.api}/streams`);
    return this.http._put(`${this.api}/streams?id=${id}`, stream);
  }

  unclassed(options): Observable<any> {
    return this.http._get(`${this.api}/unclassed?${createQuery(options)}`);
  }

  addStudents(stream: number, students: number[]): Observable<any> {
    this.cacheService.clear(`${this.api}/streams/students`);
    this.cacheService.clear(`${this.api}/class/students`);
    return this.http._post(`${this.api}/streams/students`, { stream, students });
  }

  getStreamStudents(id: number, options = {}): Observable<any> {
    return this.cacheService.cache(`${this.api}/streams/students?id=${id}&${createQuery(options)}`);
  }

  removeStreamStudent(id): Observable<any> {
    this.cacheService.clear(`${this.api}/streams/students`);
    this.cacheService.clear(`${this.api}/class/students`);
    return this.http._delete(`${this.api}/streams/students?id=${id}`);
  }

  getClassStudents(id: number, options = {}): Observable<any> {
    return this.cacheService.cache(`${this.api}/class/students?id=${id}&${createQuery(options)}`);
  }

}
