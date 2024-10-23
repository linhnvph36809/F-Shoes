export interface ICategory {
    id: string | number;
    name: string;
    slug: string | number;
    children?: ICategory[];
    parents?: ICategory[];
}
