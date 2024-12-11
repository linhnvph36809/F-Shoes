import { ICategory } from './ICategory';
import { IImage } from './IImage';
import {IVariation} from "./IVariation.ts";

export interface IProduct {
    id: string | number;
    slug: string;
    name: string;
    price: number;
    sale_price: number;
    image_url: string;
    description: string;
    short_description: string;
    status: boolean;
    stock_qty: number;
    qty_sold: number;
    images: IImage[];
    categories?: ICategory[];
    variations: IVariation[];
    qty_sale:number;
}
