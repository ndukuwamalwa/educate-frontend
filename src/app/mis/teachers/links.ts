import { TabLink } from 'src/app/models/tab-link';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
const user = jwt.decodeToken(window.sessionStorage.getItem('token'));
const type = user.type.toLowerCase();

export function teacherLinks(): TabLink[] {
    let teacherLinks: TabLink[];
    if (type === 'admin') {
        teacherLinks = [
            {
                label: "Teachers",
                path: "/view",
                default: "/active",
                children: [
                    {
                        label: "Active",
                        path: "/active"
                    },
                    {
                        label: "Transferred",
                        path: "/transfered"
                    },
                    {
                        label: "Retired",
                        path: "/retired"
                    }
                ]
            },
            {
                label: "Classes",
                path: "/classes",
                default: "/view",
                children: [
                    {
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            },
            {
                label: "Subjects",
                path: "/subjects",
                default: "/view",
                children: [
                    {
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            }
        ];
    } else if (type === 'registrar') {
        teacherLinks = [
            {
                label: "Teachers",
                path: "/view",
                default: "/active",
                children: [
                    {
                        label: "Active",
                        path: "/active"
                    },
                    {
                        label: "Transferred",
                        path: "/transfered"
                    },
                    {
                        label: "Retired",
                        path: "/retired"
                    }
                ]
            },
            {
                label: "Classes",
                path: "/classes",
                default: "/view",
                children: [
                    {
                        label: "Assign class",
                        path: "/assign"
                    },
                    {
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            },
            {
                label: "Subjects",
                path: "/subjects",
                default: "/view",
                children: [
                    {
                        label: "Assign subject",
                        path: "/assign"
                    },
                    {
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            }
        ];
    } else if (type === 'teacher') {
        teacherLinks = [
            {
                label: "Teachers",
                path: "/view",
                default: "/active",
                children: [
                    {
                        label: "Active",
                        path: "/active"
                    }
                ]
            },
            {
                label: "Classes",
                path: "/classes",
                default: "/view",
                children: [
                    {
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            },
            {
                label: "Subjects",
                path: "/subjects",
                default: "/view",
                children: [
                    {
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            }
        ];
    } else if (type === 'finance') {
        teacherLinks = [
            {
                label: "Teachers",
                path: "/view",
                default: "/active",
                children: [
                    {
                        label: "Active",
                        path: "/active"
                    },
                    {
                        label: "Transferred",
                        path: "/transfered"
                    },
                    {
                        label: "Retired",
                        path: "/retired"
                    }
                ]
            },
            {
                label: "Classes",
                path: "/classes",
                default: "/view",
                children: [
                    {
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            },
            {
                label: "Subjects",
                path: "/subjects",
                default: "/view",
                children: [
                    {
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            }
        ];
    } else {
        teacherLinks = [];
    }
    return teacherLinks;
}
