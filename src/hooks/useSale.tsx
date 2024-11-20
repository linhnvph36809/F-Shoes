import {useState} from "react";
import {tokenManagerInstance} from "../api";
import {ISale} from "../interfaces/ISale.ts";


const API_SALE = 'api/sale';

const useSale = () => {
    const [sales,setSales] = useState<ISale[]>([]);
    const [updateStatusLoad, setUpdateStatusLoad] = useState(false);
    const all = async () => {
        try {
            const {data} = await tokenManagerInstance('get',API_SALE);
            setSales(data.data.data);
        }catch (error)
        {
            console.log(error);
        }

    }
    const switchStatus = async (id:string|number,is_active:boolean) => {
        try {
            setUpdateStatusLoad(true);
            const {data} = await tokenManagerInstance('put', `api/sale/switch/active/${id}`,{
                is_active:is_active,
            });
            return data.status;
        }catch (error)
        {
            return false;
        }finally {
            setUpdateStatusLoad(false);
        }
    }
    const createSale = async (dataSale) => {
        try {
            const {data} = await tokenManagerInstance('post', API_SALE,dataSale);
        }catch (error){
            console.log(error);
        }
    }
    return {
        all,
        sales,
        switchStatus,
        updateStatusLoad
    }
}
export default useSale;