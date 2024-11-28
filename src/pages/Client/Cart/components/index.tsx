import { Button, InputNumber } from 'antd';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';

import useCart from '../../../../hooks/useCart';
import useWishlist from '../../../../hooks/useWishlist';
import { formatPrice } from '../../../../utils';

const CartItem = ({ product, handleDeleteCart, setCartId, refetch }: any) => {
    const { putCart } = useCart();
    const { postWishlist } = useWishlist();

    const onChange = (id: string | number, value: any) => {
        putCart(id, {
            quantity: +value,
        });
        refetch();
    };

    const handleSelectCart = (e: any) => {
        if (e.target.checked) {
            setCartId((preIds: number[]) => {
                const newData = [...preIds, +e.target.value];
                localStorage.setItem('orderId', JSON.stringify(newData));
                return newData;
            });
        } else {
            setCartId((preIds: number[]) => {
                const newData = preIds.filter((id) => id !== +e.target.value);
                localStorage.setItem('orderId', JSON.stringify(newData));
                return newData;
            });
        }
    };

    return (
        <div className="flex items-center justify-between gap-x-5 border-b">
            <div className="flex gap-x-5 flex-col lg:flex-row items-start pb-4 mb-4 max-w-[733px]">
                <img
                    src={
                        product?.product?.image_url
                            ? product.product.image_url
                            : product?.product_variation?.product.image_url
                    }
                    alt="Product"
                    className="w-60 h-60 object-cover mb-4 lg:mb-0 lg:mr-4"
                />
                <div className="flex-grow mb-4 lg:mb-0">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-[15px] font-semibold">
                            {product?.product?.name ? product.product.name : product?.product_variation?.product?.name}
                        </h3>
                        <div className="text-[15px] font-bold">{product?.price}</div>
                    </div>
                    <p className="color-gray text-[15px]">{product?.description}</p>
                    <p className="color-gray text-[15px]">{product?.color}</p>
                    <div className="text-[16px] font-medium">
                        {formatPrice(product.product_variation.product.price) || formatPrice(product?.price)}đ
                    </div>
                    <div>
                        <p className="text-[14px] color-gray font-medium">{product?.product_variation?.classify}</p>
                    </div>

                    <div className="flex items-center space-x-4 mt-2 text-[15px] color-gray">
                        <div>
                            Quantity:
                            <InputNumber
                                className="w-[60px] text-center ml-5"
                                min={1}
                                max={10}
                                defaultValue={product.quantity}
                                type="number"
                                onChange={(value: any) => onChange(product.id, value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4">
                        <Button icon={<HeartOutlined />} onClick={() => postWishlist(product.id)} />
                        <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCart(product.id)} />
                    </div>
                </div>
            </div>
            <input
                onChange={handleSelectCart}
                id="default-checkbox"
                type="checkbox"
                value={product.id}
                name="123"
                className="w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer"
            />
        </div>
    );
};

export default CartItem;
