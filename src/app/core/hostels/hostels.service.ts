import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class HostelsService {
  api: string = `${API}/institute`;

  constructor(private http: Http) { }

  getStudentHostels(studentId): Observable<any> {
    return this.http._get(`${this.api}/hostel/students?student=${studentId}`);
  }

  addHostel(data): Observable<any> {
    return this.http._post(`${this.api}/hostels`, data);
  }

  getHostels(): Observable<any> {
    return this.http._get(`${this.api}/hostels`);
  }

  deleteHostel(id) {
    return this.http._delete(`${this.api}/hostels?id=${id}`);
  }

  getStudentsNotInHostel(hostel, stream): Observable<any> {
    return this.http._get(`${this.api}/hostel/students/not-in?hostel=${hostel}&stream=${stream}`);
  }

  addStudentsToHostel(items): Observable<any> {
    return this.http._post(`${this.api}/hostel/students?bulk=true`, items);
  }

  getHostelStudents(hostel): Observable<any> {
    return this.http._get(`${this.api}/hostel/students?hostel=${hostel}`);
  }

  deleteStudent(studentHostelId: string): Observable<any> {
    return this.http._delete(`${this.api}/hostel/students?id=${studentHostelId}`); 
  }
}
