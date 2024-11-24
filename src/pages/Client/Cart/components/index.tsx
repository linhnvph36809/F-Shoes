import { Button, InputNumber } from 'antd';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';

import useCart from '../../../../hooks/useCart';
import useWishlist from '../../../../hooks/useWishlist';
import { useContextGlobal } from '../../../../contexts';

const CartItem = ({ product, handleDeleteCart, handeGetAllCart }: any) => {
    const { putCart } = useCart();
    const { postWishlist } = useWishlist();
    const { user } = useContextGlobal();

    const onChange = (id: string | number, value: any) => {
        putCart(id, {
            quantity: +value,
        });
        handeGetAllCart();
    };

    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center border-b pb-4 mb-4 max-w-[733px]">
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
                {/* Wrap the name and price in a flex container */}
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[15px] font-semibold">
                        {product?.product?.name ? product.product.name : product?.product_variation?.name}
                    </h3>
                    <div className="text-[15px] font-bold">{product?.price}</div>
                </div>
                <p className="color-gray text-[15px]">{product?.description}</p>
                <p className="color-gray text-[15px]">{product?.color}</p>
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
                    <Button
                        icon={<HeartOutlined />}
                        onClick={() =>
                            postWishlist({
                                product_id: product?.product?.id
                                    ? product.product.id
                                    : product?.product_variation?.product.id,
                                user_id: user?.id,
                            })
                        }
                    />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCart(product.id)} />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
