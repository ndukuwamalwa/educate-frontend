import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function teacherLinks(): TabLink[] {
    let teacherLinks: TabLink[];
    const type = getSessionUserType();
    if (type === 'admin') {
        teacherLinks = [
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
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            }
        ];
    } else if (type === 'registrar') {
        teacherLinks = [
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
    } else if (type === 'teacher') {
        teacherLinks = [
            {
                label: "Teachers",
                path: "/view",
                default: "/active",
                children: [
                    {
                        label: "Active",
                        path: "/active"
                    }
                ]
            },
            {
                label: "Classes",
                path: "/classes",
                default: "/view",
                children: [
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
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            }
        ];
    } else if (type === 'finance') {
        teacherLinks = [
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
                        label: "Assignments",
                        path: "/view"
                    }
                ]
            }
        ];
    } else {
        teacherLinks = [];
    }
    return teacherLinks;
}
