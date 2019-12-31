import { TabLink } from 'src/app/models/tab-link';

export const feeLinks: TabLink[] = [
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