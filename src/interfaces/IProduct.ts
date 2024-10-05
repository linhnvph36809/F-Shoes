import { ICategory } from './ICategory';
import { IImage } from './IImage';

export interface IProduct {
    id: string | number;
    name: string;
    price: number;
    image_url: string;
    description: string;
    short_description: string;
    status: boolean;
    stock_qty: number;
    images: IImage[];
    categories?: ICategory[];
}
