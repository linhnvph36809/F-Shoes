import { IOrderDetail } from './IOrderDetail.ts';
import { IUser } from './IUser.ts';

export const statusString = (id: number) => {
    if (id === 0)
        return {
            className: 'text-red-500',
            text: 'Cancelled',
        };
    else if (id === 1)
        return {
            className: 'text-gray-500',
            text: 'Waiting Confirm',
        };
    else if (id === 2)
        return {
            className: 'text-yellow-500',
            text: 'Confirmed',
        };
    else if (id === 3)
        return {
            className: 'text-orange-500',
            text: 'Delivering',
        };
    else if (id === 4)
        return {
            className: 'text-blue-500',
            text: 'Delivered',
        };
    else if (id === 5)
        return {
            className: 'text-gray-500',
            text: 'Return Processing',
        };
    else if (id === 6)
        return {
            className: 'text-gray-500',
            text: 'Denied Return',
        };
    else if (id === 7)
        return {
            className: 'text-gray-500',
            text: 'Returned',
        };
    else {
        return {
            className: 'text-red-500',
            text: 'Error',
        };
    }
};

export const statusArr = [
    'cancelled',
    'waiting_confirm',
    'confirmed',
    'delivering',
    'delivered',
    'return_processing',
    'denied_return',
    'returned',
];
export interface IOrder {
    id: string;
    user_id: string;
    total_amount: number;
    payment_method: string;
    payment_status: string;
    shipping_method: string;
    shipping_cost: number;
    tax_amount: number | undefined;
    amount_collected: number;
    receiver_full_name: string | undefined;
    address: string;
    phone: string;
    note: string;
    status: number;
    order_details: IOrderDetail[];
    created_at: string;
    updated_at: string;
    user: IUser;
    voucher_id: string|number;
}
