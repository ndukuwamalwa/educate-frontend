import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  api: string = `${API}/exams`;

  constructor(private http: HttpClient) { }

  getExams(options = {}): Observable<any> {
    return this.http.get(`${this.api}?${createQuery(options)}`);
  }

  getExam(id): Observable<any> {
    return this.http.get(`${this.api}?id=${id}`);
  }

  getStudentResults(examId, studentId): Observable<any> {
    return this.http.get(`${this.api}/results?student=${studentId}&exam=${examId}`);
  }

  add(data): Observable<any> {
    return this.http.post(this.api, data);
  }

  getGrading(): Observable<any> {
    return this.http.get(`${this.api}/grades`);
  }

  updateExam(data): Observable<any> {
    return this.http.put(`${this.api}?id=${data.id}`, data);
  }

  addResults(results: any[]): Observable<any> {
    return this.http.post(`${this.api}/results?bulk=true`, results);
  }

  getEnteredMarks(exam, subject): Observable<any> {
    return this.http.get(`${this.api}/marks?exam=${exam}&subject=${subject}`);
  }

  getBatchResults(batch, examId): Observable<any> {
    return this.http.get(`${this.api}/results?batch=${batch}&exam=${examId}`);
  }
}
