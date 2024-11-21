import { IProduct } from './IProduct.ts';

export interface IUser {
    id: string | number;
    avatar_url: string;
    nickname: string;
    name: string;
    email: string;
    email_verified_at: string;
    google_id: string;
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

