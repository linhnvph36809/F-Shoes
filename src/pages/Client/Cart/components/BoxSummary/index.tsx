// Summary.js
import { Button } from 'antd';

const Summary = ({ subtotal, delivery, total }: { subtotal: string, delivery: string, total: string }) => {
    return (
        <div className="p-4 shadow-sm rounded-lg">
            <h2 className="text-[24px] font-bold mb-4">Summary</h2>
            <div className="space-y-2">
                <div className="text-[15px] flex justify-between mb-8">
                    <span>Subtotal</span>
                    <span>{subtotal}</span>
                </div>
                <div className="text-[15px] flex justify-between pb-8">
                    <span>Estimated Delivery & Handling</span>
                    <span>{delivery}</span>
                </div>
                <hr className="mb-2" />
                <div className="text-[15px] flex justify-between font-bold mb-2 pb-6 pt-6">
                    <span>Total</span>
                    <span>{total}</span>
                </div>
                <hr className="mb-4" />
            </div>
            <Button block className="mt-2 bg-primary color-whitesmoke text-[20px] h-[55px] rounded-full">
                Guest Checkout
            </Button>
            <Button block className=" mt-2 bg-primary color-whitesmoke text-[20px] h-[55px] rounded-full">
                Member Checkout
            </Button>
        </div>
    );
};

export default Summary;
