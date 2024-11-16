import LeftSidebar from "./components/LeftSidebar";
import { Skeleton} from "antd";
import "./style.scss";
import ItemOrder from "./components/ItemOrder";
import useOrder from "../../../../hooks/profile/useOrder.tsx";
import {useEffect, useState} from "react";
import {IOrder, statusArr} from "../../../../interfaces/IOrder.ts";
import {Link, useSearchParams} from "react-router-dom";


const OrderAccount = () => {
    const {orders, loading, myOrders} = useOrder();
    const [searchParams] = useSearchParams();
    const [filteredOrders, setFilteredOrders] = useState<IOrder[]>([]);
    const statusOptionParam = searchParams.get("status");
    useEffect(() => {
        myOrders();
    }, []);
    useEffect(() => {
        setListOrder(orders);
        if (statusOptionParam && statusArr.includes(statusOptionParam)) {
            const filterOnes = orders.filter((item) => statusArr[item.status] === statusOptionParam);
            setListOrder(filterOnes);
        }
    }, [orders]);
    useEffect(() => {
        if (statusOptionParam && statusArr.includes(statusOptionParam)) {
            const filterOnes = orders.filter((item) => statusArr[item.status] === statusOptionParam);
            setFilteredOrders(filterOnes);
        } else if (!statusOptionParam) {
            setListOrder(orders);
        } else {
            setListOrder([]);
        }
    }, [statusOptionParam]);

    const [listOrder, setListOrder] = useState<IOrder[]>([]);
    useEffect(() => {
        setListOrder(filteredOrders);
    }, [filteredOrders]);

    // const onChangeFilterOrder = (e: any) => {
    //
    //     const value = e.target.value;
    //
    //    console.log(value);
    //
    //
    // }
    return (
        <div className="border-t-2 w-full px-8 flex p-8 bg-gray-100">
            <LeftSidebar title="Orders" className="mx-6 bg-white w-[14%]"/>
            <div className="w-full">
                {/*<div className="flex items-center">*/}
                {/*    <Input className="w-full h-16" onChange={onChangeFilterOrder} placeholder="Find an order"/>*/}
                {/*</div>*/}
                <div>
                    {loading ? <Skeleton/> :
                        listOrder && listOrder.length > 0 ? listOrder.map((order, index) => (
                                <ItemOrder order={order} key={index}/>
                            ))
                            : (<div className="flex items-center justify-center text-2xl">There's nothing here ! <Link
                                to="/category" className="decoration-1 underline hover:font-bold">Find products</Link>
                            </div>)
                    }

                </div>
            </div>
        </div>
    );
};

export default OrderAccount;