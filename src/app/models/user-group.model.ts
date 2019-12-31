export interface UserGroup {
    id: number;
    name: string;
    tables: { name: string, operations: string[] }[];
    created: string;
}