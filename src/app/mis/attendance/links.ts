import { TabLink } from 'src/app/models/tab-link';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
const user = jwt.decodeToken(window.sessionStorage.getItem('token'));
const type = user.type.toLowerCase();

export function attendanceLinks(): TabLink[] {
    let attendanceLinks: TabLink[];
    if (type === 'admin') {
        attendanceLinks = [
            {
                label: "View",
                path: "/view",
                default: "/stream",
                children: [
                    {
                        label: "Stream",
                        path: "/stream"
                    },
                    {
                        label: "Class",
                        path: "/class"
                    },
                    {
                        label: "Student",
                        path: "/student"
                    }
                ]
            }
        ];
    } else if (type === 'registrar') {
        attendanceLinks = [
            {
                label: "View",
                path: "/view",
                default: "/stream",
                children: [
                    {
                        label: "Stream",
                        path: "/stream"
                    },
                    {
                        label: "Class",
                        path: "/class"
                    },
                    {
                        label: "Student",
                        path: "/student"
                    }
                ]
            }
        ];
    } else if (type === 'teacher') {
        attendanceLinks = [
            {
                label: "Mark",
                path: "/mark",
                default: "/stream",
                children: [
                    {
                        label: "Stream",
                        path: "/stream"
                    },
                    {
                        label: "Class",
                        path: "/class"
                    }
                ]
            },
            {
                label: "View",
                path: "/view",
                default: "/stream",
                children: [
                    {
                        label: "Stream",
                        path: "/stream"
                    },
                    {
                        label: "Class",
                        path: "/class"
                    },
                    {
                        label: "Student",
                        path: "/student"
                    }
                ]
            }
        ];
    } else if (type === 'finance') {
        attendanceLinks = [
            {
                label: "View",
                path: "/view",
                default: "/stream",
                children: [
                    {
                        label: "Stream",
                        path: "/stream"
                    },
                    {
                        label: "Class",
                        path: "/class"
                    },
                    {
                        label: "Student",
                        path: "/student"
                    }
                ]
            }
        ];
    } else {
        attendanceLinks = [];
    }
    return attendanceLinks;
}