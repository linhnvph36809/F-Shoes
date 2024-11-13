export interface IVariation {
    id:string;
    name: string;
    classify:string;
    sku:string|undefined;
    slug:string;
    price:number;
    sale_price: number;
    import_price:number;
    status:boolean;
    stock_qty: number;
    qty_sold:number;
}