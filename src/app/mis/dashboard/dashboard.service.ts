import { Injectable } from '@angular/core';
import { Http } from 'src/app/http/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CacheService } from 'src/app/cache-service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  api: string = `${environment.apiUrl}/api`;
  fetchStats: Observable<any>;

  constructor(private http: Http, private cacheService: CacheService) { }

  stats(): Observable<any> {
    return this.cacheService.cache(`${this.api}/stats`);
  }
}
