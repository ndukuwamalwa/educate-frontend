import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  api: string = `${API}/attendance`;

  constructor(private http: HttpClient) { }

  send(studentIds: string[]): Observable<any> {
    return this.http.post(`${this.api}?bulk=true`, studentIds);
  }

  getRegister(batch, date): Observable<any> {
    return this.http.get(`${this.api}?batch=${batch}&date=${date}`);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.api}?id=${id}`);
  }
}
