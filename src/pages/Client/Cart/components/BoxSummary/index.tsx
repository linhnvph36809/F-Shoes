import { useNavigate } from 'react-router-dom';

import { formatPrice } from '../../../../../utils';
const Summary = ({ total, cartId }: { total: number; cartId: number[] }) => {
    const navigate = useNavigate();
    return (
        <div className="p-4 shadow-sm rounded-lg">
            <h2 className="text-[24px] font-bold mb-4">Summary</h2>
            <div className="space-y-2">
                <div className="text-[15px] flex justify-between mb-8">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}đ</span>
                </div>
                <div className="text-[15px] flex justify-between pb-8">
                    <span>Estimated Delivery & Handling</span>
                    <span>{0}đ</span>
                </div>
                <hr className="mb-2" />
                <div className="text-[15px] flex justify-between font-bold mb-2 pb-6 pt-6">
                    <span>Total</span>
                    <span>{formatPrice(total)}đ</span>
                </div>
                <hr className="mb-4" />
            </div>
            <button
                onClick={() => {
                    navigate('/order');
                }}
                disabled={cartId.length ? false : true}
                className={`flex w-full items-center justify-center mt-2 bg-primary
                color-whitesmoke font-medium text-[16px] h-[55px] rounded-full mt-4 
                transition-global ${cartId.length ? 'opacity-1' : 'opacity-50'}`}
            >
                Checkout
            </button>
        </div>
    );
};

export default Summary;
