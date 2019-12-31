export interface TabLink {
    label: string;
    path: string;
    default: string;
    children: { path: string, label: string }[];
}
