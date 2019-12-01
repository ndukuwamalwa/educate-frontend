import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  api: string = `${API}/exams`;

  constructor(private http: Http) { }

  getExams(options = {}): Observable<any> {
    return this.http._get(`${this.api}?${createQuery(options)}`);
  }

  getExam(id): Observable<any> {
    return this.http._get(`${this.api}?id=${id}`);
  }

  getStudentResults(examId, studentId): Observable<any> {
    return this.http._get(`${this.api}/results?student=${studentId}&exam=${examId}`);
  }

  add(data): Observable<any> {
    return this.http._post(this.api, data);
  }

  getGrading(): Observable<any> {
    return this.http._get(`${this.api}/grades`);
  }

  updateExam(data): Observable<any> {
    return this.http._put(`${this.api}?id=${data.id}`, data);
  }

  addResults(results: any[]): Observable<any> {
    return this.http._post(`${this.api}/results?bulk=true`, results);
  }

  getEnteredMarks(exam, subject): Observable<any> {
    return this.http._get(`${this.api}/marks?exam=${exam}&subject=${subject}`);
  }

  getClassResults(clas, stream, examId): Observable<any> {
    return this.http._get(`${this.api}/results?class=${clas}&stream=${stream}&exam=${examId}`);
  }
}
