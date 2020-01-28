import { PRINT } from './constants';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/user.model';

export function createQuery(options = {}): string {
    const keys = Object.keys(options);
    let query: string[] = [];
    for (let key of keys) {
        query.push(`${key}=${options[key]}`);
    }
    return query.join('&');
}

export function printUrlWithToken(urlPart: string): string {
    if (!urlPart.startsWith('/')) {
        urlPart = `/${urlPart}`;
    }
    const token = window.sessionStorage.getItem('token');
    let url: string = `${PRINT}${urlPart}`;
    if (url.includes('?')) {
        url = `${url}&token=${token}`;
    } else {
        url = `${url}?token=${token}`;
    }
    return url;
}

export function isValidKePhone(str: string): boolean {
    if (!str) return false;
    if (str.length < 10) return false;
    let actualNo: string;
    if ((str.length === 13) && str.startsWith("+2547")) {
        actualNo = str.substring(4);
    } else if ((str.length === 12) && str.startsWith("2547")) {
        actualNo = str.substring(3);
    } else if ((str.length === 10) && str.startsWith("07")) {
        actualNo = str.substring(1);
    } else {
        return false;
    }
    if (actualNo.length !== 9) return false;
    if (!(/^[0-9]+$/i.test(actualNo))) return false;
    return true;
}

export function getObservableUrl(ob: Observable<any>): string {
    if (!ob) return undefined;
    return ob.source.source.source.source.source['value'].url
}

export function getSessionUserType(): string {
    const token = window.sessionStorage.getItem('token');
    if (!token) {
        window.location.reload();
        return;
    }
    const jwt = new JwtHelperService();
    const user: User = jwt.decodeToken(token);
    if (!user || !user.type) return null;
    return user.type.toLowerCase();
}