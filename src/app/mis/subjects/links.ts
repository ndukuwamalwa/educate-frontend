import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function subjectLinks(): TabLink[] {
    let subjectLinks: TabLink[];
    const type = getSessionUserType();
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
