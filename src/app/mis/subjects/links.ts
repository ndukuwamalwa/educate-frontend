import { TabLink } from 'src/app/models/tab-link';

export const subjectLinks: TabLink[] = [
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