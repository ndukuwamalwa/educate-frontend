import { TabLink } from 'src/app/models/tab-link';

export const setupLinks: TabLink[] = [
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