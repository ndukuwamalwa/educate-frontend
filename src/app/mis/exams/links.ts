import { TabLink } from 'src/app/models/tab-link';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();
const user = jwt.decodeToken(window.sessionStorage.getItem('token'));
const type = user.type.toLowerCase();

export function examLinks(): TabLink[] {
    let examLinks: TabLink[];
    if (type === 'admin') {
        examLinks = [
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
    } else if (type === 'registrar') {
        examLinks = [
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
                        label: "View results",
                        path: "/view"
                    }
                ]
            }
        ];
    } else if (type === 'teacher') {
        examLinks = [
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
    } else if (type === 'finance') {
        examLinks = [
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
            }
        ];
    } else {
        examLinks = [];
    }
    return examLinks;
}
