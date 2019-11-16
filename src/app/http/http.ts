import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Http extends HttpClient {

    _get(url: string): Observable<any> {
        return this.get(url, { headers: this.headers() });
    }

    _post(url: string, data) {
        return this.post(url, data, { headers: this.headers() });
    }

    _put(url: string, data) {
        return this.put(url, data, { headers: this.headers() });
    }

    _delete(url: string) {
        return this.delete(url, { headers: this.headers() });
    }

    headers(): HttpHeaders {
        let headers = new HttpHeaders();
        //HttpHeaders is immutable, appending to the created object won't set the header. 
        headers = headers.append('Authorization', `Bearer ${window.sessionStorage.getItem('token')}`);
        return headers;
    }
}
