import { TabLink } from 'src/app/models/tab-link';

export const paymentLinks: TabLink[] = [
    {
        path: "/bank-slip",
        label: "Bankslip",
        default: "/new",
        children: [
            {
                label: "New",
                path: "/new"
            },
            {
                label: "View",
                path: "/view"
            },
            {
                label: "Print",
                path: "/print"
            }
        ]
    },
    {
        path: "/cheque",
        label: "Cheques",
        default: "/new",
        children: [
            {
                label: "New",
                path: "/new"
            },
            {
                label: "View",
                path: "/view"
            },
            {
                label: "Print",
                path: "/print"
            }
        ]
    },
    {
        path: "/mpesa",
        label: "M-PESA",
        default: "/view",
        children: [
            {
                label: "Reverse",
                path: "/reverse"
            },
            {
                label: "View",
                path: "/view"
            },
            {
                label: "Print",
                path: "/print"
            }
        ]
    },
    {
        path: "/cash",
        label: "Cash",
        default: "/new",
        children: [
            {
                label: "New",
                path: "/new"
            },
            {
                label: "View",
                path: "/view"
            },
            {
                label: "Print",
                path: "/print"
            }
        ]
    }
];