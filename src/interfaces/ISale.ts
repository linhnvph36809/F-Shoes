import { IProduct } from "./IProduct";
import { IVariation } from "./IVariation";

export interface ISale {
    id: number;
    name: string;
    type: string;
    value: number;
    start_date:string;
    end_date:string;
    is_active: boolean;
    products: IProduct[] | [];
    variations: IVariation[] | [];
    created_at: string;
    updated_at:string;
}