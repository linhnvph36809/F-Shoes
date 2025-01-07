import {useState} from "react";
import {tokenManagerInstance} from "../api";
import {ISale} from "../interfaces/ISale.ts";
import { showMessageAdmin, showMessageClient } from "../utils/messages.ts";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { handleChangeMessage } from "../utils/index.ts";
import { useContextGlobal } from "../contexts/index.tsx";

export const QUERY_KEY = 'sales';
export const API_SALE = 'api/sale';

const useSale = () => {
    const {  locale } = useContextGlobal();
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
            showMessageAdmin((error as any)?.response?.data?.message || 'Something went wrong!', '', 'error');
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
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
            showMessageClient(handleChangeMessage(locale,'Sale created successfully','Bán hàng đã được tạo thành công'),'','success');
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
            if (e.response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            }
            if (e?.response?.data?.errors?.name) {
                showMessageClient(
                    e?.response?.data?.errors?.name[0] ,
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            }
            
            
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
            showMessageClient(data?.message,'','success');
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
            if ((error as any).response.data.message) {
                showMessageClient((error as any)?.response?.data?.message, '', 'error');
            } else if ((error as any)?.response?.data?.errors) {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something is missing.Please check again!',
                        'Một số trường đã bị sót.Hãy kiểm tra lại',
                    ),
                    '',
                    'error',
                );
            } else if ((error as any)?.response?.data?.error) {
                showMessageClient((error as any)?.response?.data?.error, '', 'error');
            } else {
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
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