import { TabLink } from 'src/app/models/tab-link';

export const attendanceLinks: TabLink[] = [
    {
        label: "Mark",
        path: "/mark",
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
    }
];