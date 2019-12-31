import { TabLink } from 'src/app/models/tab-link';

export const teacherLinks: TabLink[] = [
    {
        label: "New",
        path: "/add",
        default: "/new",
        children: [
            {
                label: "New teacher",
                path: "/new"
            }
        ]
    },
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