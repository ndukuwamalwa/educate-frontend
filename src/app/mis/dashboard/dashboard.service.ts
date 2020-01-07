import { Injectable } from '@angular/core';
import { Http } from 'src/app/http/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  api: string = `${environment.apiUrl}/api`;

  constructor(private http: Http) { }

  stats(): Observable<any> {
    return this.http._get(`${this.api}/stats`);
  }
}
