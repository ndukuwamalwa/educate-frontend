import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  api: string = `${API}/batches`;

  constructor(private http: HttpClient) { }

  getBatches(options = {}): Observable<any> {
    return this.http.get(`${this.api}?${createQuery(options)}`);
  }

  getBatch(id): Observable<any> {
    return this.http.get(`${this.api}?id=${id}`);
  }

  addStudent(data): Observable<any> {
    return this.http.post(`${this.api}/students`, data);
  }

  getStudentBatches(student: string | number): Observable<any> {
    return this.http.get(`${this.api}/students?student=${student}`);
  }

  removeStudent(studentBatchId: number | string): Observable<any> {
    return this.http.delete(`${this.api}/students?id=${studentBatchId}`);
  }

  getStudents(batch): Observable<any> {
    return this.http.get(`${this.api}/students?batch=${batch}`);
  }

  add(data): Observable<any> {
    return this.http.post(this.api, data);
  }

  update(data): Observable<any> {
    return this.http.put(`${this.api}?id=${data.id}`, data);
  }

  addStudentByAdm(adm: string, batch): Observable<any> {
    return this.http.post(`${this.api}/students?byAdm=true`, { adm, batch });
  }

  addFromAnotherBatch(oldBatch, batch): Observable<any> {
    return this.http.post(`${this.api}/students?byBatch=true`, { oldBatch, batch });
  }
}
