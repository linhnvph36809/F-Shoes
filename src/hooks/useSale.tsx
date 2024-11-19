import {useState} from "react";
import {tokenManagerInstance} from "../api";
import {ISale} from "../interfaces/ISale.ts";

const API_SALE = 'api/sale';

const useSale = () => {
    const [sales,setSales] = useState<ISale[]>([]);

    const all = async () => {
        try {
            const {data} = await tokenManagerInstance('get',API_SALE);
            setSales(data.data.data);
        }catch (error)
        {
            console.log(error);
        }

    }
    const switchStatus = async (id:string|number,is_active:string|number) => {
        try {
            const {data} = await tokenManagerInstance('put', `sale/switch/active/${id}`,{
                is_active:is_active,
            });
            console.log(data);
        }catch (error)
        {
            console.log(error);
        }
    }
    return {
        all,
        sales,
        switchStatus
    }
}
export default useSale;