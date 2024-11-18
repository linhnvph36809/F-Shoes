import {IOrderDetail} from "./IOrderDetail.ts";

export const statusString = (id:number) => {
    if(id === 0) return "Cancelled";
    if(id === 1) return "Waiting Confirm";
    if(id === 2) return "Confirmed";
    if(id === 3) return "Delivering";
    if(id === 4) return "Delivered";
    if(id === 5) return "Return Processing";
    if(id === 6) return "Denied Return";
    if(id === 7) return "Returned";
}
export const statusArr = [
    'cancelled',
    'waiting_confirm',
    'confirmed',
    'delivering',
    'delivered',
    'return_processing',
    'denied_return',
    'returned'
]
export interface IOrder{
    id:string;
    user_id:string;
    total_amount:number;
    payment_method:string;
    payment_status: string;
    shipping_method: string;
    shipping_cost: number;
    tax_amount: number|undefined;
    amount_collected: number;
    receiver_full_name: string|undefined;
    address: string;
    phone: string;
    note:string;
    status:number;
    order_details: IOrderDetail[];
    created_at: string;
    updated_at: string;
}