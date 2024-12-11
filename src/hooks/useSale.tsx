import {useState} from "react";
import {tokenManagerInstance} from "../api";
import {ISale} from "../interfaces/ISale.ts";
import { showMessageClient } from "../utils/messages.ts";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

export const QUERY_KEY = 'sales';
export const API_SALE = 'api/sale';

const useSale = () => {
    const [sales,setSales] = useState<ISale[]>([]);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [loadingCreateSale, setLoadingCreateSale] = useState<boolean>(false);
    const [loadingUpdateSale, setLoadingUpdateSale] = useState<boolean>(false);
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
    const createSale = async (dataSale:any) => {
        try {
            setLoadingCreateSale(true);
            const {data} = await tokenManagerInstance('post', API_SALE,dataSale);
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
            navigate('/admin/listsale');
            showMessageClient('Success','Sale created successfully','success');
        }catch (error){
            const e = error as any;
            if(e?.response?.data?.errors?.start_date){
                showMessageClient('Error',e?.response?.data?.errors?.start_date,'error');
                return;
            }
            if(e?.response?.data?.errors?.end_date){
                showMessageClient('Error',e?.response?.data?.errors?.end_date,'error');
                return;
            }
            console.log(e);
            
            
        }finally{
            setLoadingCreateSale(false);
        }
    }
    const updateSale = async (id:string|number,dataSale:any) => {
        try {
            setLoadingUpdateSale(true);
            const {data} = await tokenManagerInstance('put', `${API_SALE}/${id}`,dataSale);
            queryClient.invalidateQueries({queryKey:[QUERY_KEY]});
            navigate('/admin/listsale');
            showMessageClient('Success','Sale created successfully','success');
        }catch (error){
            const e = error as any;
            if(e?.response?.data?.errors?.start_date){
                showMessageClient('Error',e?.response?.data?.errors?.start_date,'error');
                return;
            }
            if(e?.response?.data?.errors?.end_date){
                showMessageClient('Error',e?.response?.data?.errors?.end_date,'error');
                return;
            }
            
        }finally{
            setLoadingUpdateSale(false);
        }
    }
    return {
        all,
        sales,
        switchStatus,
        updateStatusLoad,
        createSale,
        loadingCreateSale,
        loadingUpdateSale,
        updateSale
    }
}
export default useSale;