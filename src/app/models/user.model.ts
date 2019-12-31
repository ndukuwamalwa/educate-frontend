export interface User {
    id: number;
    name: string;
    title: string;
    username: string;
    password: string;
    state: string;
    u_group: number;
    created: string;
    tables?: any;
    userGroup?: string;
    groupName?: string;
}