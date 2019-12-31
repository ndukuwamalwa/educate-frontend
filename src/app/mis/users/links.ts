import { TabLink } from 'src/app/models/tab-link';

export const userLinks: TabLink[] = [
    {
        label: "New user",
        path: "/add",
        default: "/new",
        children: [
            {
                label: "New user",
                path: "/new"
            },
            {
                label: "New group",
                path: "/group"
            }
        ]
    },
    {
        label: "Users",
        path: "/view",
        default: "/users",
        children: [
            {
                label: "User list",
                path: "/users"
            },
            {
                label: "User groups",
                path: "/groups"
            }
        ]
    }
];