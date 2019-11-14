import { Injectable } from '@angular/core';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { createQuery } from 'src/app/utilities';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api: string = `${API}/users`;

  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<any> {
    return this.http.post(this.api, user);
  }

  getUsers(options): Observable<any> {
    return this.http.get(`${this.api}?${createQuery(options)}`);
  }

  getUser(id): Observable<any> {
    return this.http.get(`${this.api}?id=${id}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.api}?id=${user.id}`, user);
  }

  changePassword(data): Observable<any> {
    return this.http.post(`${this.api}/password`, data);
  }
}
