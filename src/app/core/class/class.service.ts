import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  api: string = `${API}/classes`;

  constructor(private http: Http) { }

  getClasses(options = {}): Observable<any> {
    return this.http._get(`${this.api}?${createQuery(options)}`);
  }

  getClass(id): Observable<any> {
    return this.http._get(`${this.api}?id=${id}`);
  }

  addStudent(data, bulk: boolean = false): Observable<any> {
    if (bulk) {
      return this.http._post(`${this.api}/students?bulk=true`, data);
    }
    return this.http._post(`${this.api}/students`, data);
  }

  getStudentClasses(student: string | number): Observable<any> {
    return this.http._get(`${this.api}/students?student=${student}`);
  }

  removeStudent(studentClassId: number | string): Observable<any> {
    return this.http._delete(`${this.api}/students?id=${studentClassId}`);
  }

  removeCharge(chargeId): Observable<any> {
    return this.http._delete(`${this.api}/students/charges?id=${chargeId}`);
  }

  getStudents(clas, options = {}): Observable<any> {
    return this.http._get(`${this.api}/students?class=${clas}&${createQuery(options)}`);
  }

  add(data, bulk: boolean = false): Observable<any> {
    if (bulk) return this.http._post(`${this.api}?bulk=true`, data);
    return this.http._post(this.api, data);
  }

  update(data): Observable<any> {
    return this.http._put(`${this.api}?id=${data.id}`, data);
  }

  addStudentByAdm(adm: string, clas): Observable<any> {
    return this.http._post(`${this.api}/students?byAdm=true`, { adm, clas });
  }

  addFromAnotherClass(oldClass, clas): Observable<any> {
    return this.http._post(`${this.api}/students?byClass=true`, { oldClass, clas });
  }

  getStreams(classId = null): Observable<any> {
    if (classId !== null) return this.http._get(`${this.api}/streams?class=${classId}`);
    return this.http._get(`${this.api}/streams`);
  }

  addStream(stream): Observable<any> {
    return this.http._post(`${this.api}/streams`, stream);
  }

  getStream(id): Observable<any> {
    return this.http._get(`${this.api}/streams?id=${id}`);
  }

  getStreamStudents(id): Observable<any> {
    return this.http._get(`${this.api}/streams/students?id=${id}`);
  }

  updateStream(data): Observable<any> {
    return this.http._put(`${this.api}/streams?id=${data.id}`, data);
  }

  addStreamStudents(students: any[]): Observable<any> {
    return this.http._post(`${this.api}/streams/students?bulk=true`, students);
  }

  getUnstreamed(classId): Observable<any> {
    return this.http._get(`${this.api}/streams/unstreamed?class=${classId}`);
  }

  removeStreamStudent(id): Observable<any> {
    return this.http._delete(`${this.api}/streams/students?id=${id}`);
  }

  promote(): Observable<any> {
    return this.http._post(`${this.api}/promote`, {});
  }
}
