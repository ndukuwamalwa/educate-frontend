import { TabLink } from 'src/app/models/tab-link';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
const user = jwt.decodeToken(window.sessionStorage.getItem('token'));
const type = user.type.toLowerCase();

export function subjectLinks(): TabLink[] {
    let subjectLinks: TabLink[];
    if (type === 'admin') {
        subjectLinks = [
            {
                label: "New subject",
                path: "/add",
                default: "/new",
                children: [
                    {
                        label: "New subject",
                        path: "/new"
                    }
                ]
            },
            {
                label: "Subjects",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            },
            {
                label: "Registration",
                path: "/registration",
                default: "/view",
                children: [
                    {
                        path: "/view",
                        label: "View registered"
                    }
                ]
            }
        ];
    } else if (type === 'registrar') {
        subjectLinks = [
            {
                label: "Subjects",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            },
            {
                label: "Registration",
                path: "/registration",
                default: "/view",
                children: [
                    {
                        path: "/view",
                        label: "View registered"
                    }
                ]
            }
        ];
    } else if (type === 'teacher') {
        subjectLinks = [
            {
                label: "Subjects",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            },
            {
                label: "Registration",
                path: "/registration",
                default: "/view",
                children: [
                    {
                        path: "/new",
                        label: "Register"
                    },
                    {
                        path: "/view",
                        label: "View registered"
                    }
                ]
            }
        ];
    } else if (type === 'finance') {
        subjectLinks = [];
    } else {
        subjectLinks = [];
    }
    return subjectLinks;
}
