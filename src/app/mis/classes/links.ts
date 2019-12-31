import { TabLink } from 'src/app/models/tab-link';

export const classLinks: TabLink[] = [
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