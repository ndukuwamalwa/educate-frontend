import { TabLink } from 'src/app/models/tab-link';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
const user = jwt.decodeToken(window.sessionStorage.getItem('token'));
const type = user.type.toLowerCase();

export function hostelLinks(): TabLink[] {
    let hostelLinks: TabLink[];
    if (type === 'admin') {
        hostelLinks = [
            {
                label: "New",
                path: "/add",
                default: "/new",
                children: [
                    {
                        label: "New",
                        path: "/new"
                    }
                ]
            },
            {
                label: "View",
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
                label: "Students",
                path: "/students",
                default: "/view",
                children: [
                    {
                        path: "/view",
                        label: "View"
                    },
                    {
                        path: "/print",
                        label: "Print"
                    }
                ]
            }
        ];
    } else if (type === 'registrar') {
        hostelLinks = [
            {
                label: "View",
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
                label: "Students",
                path: "/students",
                default: "/view",
                children: [
                    {
                        path: "/view",
                        label: "View"
                    },
                    {
                        path: "/add",
                        label: "Add"
                    },
                    {
                        path: "/print",
                        label: "Print"
                    }
                ]
            }
        ];
    } else if (type === 'teacher') {
        hostelLinks = [
            {
                label: "View",
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
                label: "Students",
                path: "/students",
                default: "/view",
                children: [
                    {
                        path: "/view",
                        label: "View"
                    },
                    {
                        path: "/print",
                        label: "Print"
                    }
                ]
            }
        ];
    } else if (type === 'finance') {
        hostelLinks = [];
    } else {
        hostelLinks = [];
    }
    return hostelLinks;
}
