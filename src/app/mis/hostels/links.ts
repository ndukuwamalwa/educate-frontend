import { TabLink } from 'src/app/models/tab-link';

export const hostelLinks: TabLink[] = [
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