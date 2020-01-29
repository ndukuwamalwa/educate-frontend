import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';
import { environment } from 'src/environments/environment';
import { CacheService } from 'src/app/cache-service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  api = `${environment.apiUrl}/api`;

  constructor(private http: Http, private cacheService: CacheService) { }

  loadStream(id: number): Observable<any> {
    return this.cacheService.cache(`${this.api}/attendance/umarked?category=stream&id=${id}`);
  }

  loadClass(id: number): Observable<any> {
    return this.cacheService.cache(`${this.api}/attendance/umarked?category=class&id=${id}`);
  }

  mark(clas, students: number[]): Observable<any> {
    this.cacheService.clear(`${this.api}/attendance`);
    return this.http._post(`${this.api}/attendance?class=${clas}`, students);
  }

  getStreamAttendance(stream, date): Observable<any> {
    return this.cacheService.cache(`${this.api}/attendance/stream?stream=${stream}&date=${date}`);
  }

  getClassAttendance(clas, date): Observable<any> {
    return this.cacheService.cache(`${this.api}/attendance/class?class=${clas}&date=${date}`);
  }

  getStudentAttendance(adm, startDate, endDate): Observable<any> {
    return this.cacheService.cache(`${this.api}/attendance/student?adm=${adm}&startDate=${startDate}&endDate=${endDate}`);
  }

  delete(id): Observable<any> {
    this.cacheService.clear(`${this.api}/attendance`);
    return this.http._delete(`${this.api}/attendance?id=${id}`);
  }
}
