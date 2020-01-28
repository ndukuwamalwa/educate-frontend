import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function userLinks(): TabLink[] {
    let userLinks: TabLink[];
    const type = getSessionUserType();
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
