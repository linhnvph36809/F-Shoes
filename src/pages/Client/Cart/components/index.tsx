import { Button, InputNumber } from 'antd';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';

import useCart from '../../../../hooks/useCart';
import useWishlist from '../../../../hooks/useWishlist';
import { formatPrice } from '../../../../utils';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';

const CartItem = ({ product, handleDeleteCart, setCartId, refetch }: any) => {
    const { putCart } = useCart();
    const { postWishlist } = useWishlist();
    const { refetch: refetchWishlist } = useQueryConfig(
        'user-profile',
        'api/auth/me?include=profile,favoriteProducts&times=user',
    );
    const [cartQty, setCartQty] = useState<number>(0);
    useEffect(() => {
        if (product?.quantity) {
            setCartQty(product?.quantity);
        }
    }, [product]);
    const onChange = (value: any) => {
        if (!value || +value === product.quantity ) {
            
        }else {
            setCartQty(value);
            
        }
    };
    const onChangeQuantity = (qty: any) => {
        if (!qty || +qty === product.quantity) {
            setCartQty(product?.quantity);
        }else if(+qty > 10){
            setCartQty(10);
            putCart(product.id, {
                quantity: 10,
            });
            refetch();
        } 
         else {
            setCartQty(qty);
            putCart(product.id, {
                quantity: qty,
            });
            refetch();
        }
    };
    const handleAddFavourite = (id: number) => {
        postWishlist(id);
        refetchWishlist();
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
        <>
            {product?.quantity ? (
                <div className="flex items-center justify-between gap-x-5 border-b mb-8">
                    <div className="flex gap-x-5 flex-col lg:flex-row items-start pb-4 mb-4 max-w-[733px]">
                        <img
                            src={
                                product?.product?.image_url
                                    ? product.product?.image_url
                                    : product?.product_variation?.image_url
                            }
                            alt="Product"
                            className="w-60 h-60 object-cover mb-4 lg:mb-0 lg:mr-4"
                        />
                        <div className="flex-grow mb-4 lg:mb-0">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-[15px] font-semibold">
                                    {product?.product?.name
                                        ? product.product.name
                                        : product?.product_variation?.product?.name}
                                </h3>
                                <div className="text-[15px] font-bold">{product?.price}</div>
                            </div>
                            <p className="color-gray text-[15px]">{product?.description}</p>
                            <p className="color-gray text-[15px]">{product?.color}</p>
                            {product?.product_variation_id ? (
                                <div>
                                    <p className="text-[14px] color-gray font-medium my-3">
                                        {product?.product_variation?.values?.map((value: any, index: number) => (
                                            <p key={index} className="color-gray text-[13px] font-medium">
                                                {value.attribute} : {value.values}
                                            </p>
                                        ))}
                                    </p>
                                </div>
                            ) : (
                                ''
                            )}

                            <div className="flex items-center space-x-4 mt-2 text-[15px] color-gray">
                                <div>
                                    {<FormattedMessage id="body.Detail.Quantity" />}:
                                    <InputNumber
                                        className="w-[60px] text-center ml-5"
                                        min={1}
                                        max={10}
                                        value={cartQty}
                                        defaultValue={product.quantity}
                                        type="number"
                                        onBlur={(e) => onChangeQuantity(e.target.value)}
                                        onChange={(e) => onChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-4">
                                <Button
                                    icon={<HeartOutlined />}
                                    onClick={() =>
                                        handleAddFavourite(
                                            product?.product_id || product?.product_variation?.product?.id,
                                        )
                                    }
                                />
                                <Button icon={<DeleteOutlined />} onClick={() => handleDeleteCart(product.id)} />
                            </div>
                        </div>
                    </div>

                    {product?.product_variation ? (
                        product.product_variation.sale_price ? (
                            <div className="text-[16px] font-medium flex items-center gap-x-3">
                                <p className="color-gray text-[14px] font-normal line-through">
                                    {formatPrice(product.product_variation.price)}đ
                                </p>
                                <p>{formatPrice(product.product_variation?.sale_price)}đ</p>
                            </div>
                        ) : (
                            <div className="text-[16px] font-medium flex items-center gap-x-3">
                                <p>{formatPrice(product.product_variation?.price)}đ</p>
                            </div>
                        )
                    ) : product?.product?.sale_price ? (
                        <div className="text-[16px] font-medium flex items-center gap-x-3">
                            <p className="color-gray text-[14px] font-normal line-through">
                                {formatPrice(product.product.price)}đ
                            </p>
                            <p>{formatPrice(product.product?.sale_price)}đ</p>
                        </div>
                    ) : (
                        <div className="text-[16px] font-medium flex items-center gap-x-3">
                            <p>{formatPrice(product.product?.price)}đ</p>
                        </div>
                    )}

                    <input
                        onChange={handleSelectCart}
                        id="default-checkbox"
                        type="checkbox"
                        value={product.id}
                        name="123"
                        className="w-[20px] h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer"
                    />
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default CartItem;
