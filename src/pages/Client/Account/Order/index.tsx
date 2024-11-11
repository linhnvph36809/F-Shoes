import LeftSidebar from "./components/LeftSidebar";
import { Input} from "antd";
import "./style.scss";
import ItemOrder from "./components/ItemOrder";


const OrderAccount = () => {
    return (
        <div className="border-t-2 w-full px-8 flex p-8 bg-gray-100">
            <LeftSidebar title="Orders" className="mx-6 bg-white w-[14%]"/>
            <div className="py-8 w-full">
                <div className="flex items-center">
                    <Input className="w-full h-16" placeholder="Find a product name"/>
                </div>
                <div className="mt-6">
                    <ItemOrder/>
                    <ItemOrder/>
                    <ItemOrder/>
                    <ItemOrder/>
                </div>
            </div>
        </div>
    );
};

export default OrderAccount;