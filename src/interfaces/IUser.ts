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
    profile: any;
    favoriteProducts: IProduct[];
    created_at: any;
}
