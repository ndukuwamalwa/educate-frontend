import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  api: string = `${API}/subjects`;

  constructor(private http: Http) { }

  getSubjects(): Observable<any> {
    return this.http._get(this.api);
  }

  registerBulk(items): Observable<any> {
    return this.http._post(`${this.api}/register?bulk=true`, items);
  }

  getStudentSubjects(batchId, studentId): Observable<any> {
    return this.http._get(`${this.api}/register?batch=${batchId}&student=${studentId}`);
  }

  deregister(regId): Observable<any> {
    return this.http._delete(`${this.api}/register?id=${regId}`);
  }

  add(name): Observable<any> {
    return this.http._post(this.api, { name });
  }

  delete(id): Observable<any> {
    return this.http._delete(`${this.api}?id=${id}`);
  }

  getRegisteredStudents(subject, batch): Observable<any> {
    return this.http._get(`${this.api}/register?subject=${subject}&batch=${batch}`);
  }

  getNotRegistered(subject, batch): Observable<any> {
    return this.http._get(`${this.api}/unregistered?subject=${subject}&batch=${batch}`);
  }
}
