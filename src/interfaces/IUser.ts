import { handleChangeMessage } from '../utils/index.ts';
import { IProduct } from './IProduct.ts';

export interface IUser {
    id: string | number;
    avatar_url: string;
    nickname: string;
    name: string;
    email: string;
    email_verified_at: string;
    google_id?: string|any;
    status: string;
    profile: {
        given_name:string,
        family_name:string,
        detail_address:string,
        birth_date:any
    };
    favoriteProducts: IProduct[];
    created_at: any;
}

export const formatStatus = (status: string, locale: string) => {
        switch (status.toLocaleLowerCase()) {
            case 'active':
                return handleChangeMessage(locale, 'Active', 'Hoạt Động');

            case 'banned':
                return handleChangeMessage(locale, 'Banned', 'Hạn Chế');

            default:
                return handleChangeMessage(locale, 'Error', 'Lỗi');
        }
};
export const formatGroupName = (group_id: number|string,groupName:string,locale:string) => {
    switch(group_id){
        case 1: 
        return handleChangeMessage(locale, 'Administrator', 'Quản Trị Viên');
        case 2: 
        return handleChangeMessage(locale, 'Assistant Administrator', 'Trợ Lí Quản Trị');
        case 3: 
        return handleChangeMessage(locale, 'Customer', 'Khách Hàng');
        default: 
        return groupName;
    }
}