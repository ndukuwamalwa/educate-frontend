export interface User {
    id: number;
    name: string;
    title: string;
    username: string;
    password?: string;
    type: string;
    state: string;
}