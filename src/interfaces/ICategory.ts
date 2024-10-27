import { IProduct } from './IProduct';

export interface ICategory {
    id: string | number;
    name: string;
    slug: string | number;
    products?: IProduct[];
    children?: ICategory[];
    parents?: ICategory[];
}
