import {IOrder, statusString} from "../../../../../../interfaces/IOrder.ts";
import React, {useEffect, useState} from "react";
import "../../style.scss";
import {Button} from "antd";
import {timeToNow, formatPrice} from '../../../../../../utils';
import {Link, useNavigate} from "react-router-dom";
import useOrder from "../../../../../../hooks/profile/useOrder.tsx";
import LoadingSmall from "../../../../../../components/Loading/LoadingSmall.tsx";
import {Eye} from "lucide-react";
import {showMessageActive} from "../../../../../../utils/messages.ts";


type Props = {
    order: IOrder
}
const ItemOrder: React.FC<Props> = ({order}) => {
    const navigator = useNavigate();
    const {cancelOrder, cancelLoading: loading,reOrderLoading,reOrder} = useOrder();
    const [canCancel, setCanCancel] = useState(true);

    useEffect(() => {
        if (order.status >= 3) {
            setCanCancel(false);
        }
    }, []);
    const handleCancelOrder = async (id: string) => {
        showMessageActive('Are you sure you want to delete the topic?', '', 'warning', () => {
             cancelOrder(id);
            setCanCancel(false);
        });
    }

    const handleBuyAgain = async (id: string) => {
        showMessageActive('Are you sure you want to reorder the order?', '', 'warning', () => {
             reOrder(id);
        });

    }
    return (
        <div className=" rounded p-8 mt-6 bg-gray-50 hover:bg-white">
            <header className=" flex items-center justify-between text-2xl my-6">
                <div className="flex items-center space-x-4">
                    <div>ID: {order?.id}</div>
                    <div className="font-bold">
                        {statusString(order?.status)}
                    </div>
                </div>
                <div>{timeToNow(order?.created_at)}</div>
            </header>
            <main className="border-t-1  border-b-1">
                <div className="grid grid-cols-9 gap-4">
                    <div className="p-4 rounded col-span-2 flex flex-col space-y-4 hover:bg-gray-200">

                        <div className="text-2xl ">
                            <span
                                className="text-gray-500 font-bold text-xl">Receiver Name :</span> {order?.receiver_full_name}
                        </div>

                        <div className="text-2xl"><span
                            className="text-gray-500 font-bold text-xl">Phone :</span> {order?.phone}
                        </div>
                    </div>
                    <div className=" p-4 rounded col-span-3 hover:bg-gray-200">
                        <div className="col-span-2 rounded break-words  ">
                           <span
                               className="text-gray-500 font-bold text-xl">Delivery Address : </span>{order?.address}
                        </div>
                    </div>
                    <div className=" p-4 rounded col-span-4 hover:bg-gray-200">

                        <div className="col-span-2 rounded break-words  ">
                           <span
                               className="text-gray-500 font-bold text-xl">Note :</span>
                            {!order?.note || order?.note === '' ? <div className="flex-1 flex items-center justify-center font-bold text-gray-500">
                                This order don't have any note. <Link className="font-light hover:underline" to={`/profile/order/${order.id}`}>Watch order detail!</Link>
                            </div> : order?.note}
                        </div>
                    </div>

                </div>
            </main>
            <div className="mt-6  w-full flex items-center justify-between px-6">
                <div className="">
                    Confirm receipt after you've checked the received items
                </div>
                <div className="flex flex-col items-center p-4 space-y-4">
                    <div className="text-2xl text-gray">Order Total : <span
                        className="text-3xl color-primary">{formatPrice(order.total_amount)}đ</span></div>
                    <div className="flex space-x-4">
                        <Link to={`/profile/order/${order?.id}`}><Button className="text-center"><Eye className="size-6"/>Watch
                            Detail</Button></Link>
                        {
                            order?.status === 0 ? <Button className="bg-amber-200" onClick={() => handleBuyAgain(order?.id)} >Buy again</Button> : canCancel ?
                                loading ? <Button className="bg-black cursor-default"><LoadingSmall/></Button> :
                                    <Button onClick={() => handleCancelOrder(order?.id)}>Cancel</Button>
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