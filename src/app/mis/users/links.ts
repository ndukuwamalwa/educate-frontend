import { TabLink } from 'src/app/models/tab-link';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
const user = jwt.decodeToken(window.sessionStorage.getItem('token'));
const type = user.type.toLowerCase();

export function userLinks(): TabLink[] {
    let userLinks: TabLink[];
    if (type === 'admin') {
        userLinks = [
            {
                label: "New user",
                path: "/add",
                default: "/new",
                children: [
                    {
                        label: "New user",
                        path: "/new"
                    }
                ]
            },
            {
                label: "Users",
                path: "/view",
                default: "/users",
                children: [
                    {
                        label: "User list",
                        path: "/users"
                    }
                ]
            }
        ];
    } else if (type === 'registrar') {
        userLinks = [];
    } else if (type === 'teacher') {
        userLinks = [];
    } else if (type === 'finance') {
        userLinks = [];
    } else {
        userLinks = [];
    }
    return userLinks;
}
