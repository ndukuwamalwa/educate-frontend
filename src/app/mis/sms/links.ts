import { TabLink } from 'src/app/models/tab-link';

export const smsLinks: TabLink[] = [
    {
        label: "Compose",
        path: "/add",
        default: "/single",
        children: [
            {
                label: "Single recipient",
                path: "/single"
            },
            {
                label: "Multi recipients",
                path: "/multiple"
            }
        ]
    },
    {
        label: "Previous",
        path: "/view",
        default: "/messages",
        children: [
            {
                label: "Messages",
                path: "/messages"
            }
        ]
    }
];