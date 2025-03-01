import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';
import { createQuery } from 'src/app/utilities';
import { CacheService } from 'src/app/cache-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = `${environment.apiUrl}/api`;

  constructor(private http: Http, private cacheService: CacheService) { }

  add(user: User): Observable<any> {
    this.cacheService.clear(`${this.api}/users`);
    return this.http._post(`${this.api}/users`, user);
  }

  update(user: User, id): Observable<any> {
    this.cacheService.clear(`${this.api}/users`);
    return this.http._put(`${this.api}/users?id=${id}`, user);
  }

  delete(id): Observable<any> {
    this.cacheService.clear(`${this.api}/users`);
    return this.http._delete(`${this.api}/users?id=${id}`);
  }

  list(options): Observable<any> {
    return this.cacheService.cache(`${this.api}/users?${createQuery(options)}`);
  }

  view(id): Observable<any> {
    return this.cacheService.cache(`${this.api}/users?id=${id}`);
  }
}
