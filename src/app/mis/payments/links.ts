import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function paymentLinks(): TabLink[] {
    let paymentLinks: TabLink[];
    const type = getSessionUserType();
    if (type === 'admin') {
        paymentLinks = [
            {
                path: "/bank-slip",
                label: "Bankslip",
                default: "/view",
                children: [
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
                default: "/view",
                children: [
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
                default: "/view",
                children: [
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
    } else if (type === 'registrar') {
        paymentLinks = [];
    } else if (type === 'teacher') {
        paymentLinks = [];
    } else if (type === 'finance') {
        paymentLinks = [
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
    } else {
        paymentLinks = [];
    }
    return paymentLinks;
}
