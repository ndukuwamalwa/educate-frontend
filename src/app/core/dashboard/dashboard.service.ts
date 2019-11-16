import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/constants';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  api: string = `${API}/dashboards`;

  constructor(private http: Http) { }
  getDashboard(url: string): Observable<any> {
    return this.http.get(this.api + url);
  }
}
