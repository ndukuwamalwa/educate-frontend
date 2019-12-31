import { TabLink } from 'src/app/models/tab-link';

export const examLinks: TabLink[] = [
    {
        label: "New",
        path: "/add",
        default: "/main",
        children: [
            {
                label: "End term",
                path: "/main"
            },
            {
                label: "Mid term",
                path: "/mid-term"
            }
        ]
    },
    {
        label: "View",
        path: "/view",
        default: "/all",
        children: [
            {
                label: "All",
                path: '/all'
            },
            {
                label: "Upcoming",
                path: "/upcoming"
            },
            {
                label: "Completed",
                path: "/completed"
            },
            {
                label: "End Term",
                path: '/main'
            },
            {
                label: "Mid term",
                path: "/mid"
            }
        ]
    },
    {
        label: "Results",
        path: "/results",
        default: "/view",
        children: [
            {
                label: "Add results",
                path: "/add"
            },
            {
                label: "View results",
                path: "/view"
            },
            {
                label: "Print results",
                path: "/print"
            },
            {
                label: "Report Cards",
                path: "/report-cards"
            }
        ]
    }
];