import { Injectable } from '@angular/core';
import { Http } from 'src/app/http/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  api: string = `${environment.apiUrl}/api`;
  fetchStats: Observable<any>;

  constructor(private http: Http) { }

  stats(): Observable<any> {
    if (!this.fetchStats) {
      this.fetchStats = this.http._get(`${this.api}/stats`).pipe(publishReplay(1), refCount());
    }
    return this.fetchStats;
  }
}
