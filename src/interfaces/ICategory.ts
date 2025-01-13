import { LANGUAGE_VI } from '../constants';
import { handleChangeMessage, handleGetLocalStorage } from '../utils';
import { IProduct } from './IProduct';

export interface ICategory {
    id: string | number;
    name: string;
    slug: string | number;
    products?: IProduct[];
    children?: ICategory[];
    parents?: ICategory[];
    display?:boolean;
    is_main?:boolean|number;
}
export const formatMainCategory =(id:any, name:string) => {
     const language = handleGetLocalStorage('language') || LANGUAGE_VI;
    switch(id){
        case 1: 
            return handleChangeMessage(language,'New & Featured','Mới & Đặc Sắc');
        case 2: 
            return handleChangeMessage(language,'Men','Đàn Ông');
        case 3: 
            return handleChangeMessage(language,'Women','Phụ Nữ');
        case 4: 
            return handleChangeMessage(language,'Kids','Trẻ Em');
        default: 
            return name;
    }
}