import { TabLink } from 'src/app/models/tab-link';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
const user = jwt.decodeToken(window.sessionStorage.getItem('token'));
const type = user.type.toLowerCase();

export function feeLinks(): TabLink[] {
    let feeLinks: TabLink[];
    if (type === 'admin') {
        feeLinks = [
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
            },
            {
                label: "Print",
                path: "/print",
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
            }
        ];
    } else if (type === 'registrar') {
        feeLinks = [
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
            },
            {
                label: "Print",
                path: "/print",
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
            }
        ];
    } else if (type === 'teacher') {
        feeLinks = [
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
            },
            {
                label: "Print",
                path: "/print",
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
            }
        ];
    } else if (type === 'finance') {
        feeLinks = [
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
            },
            {
                label: "Print",
                path: "/print",
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
            }
        ];
    } else {
        feeLinks = [];
    }
    return feeLinks;
}
