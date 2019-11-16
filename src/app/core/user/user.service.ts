import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { createQuery } from 'src/app/utilities';
import { Http } from 'src/app/http/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = `${API}/users`;

  constructor(private http: Http) { }

  addUser(user: User): Observable<any> {
    return this.http._post(this.api, user);
  }

  getUsers(options): Observable<any> {
    return this.http._get(`${this.api}?${createQuery(options)}`);
  }

  getUser(id): Observable<any> {
    return this.http._get(`${this.api}?id=${id}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http._put(`${this.api}?id=${user.id}`, user);
  }

  changePassword(data): Observable<any> {
    return this.http._post(`${this.api}/password`, data);
  }
}
