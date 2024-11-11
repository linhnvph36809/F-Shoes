import ItemProduct from "../ProductItem";
import {IOrder} from "../../../../../../interfaces/IOrder.ts";
import React from "react";
import "../../style.scss";
import {Button} from "antd";
type Props = {
    order?:IOrder
}
const ItemOrder:React.FC<Props> = ({order}) => {
    console.log(order);
    return (
        <div className="bg-white rounded p-8 mt-6 ">
            <header className=" flex items-center justify-between text-2xl my-6">
                <div className="flex items-center space-x-4 ">
                    <div>
                        status
                    </div>
                    <div>ID</div>
                </div>
                <div>9 giờ trước</div>
            </header>
            <main className="border-t-1 my-6 py-6">
                <div
                    className="flex flex-col space-y-4 h-[160px] rounded scrollbar-custom overflow-auto p-4">
                    <ItemProduct></ItemProduct>
                    <ItemProduct></ItemProduct>


                </div>
            </main>
            <div className="mt-6 border-t-1 w-full flex items-center justify-between px-6">
                <div className="">
                    Confirm receipt after you've checked the received items
                </div>
                <div className="flex flex-col items-center p-4 space-y-4">
                    <div className="text-2xl text-gray">Order Total : <span className="text-3xl color-primary">123450.0000000</span></div>
                    <div className="flex space-x-4">
                        <Button>Watch</Button>
                        <Button>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemOrder;