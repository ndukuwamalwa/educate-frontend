import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {
  api: string = `${API}/institute`;

  constructor(private http: Http) { }

  getStudentHostels(studentId): Observable<any> {
    return this.http._get(`${this.api}/hostel/students?student=${studentId}`);
  }

  getAcademicYears(): Observable<any> {
    return this.http._get(`${this.api}/academic-years`);
  }

  addYear(data): Observable<any> {
    return this.http._post(`${this.api}/academic-years`, data);
  }

  deleteAcademicYear(id): Observable<any> {
    return this.http._delete(`${this.api}/academic-years?id=${id}`);
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

  getStudentsNotInHostel(hostel, academicYear, batch): Observable<any> {
    return this.http._get(`${this.api}/hostel/students/not-in?hostel=${hostel}&batch=${batch}&year=${academicYear}`);
  }

  addStudentsToHostel(items): Observable<any> {
    return this.http._post(`${this.api}/hostel/students?bulk=true`, items);
  }

  getHostelStudents(hostel, academicYear): Observable<any> {
    return this.http._get(`${this.api}/hostel/students?hostel=${hostel}&academicYear=${academicYear}`);
  }

  deleteStudent(studentHostelId: string): Observable<any> {
    return this.http._delete(`${this.api}/hostel/students?id=${studentHostelId}`); 
  }
}
