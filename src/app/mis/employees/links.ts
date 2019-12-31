import { TabLink } from 'src/app/models/tab-link';

export const employeeLinks: TabLink[] = [
    {
        label: "Add",
        path: "/add",
        default: "/single",
        children: [
            {
                label: "New",
                path: "/single"
            }
        ]
    },
    {
        label: "View",
        path: "/view",
        default: "/active",
        children: [
            {
                label: "Active",
                path: "/active"
            },
            {
                label: "Retired",
                path: "/retired"
            },
            {
                label: "Transferred",
                path: "/transfered"
            }
        ]
    },
    {
        label: "Manage",
        path: "/management",
        default: "/transfer",
        children: [
            {
                label: "New transfer",
                path: "/transfer"
            },
            {
                label: "Retirement",
                path: "/retire"
            },
            {
                label: "Delete",
                path: "/delete"
            },
            {
                label: "Restore",
                path: "/restore"
            }
        ]
    }
];