import { TabLink } from 'src/app/models/tab-link';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
const user = jwt.decodeToken(window.sessionStorage.getItem('token'));
const type = user.type.toLowerCase();

export function classLinks(): TabLink[] {
    let classLinks: TabLink[];
    if (type === 'admin') {
        classLinks = [
            {
                label: "Add",
                path: "/add",
                default: "/single",
                children: [
                    {
                        label: "Single class",
                        path: "/single"
                    }
                ]
            },
            {
                label: "View",
                path: "/view",
                default: "/classes",
                children: [
                    {
                        label: "Classes",
                        path: "/classes"
                    },
                    {
                        label: "Streams",
                        path: "/streams"
                    }
                ]
            },
            {
                label: "Students",
                path: "/students",
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
                label: "Printing",
                path: "/printing",
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
        classLinks = [
            {
                label: "View",
                path: "/view",
                default: "/classes",
                children: [
                    {
                        label: "Classes",
                        path: "/classes"
                    },
                    {
                        label: "Streams",
                        path: "/streams"
                    }
                ]
            },
            {
                label: "Students",
                path: "/students",
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
                        label: "Unclassed",
                        path: "/unclassed"
                    }
                ]
            },
            {
                label: "Printing",
                path: "/printing",
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
        classLinks = [
            {
                label: "View",
                path: "/view",
                default: "/classes",
                children: [
                    {
                        label: "Classes",
                        path: "/classes"
                    },
                    {
                        label: "Streams",
                        path: "/streams"
                    }
                ]
            },
            {
                label: "Students",
                path: "/students",
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
                label: "Printing",
                path: "/printing",
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
        classLinks = [
            {
                label: "View",
                path: "/view",
                default: "/classes",
                children: [
                    {
                        label: "Classes",
                        path: "/classes"
                    },
                    {
                        label: "Streams",
                        path: "/streams"
                    }
                ]
            },
            {
                label: "Students",
                path: "/students",
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
                label: "Printing",
                path: "/printing",
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
        classLinks = [];
    }
    return classLinks;
}