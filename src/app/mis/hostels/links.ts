import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function hostelLinks(): TabLink[] {
    let hostelLinks: TabLink[];
    const type = getSessionUserType();
    if (type === 'admin') {
        hostelLinks = [
            {
                label: "New",
                path: "/add",
                default: "/new",
                children: [
                    {
                        label: "New",
                        path: "/new"
                    }
                ]
            },
            {
                label: "View",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            },
            {
                label: "Students",
                path: "/students",
                default: "/view",
                children: [
                    {
                        path: "/view",
                        label: "View"
                    },
                    {
                        path: "/print",
                        label: "Print"
                    }
                ]
            }
        ];
    } else if (type === 'registrar') {
        hostelLinks = [
            {
                label: "View",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            },
            {
                label: "Students",
                path: "/students",
                default: "/view",
                children: [
                    {
                        path: "/view",
                        label: "View"
                    },
                    {
                        path: "/add",
                        label: "Add"
                    },
                    {
                        path: "/print",
                        label: "Print"
                    }
                ]
            }
        ];
    } else if (type === 'teacher') {
        hostelLinks = [
            {
                label: "View",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            },
            {
                label: "Students",
                path: "/students",
                default: "/view",
                children: [
                    {
                        path: "/view",
                        label: "View"
                    },
                    {
                        path: "/print",
                        label: "Print"
                    }
                ]
            }
        ];
    } else if (type === 'finance') {
        hostelLinks = [];
    } else {
        hostelLinks = [];
    }
    return hostelLinks;
}
