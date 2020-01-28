import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function employeeLinks(): TabLink[] {
    let employeeLinks: TabLink[];
    const type = getSessionUserType();
    if (type === 'admin') {
        employeeLinks = [
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
    } else if (type === 'registrar') {
        employeeLinks = [
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
            }
        ];
    } else if (type === 'teacher') {
        employeeLinks = [];
    } else if (type === 'finance') {
        employeeLinks = [
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
            }
        ];
    } else {
        employeeLinks = [];
    }
    return employeeLinks;
}