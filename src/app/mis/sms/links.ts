import { TabLink } from 'src/app/models/tab-link';
import { getSessionUserType } from 'src/app/utilities';

export function smsLinks(): TabLink[] {
    let smsLinks: TabLink[];
    const type = getSessionUserType();
    if (type === 'admin') {
        smsLinks = [
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
    } else if (type === 'registrar') {
        smsLinks = [
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
    } else if (type === 'teacher') {
        smsLinks = [
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
    } else if (type === 'finance') {
        smsLinks = [
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
    } else {
        smsLinks = [];
    }
    return smsLinks;
}
