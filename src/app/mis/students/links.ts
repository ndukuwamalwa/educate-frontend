import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function studentLinks(): TabLink[] {
    let studentLinks: TabLink[];
    const type = getSessionUserType();
    if (type === "admin") {
        studentLinks = [
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
    } else if (type === "registrar") {
        studentLinks = [
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
        ];
    } else if (type === "teacher") {
        studentLinks = [
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
                default: "/leave",
                children: [
                    {
                        label: "New leave",
                        path: "/leave"
                    },
                    {
                        label: "New suspension",
                        path: "/suspension"
                    },
                ]
            }
        ];
    } else if (type === "finance") {
        studentLinks = [
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
            }
        ];
    } else {
        studentLinks = [];
    }
    return studentLinks;
}