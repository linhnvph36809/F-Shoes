import { LANGUAGE_VI } from '../constants/index.ts';
import { handleChangeMessage, handleGetLocalStorage } from '../utils/index.ts';
import { IOrderDetail } from './IOrderDetail.ts';
import { IUser } from './IUser.ts';

export const statusString = (id: number) => {
    const language = handleGetLocalStorage('language') || LANGUAGE_VI;
    if (id === 0)
        return {
            className: 'text-red-500',
            text: handleChangeMessage(language, 'Cancelled', 'Đã hủy'),
        };
    else if (id === 1)
        return {
            className: 'text-gray-500',
            text: handleChangeMessage(language, 'Waiting Payment', 'Chờ thanh toán'),
        };
    else if (id === 2)
        return {
            className: 'text-yellow-500',
            text: handleChangeMessage(language, 'Waiting Confirm', 'Chờ xác nhận'),
        };
    else if (id === 3)
        return {
            className: 'text-orange-500',
            text: handleChangeMessage(language, 'Confirmed', 'Xác nhận'),
        };
    else if (id === 4)
        return {
            className: 'text-blue-500',
            text: handleChangeMessage(language, 'Delivering ', 'Đang giao'),
        };
    else if (id === 5)
        return {
            className: 'text-[#00f227]',
            text: handleChangeMessage(language, 'Delivered ', 'Đã giao'),
        };
    else if (id === 6)
        return {
            className: 'text-[#294781]',
            text: handleChangeMessage(language, 'Waiting Accept Return', 'Chờ chấp nhận trả hàng'),
        };
    else if (id === 7)
        return {
            className: 'text-[#d67309]',
            text: handleChangeMessage(language, 'Return Processing', 'Xử lý trả lại'),
        };
    else if (id === 8)
        return {
            className: 'text-[#741111]',
            text: handleChangeMessage(language, 'Denied Return', 'Trả lại bị từ chối'),
        };
    else if (id === 9)
        return {
            className: 'text-[#125070]',
            text: handleChangeMessage(language, 'Returned', 'Đã trả lại'),
        };
    else {
        return {
            className: 'text-red-500',
            text: handleChangeMessage(language, 'Error', 'Lỗi!'),
        };
    }
};
export const statusToNumber = (status: string) => {
    switch (status.toLocaleLowerCase()) {
        case 'cancelled':
            return 0;
        case 'waiting_payment':
            return 1;
        case 'waiting_confirm':
            return 2;
        case 'confirmed':
            return 3;
        case 'delivering':
            return 4;
        case 'delivered':
            return 5;
        case 'waiting_accept_return':
            return 6;
        case 'return_processing':
            return 7;
        case 'denied_return':
            return 8;
        case 'returned':
            return 9;
        default:
            return 0;
    }
};
export const paymentMethodString = (method: string) => {
    const language = handleGetLocalStorage('language') || LANGUAGE_VI;

    if (typeof method !== 'string') {
        return '...';
    }
    switch (method.toLocaleLowerCase()) {
        case 'cash_on_delivery':
            return handleChangeMessage(language, 'Cash on Delivery', 'Thanh toán khi nhận hàng ');
        case 'momo':
            return 'Momo';
        case 'vnpay':
            return 'VNPAY';
        case 'banking':
            return handleChangeMessage(language, 'Banking Transfer', 'Chuyển khoản ngân hàng ');
        case 'visa':
            return 'VISA';
        default:
            return '...';
    }
};

export const paymentStatusString = (status: any) => {
    const language = handleGetLocalStorage('language') || LANGUAGE_VI;
    if (typeof status !== 'string') {
        return '...';
    }
    switch (status.toLocaleLowerCase()) {
        case 'paid':
            return handleChangeMessage(language, 'Paid', 'Đã thanh toán');
        case 'not_yet_paid':
            return handleChangeMessage(language, 'Not yet paid', 'Chưa thanh toán');
        default:
            return '...';
    }
};

export const shippingMessage = () => {
    const language = handleGetLocalStorage('language') || LANGUAGE_VI;
    return handleChangeMessage(language, 'Standard Shipping', 'Giao hàng tiêu chuẩn');
};

export const statusArr = [
    'cancelled',
    'waiting_payment',
    'waiting_confirm',
    'confirmed',
    'delivering',
    'delivered',
    'waiting_accept_return',
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
    voucher_id: string | number;
}
