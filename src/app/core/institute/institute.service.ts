import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstituteService {
  api: string = `${API}/institute`;

  constructor(private http: HttpClient) { }

  getStudentHostels(studentId): Observable<any> {
    return this.http.get(`${this.api}/hostel/students?student=${studentId}`);
  }

  getAcademicYears(): Observable<any> {
    return this.http.get(`${this.api}/academic-years`);
  }

  addYear(data): Observable<any> {
    return this.http.post(`${this.api}/academic-years`, data);
  }

  deleteAcademicYear(id): Observable<any> {
    return this.http.delete(`${this.api}/academic-years?id=${id}`);
  }

  addHostel(data): Observable<any> {
    return this.http.post(`${this.api}/hostels`, data);
  }

  getHostels(): Observable<any> {
    return this.http.get(`${this.api}/hostels`);
  }

  deleteHostel(id) {
    return this.http.delete(`${this.api}/hostels?id=${id}`);
  }

  getStudentsNotInHostel(hostel, academicYear, batch): Observable<any> {
    return this.http.get(`${this.api}/hostel/students/not-in?hostel=${hostel}&batch=${batch}&year=${academicYear}`);
  }

  addStudentsToHostel(items): Observable<any> {
    return this.http.post(`${this.api}/hostel/students?bulk=true`, items);
  }

  getHostelStudents(hostel, academicYear): Observable<any> {
    return this.http.get(`${this.api}/hostel/students?hostel=${hostel}&academicYear=${academicYear}`);
  }

  deleteStudent(studentHostelId: string): Observable<any> {
    return this.http.delete(`${this.api}/hostel/students?id=${studentHostelId}`); 
  }
}
