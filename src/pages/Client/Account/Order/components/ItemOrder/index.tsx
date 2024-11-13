import ItemProduct from "../ProductItem";
import {IOrder,statusString} from "../../../../../../interfaces/IOrder.ts";
import React, {useEffect, useState} from "react";
import "../../style.scss";
import {Button} from "antd";
import {IOrderDetail} from "../../../../../../interfaces/IOrderDetail.ts";
import { timeToNow,formatPrice } from '../../../../../../utils';
import {Link, useNavigate} from "react-router-dom";
import useOrder from "../../../../../../hooks/profile/useOrder.tsx";
import LoadingSmall from "../../../../../../components/Loading/LoadingSmall.tsx";


type Props = {
    order:IOrder
}
const ItemOrder:React.FC<Props> = ({order}) => {
    const navigator = useNavigate();
    const [orderItems,setOrderItems] = useState<IOrderDetail[]>();
    const {cancelOrder,cancelLoading:loading} = useOrder();
    const [canCancel,setCanCancel] = useState(true);

    useEffect(() => {
        if(order.status >= 3){
            setCanCancel(false);
        }
    }, []);


    useEffect(() => {
        if(order && order.order_details){
            setOrderItems(order.order_details);
        }
    }, [order]);
    const handleCancelOrder =async (id:string) => {
        if(confirm("Are you sure you want to cancel this order?")){
            const cancelledOrder = await cancelOrder(id);
            if(cancelledOrder){
                navigator(0);
                alert('Order cancelled successfully!');
                setCanCancel(false);
            }else{
                navigator(0);
                alert('Something went wrong!');
            }

        }
    }
    return (
        <div className="bg-white rounded p-8 mt-6 opacity-60 hover:opacity-100">
            <header className=" flex items-center justify-between text-2xl my-6">
                <div className="flex items-center space-x-4">
                    <div>ID: {order.id}</div>
                    <div>
                        {statusString(order.status)}
                    </div>
                </div>
                <div>{timeToNow(order.created_at)}</div>
            </header>
            <main className="border-t-1 my-6 py-6">
                <div
                    className="flex flex-col space-y-4 h-[160px] rounded scrollbar-custom overflow-auto p-4">
                    {orderItems ? orderItems.map((item,index) => (
                        <ItemProduct product={item.product} variation={item.variation} key={index} quantity={item.quantity} />
                    )) : <div className="flex items-center justify-center text-2xl">Some thing went wrong!</div>}
                </div>
            </main>
            <div className="mt-6 border-t-1 w-full flex items-center justify-between px-6">
                <div className="">
                    Confirm receipt after you've checked the received items
                </div>
                <div className="flex flex-col items-center p-4 space-y-4">
                    <div className="text-2xl text-gray">Order Total : <span className="text-3xl color-primary">{formatPrice(order.total_amount)}đ</span></div>
                    <div className="flex space-x-4">
                        <Link to={`order/${order.id}`}><Button>Watch</Button></Link>
                        {
                           order.status === 0 ?<Button className="bg-amber-200">Buy again</Button>  :  canCancel ?
                                loading ?  <Button className="bg-black cursor-default"><LoadingSmall/></Button> :
                                <Button onClick={() => handleCancelOrder(order.id)}>Cancel</Button>
                                : <button
                                className="rounded-lg cursor-default bg-gray-200 text-xl py-1 px-6 ">Cancel</button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemOrder;