import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Http } from 'src/app/http/http';
import { Observable } from 'rxjs';
import { createQuery } from 'src/app/utilities';
import { CacheService } from 'src/app/cache-service';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  api: string = `${environment.apiUrl}/api`;

  constructor(private http: Http, private cacheService: CacheService) { }

  send(message: string, recipients: string[]): Observable<any> {
    this.cacheService.clear(`${this.api}/sms`);
    return this.http._post(`${this.api}/sms`, { message, recipients });
  }

  messages(options: any): Observable<any> {
    return this.cacheService.cache(`${this.api}/sms?${createQuery(options)}`);
  }
}
