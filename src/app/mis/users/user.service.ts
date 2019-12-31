import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Http } from 'src/app/http/http';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = `${environment.apiUrl}/api`;

  constructor(private http: Http) { }

  add(user: User): Observable<any> {
    return this.http._post(`${this.api}/users`, user);
  }

  update(user: User, id): Observable<any> {
    return this.http._put(`${this.api}/users?id=${id}`, user);
  }

  delete(id): Observable<any> {
    return this.http._delete(`${this.api}/users?id=${id}`);
  }

  list(options): Observable<any> {
    return this.http._get(`${this.api}/users?${createQuery(options)}`);
  }

  view(id): Observable<any> {
    return this.http._get(`${this.api}/users?id=${id}`);
  }

  addGroup(group): Observable<any> {
    return this.http._post(`${this.api}/users/groups`, group);
  }

  updateGroup(group, id): Observable<any> {
    return this.http._put(`${this.api}/users/groups?id=${id}`, group);
  }

  deleteGroup(id): Observable<any> {
    return this.http._delete(`${this.api}/users/groups?id=${id}`);
  }

  listGroups(): Observable<any> {
    return this.http._get(`${this.api}/users/groups`);
  }

  getTables(): Observable<any> {
    return this.http._get(`${this.api}/users/tables`);
  }

  groupUsers(id): Observable<any> {
    return this.http._get(`${this.api}/group/users?id=${id}`);
  }
}
