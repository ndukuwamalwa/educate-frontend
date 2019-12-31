import { Injectable } from '@angular/core';
import { Http } from 'src/app/http/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { Exam } from 'src/app/models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  api = `${environment.apiUrl}/api`;

  constructor(private http: Http) { }

  add(data: Exam): Observable<any> {
    return this.http._post(`${this.api}/exams`, data);
  }

  getExams(options): Observable<any> {
    return this.http._get(`${this.api}/exams?${createQuery(options)}`);
  }

  delete(id): Observable<any> {
    return this.http._delete(`${this.api}/exams?id=${id}`);
  }

  update(data: Exam, id): Observable<any> {
    return this.http._put(`${this.api}/exams?id=${id}`, data);
  }

  loadEditableResults(examId: number, subjectId: number, streamId: number): Observable<any> {
    return this.http._get(`${this.api}/exams/results/edit?exam=${examId}&subject=${subjectId}&stream=${streamId}`);
  }

  saveMarks(marks): Observable<any> {
    return this.http._post(`${this.api}/exams/results`, marks);
  }

  marklist(exam: number, clas: number, stream: number): Observable<any> {
    return this.http._get(`${this.api}/exams/results?exam=${exam}&class=${clas}&stream=${stream}`);
  }
}
