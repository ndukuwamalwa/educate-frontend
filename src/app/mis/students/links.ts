import { TabLink } from 'src/app/models/tab-link';

export const studentLinks: TabLink[] = [
    {
        label: "Add student",
        path: "/add",
        default: "/single",
        children: [
            {
                path: "/single",
                label: "Add"
            },
            {
                path: "/import",
                label: "Import"
            }
        ]
    },
    {
        label: "View students",
        path: "/view",
        default: "/active",
        children: [
            {
                label: "Active students",
                path: "/active"
            },
            {
                label: "Archived",
                path: "/archived"
            },
            {
                label: "Expelled",
                path: "/expelled"
            },
            {
                label: "Suspended",
                path: "/suspended"
            },
            {
                label: "On leave",
                path: "/leave"
            }
        ]
    },
    {
        label: "Printing",
        path: "/printing",
        default: "/active",
        children: [
            {
                label: "Active",
                path: "/active"
            },
            {
                label: "Archived",
                path: "/archived"
            },
            {
                label: "Expelled",
                path: "/expelled"
            },
            {
                label: "Suspended",
                path: "/suspended"
            },
            {
                label: "On leave",
                path: "/leave"
            }
        ]
    },
    {
        label: "Management",
        path: "/management",
        default: "/archive",
        children: [
            {
                label: "Archive",
                path: "/archive"
            },
            {
                label: "New leave",
                path: "/leave"
            },
            {
                label: "New suspension",
                path: "/suspension"
            },
            {
                label: "New expulsion",
                path: "/expulsion"
            },
            {
                label: "Re-activate",
                path: "/restore"
            },
            {
                label: "Delete",
                path: "/delete"
            }
        ]
    }
];