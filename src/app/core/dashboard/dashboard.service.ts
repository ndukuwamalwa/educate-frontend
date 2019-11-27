import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/constants';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  api: string = `${API}/statistics`;

  constructor(private http: Http) { }
  getStatistics(): Observable<any> {
    return this.http._get(this.api);
  }
}
