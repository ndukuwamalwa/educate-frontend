import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function attendanceLinks(): TabLink[] {
    const type = getSessionUserType();
    let attendanceLinks: TabLink[];
    if (type === 'admin') {
        attendanceLinks = [
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
    } else if (type === 'registrar') {
        attendanceLinks = [
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
    } else if (type === 'teacher') {
        attendanceLinks = [
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
    } else if (type === 'finance') {
        attendanceLinks = [
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
    } else {
        attendanceLinks = [];
    }
    return attendanceLinks;
}