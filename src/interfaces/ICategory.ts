import { IProduct } from './IProduct';

export interface ICategory {
    id: string | number;
    name: string;
    slug: string | number;
    parents: Array<[]>;
    products?: IProduct[];
}
