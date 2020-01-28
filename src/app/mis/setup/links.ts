import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function setupLinks(): TabLink[] {
    let setupLinks: TabLink[];
    const type = getSessionUserType();
    if (type === 'admin') {
        setupLinks = [
            {
                label: "New Term",
                path: "/add",
                default: "/term",
                children: [
                    {
                        label: "New",
                        path: "/term"
                    }
                ]
            },
            {
                label: "Terms",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            }
        ];
    } else if (type === 'registrar') {
        setupLinks = [
            {
                label: "Terms",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            }
        ];
    } else if (type === 'teacher') {
        setupLinks = [
            {
                label: "Terms",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            }
        ];
    } else if (type === 'finance') {
        setupLinks = [
            {
                label: "Terms",
                path: "/view",
                default: "/list",
                children: [
                    {
                        label: "List",
                        path: "/list"
                    }
                ]
            }
        ];
    } else {
        setupLinks = [];
    }
    return setupLinks;
}
