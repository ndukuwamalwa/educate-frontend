import { Observable } from 'rxjs';
import { Http } from './http/http';
import { Injectable } from '@angular/core';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable()
export class CacheService {
    private cached: any = {};

    constructor(private http: Http) {}

    cache(url: string): Observable<any> {
        if (!this.cached[url.toLowerCase()]) {
            this.cached[url.toLowerCase()] = this.http._get(url).pipe(publishReplay(1), refCount());
        }
        return this.cached[url.toLowerCase()];
    }

    clear(baseUrl: string) {
        for (let key of Object.keys(this.cached)) {
            if (key.startsWith(baseUrl.toLowerCase())) {
                delete this.cached[key];
            }
        }
    }
}
