import { useState} from "react";
import {IOrder} from "../../interfaces/IOrder.ts";
import {tokenManagerInstance} from "../../api";


const UseOrder = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [loading,setLoading] = useState(false);


    const myOrders = async () => {
        try {
            setLoading(true);
            const {data} = await tokenManagerInstance('get','api/me/orders');
            setOrders(data);
        }catch (error)
        {
            console.log(error,'error');
        }finally {
            setLoading(false);
        }
    }
    const cancelOrder = async (id:string) => {
        try {
            setCancelLoading(true);
            const {data} = await tokenManagerInstance('patch',`api/cancel/order/${id}`);

            return data.order;
        }catch (error)
        {
            console.log(error);
            return false;
        }finally {
            setCancelLoading(false);
        }
    }

    return {
        orders,
        loading,
        myOrders,
        cancelOrder,
        cancelLoading,

    }
};

export default UseOrder;