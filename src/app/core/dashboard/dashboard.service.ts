import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  api: string = `${API}/dashboards`;

  constructor(private http: HttpClient) { }
  getDashboard(url: string): Observable<any> {
    return this.http.get(this.api + url);
  }
}
