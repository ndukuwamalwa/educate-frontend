import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  api: string = `${API}/subjects`;

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<any> {
    return this.http.get(this.api);
  }

  registerBulk(items): Observable<any> {
    return this.http.post(`${this.api}/register?bulk=true`, items);
  }

  getStudentSubjects(batchId, studentId): Observable<any> {
    return this.http.get(`${this.api}/register?batch=${batchId}&student=${studentId}`);
  }

  deregister(regId): Observable<any> {
    return this.http.delete(`${this.api}/register?id=${regId}`);
  }

  add(name): Observable<any> {
    return this.http.post(this.api, { name });
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.api}?id=${id}`);
  }
}
