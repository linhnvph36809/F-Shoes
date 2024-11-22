import {IProduct} from "./IProduct.ts";
import {IVariation} from "./IVariation.ts";

export interface IOrderDetail {
    id:string;
    order_id:string;
    product_variation_id:string;
    product_id:string;
    price: number;
    quantity:number;
    total_amount:number;
    product:IProduct;
    variation: IVariation;
    

}