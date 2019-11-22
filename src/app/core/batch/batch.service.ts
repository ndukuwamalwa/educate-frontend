import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  api: string = `${API}/batches`;

  constructor(private http: Http) { }

  getBatches(options = {}): Observable<any> {
    return this.http._get(`${this.api}?${createQuery(options)}`);
  }

  getBatch(id): Observable<any> {
    return this.http._get(`${this.api}?id=${id}`);
  }

  addStudent(data, bulk: boolean = false): Observable<any> {
    if (bulk) {
      return this.http._post(`${this.api}/students?bulk=true`, data);
    }
    return this.http._post(`${this.api}/students`, data);
  }

  getStudentBatches(student: string | number): Observable<any> {
    return this.http._get(`${this.api}/students?student=${student}`);
  }

  removeStudent(studentBatchId: number | string): Observable<any> {
    return this.http._delete(`${this.api}/students?id=${studentBatchId}`);
  }

  getStudents(batch): Observable<any> {
    return this.http._get(`${this.api}/students?batch=${batch}`);
  }

  add(data): Observable<any> {
    return this.http._post(this.api, data);
  }

  update(data): Observable<any> {
    return this.http._put(`${this.api}?id=${data.id}`, data);
  }

  addStudentByAdm(adm: string, batch): Observable<any> {
    return this.http._post(`${this.api}/students?byAdm=true`, { adm, batch });
  }

  addFromAnotherBatch(oldBatch, batch): Observable<any> {
    return this.http._post(`${this.api}/students?byBatch=true`, { oldBatch, batch });
  }
}
