import { Form, Input, Select, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useMemo, useState } from 'react';

import Heading from '../../components/Heading';
import ButtonComponent from '../../../Client/Authtication/components/Button';
import useUser from '../../../../hooks/useUser';
import useProduct from '../../../../hooks/useProduct';
import useDelivery from '../../../../hooks/useDelivery';
import useOrder from '../../../../hooks/useOrder';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import { formatPrice } from '../../../../utils';

const Addorder = () => {
    const { products } = useProduct();
    const { users } = useUser();
    const { postOrder, loading } = useOrder();
    const [productSelected, setProductSelected] = useState<any>([]);
    const { provinces, districts, fee, wards, getAllWard, getAllDistrict, getFee } = useDelivery();
    const [province, setProvince] = useState<any>('');
    const [districtId, setDistrictId] = useState<number | null>(null);
    const [wardCode, setWardCode] = useState<string | null>(null);
    const [listQuantity, setListQuantity] = useState<number[] | string[]>([]);
    const [variants, setVariants] = useState<any>([]);

    const handlerChangeQuantity = (index: number, value: string | number) => {
        setListQuantity((preValue: any) => {
            preValue[index] = +value;
            return [...preValue];
        });
    };

    const handlerChangeVariant = (index: number, id: string | number) => {
        const variant = productSelected[index]?.variations?.find((variation: any) => variation.id == id);

        setVariants((preValue: any) => {
            preValue[index] = variant;
            return [...preValue];
        });
    };

    const onFinish = (value: any) => {
        const order_details = productSelected.map((product: any, index: number) => {
            const variant = product?.variations?.find((variation: any) => variation.id == value[`variant-${index}`]);
            if (variant) {
                return {
                    product_variation_id: variant.id,
                    product_id: product.id,
                    quantity: value[`quantity-${index}`],
                    price: variant.price,
                    total_amount: +variant.price * +value[`quantity-${index}`],
                };
            } else {
                return {
                    product_id: product.id,
                    quantity: value[`quantity-${index}`],
                    price: product.price,
                    total_amount: +product.price * value[`quantity-${index}`],
                };
            }
        });

        let shipping_method;
        if (value.shipping_method == 1) {
            shipping_method = 'Express Shipping';
        } else if (value.shipping_method == 2) {
            shipping_method = 'Standard shipping';
        } else if (value.shipping_method == 3) {
            shipping_method = 'Saving shipping';
        }

        const total_amount =
            order_details.reduce((total: number, amount: any) => total + amount.total_amount, 0) + fee?.total || 0;

        const newValues = {
            user_id: value.user_id,
            total_amount,
            payment_method: value.payment_method,
            payment_status: '1',
            shipping_method,
            phone: value.phone,
            shipping_cost: fee?.total || '',
            tax_amount: null,
            amount_collected: value.amount_collected,
            receiver_full_name: value.receiver_full_name,
            address: `${value.address} - ${wards.find((ward: any) => ward.WardCode == wardCode)?.WardName} - ${districts.find((district: any) => district.DistrictID == districtId)?.DistrictName
                } - ${province}`,
            city: province,
            country: 'Viet Nam',
            voucher_id: null,
            status: '1',
            note: value.note,
            order_details,
        };

        postOrder(newValues);
    };

    const handleCityChange = (cityId: number) => {
        getAllDistrict(cityId);
        setProvince(provinces.find((province: any) => province.ProvinceID == cityId).ProvinceName);
    };

    const handleDistrictChange = (districtId: number) => {
        getAllWard(districtId);
        setDistrictId(districtId);
    };

    const handleWardChange = (code: string) => {
        setWardCode(code);
    };

    const handleShippingChange = (_: string | number) => {
        if (districtId && wardCode) {
            const values = {
                service_type_id: 2,
                insurance_value: 100000,
                coupon: null,
                from_district_id: 1542,
                to_district_id: districtId,
                to_ward_code: wardCode,
                height: 15,
                length: 15,
                weight: 1000,
                width: 15,
            };
            getFee(values);
        } else {
            alert('Please select a code');
        }
    };

    const handleProductChange = (ids: number[]) => {
        if (ids.length) {
            setProductSelected(products.filter((product: any) => ids.includes(product.id)));
        } else {
            setProductSelected([]);
            setListQuantity([]);
        }
    };

    const totalAmount = useMemo(() => {
        return variants.reduce((total: any, item: any, index: number) => {
            const quantity = (listQuantity[index] as number) || 0;
            const price = parseFloat(item.price);
            return total + Math.round(price * quantity);
        }, 0);
    }, [variants, listQuantity, fee]);

    return (
        <div style={{ fontSize: '20px' }}>
            <Form onFinish={onFinish} layout="vertical" style={{ fontSize: '18px' }}>
                <Heading>Add Order</Heading>

                {/* Select User */}
                <Form.Item
                    label="Select User"
                    name="user_id"
                    rules={[{ required: true, message: 'Please select a user' }]}
                >
                    <Select
                        placeholder="Select User"
                        optionFilterProp="name"
                        allowClear
                        options={users}
                        fieldNames={{ label: 'email', value: 'id' }}
                    />
                </Form.Item>

                {/* Select Product */}
                <Form.Item
                    label="Select Product"
                    name="product"
                    rules={[{ required: true, message: 'Please select products' }]}
                >
                    <Select
                        mode="multiple"
                        onChange={handleProductChange}
                        placeholder="Select Products"
                        optionFilterProp="name"
                        allowClear
                        options={products}
                        fieldNames={{ label: 'name', value: 'id' }}
                    />
                </Form.Item>

                {/* Display selected variants and quantities */}
                {productSelected.map((product: any, index: number) => (
                    <div key={index} className="ml-20 mb-10">
                        <Form.Item
                            className="mb-5"
                            label={`Select Variant :  ${product.name}`}
                            name={`variant-${index}`}
                            rules={[{ required: true, message: 'Please select a variant' }]}
                        >
                            <Select
                                placeholder="Select Variant"
                                optionFilterProp="name"
                                options={product.variations}
                                fieldNames={{ label: 'slug', value: 'id' }}
                                onChange={(value) => handlerChangeVariant(index, value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Quantity"
                            name={`quantity-${index}`}
                            rules={[
                                { required: true, message: 'Please enter a quantity' },
                                {
                                    validator: (_, value) => {
                                        if (value && variants[index]?.stock_qty && +value > variants[index].stock_qty) {
                                            return Promise.reject(
                                                `Quantity cannot be more than ${variants[index]?.stock_qty}`,
                                            );
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}
                        >
                            <Input
                                placeholder="Quantity"
                                type="number"
                                value={listQuantity[index]}
                                onChange={(e) => handlerChangeQuantity(index, e.target.value)}
                            />
                        </Form.Item>
                    </div>
                ))}

                <Form.Item
                    label="Amount Collected"
                    name="amount_collected"
                    initialValue={0}
                    rules={[
                        {
                            validator: (_, value) => {
                                if (+value < 0) {
                                    return Promise.reject(new Error('Amount must be greater than or equal to 0'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <Input placeholder="Enter Amount Collected" type="number" />
                </Form.Item>

                <Form.Item
                    label="Recipient name"
                    name="receiver_full_name"
                    rules={[{ required: true, message: 'Please enter recipient name' }]}
                >
                    <Input placeholder="Enter recipient name" />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>

                <Form.Item
                    label="Select Province"
                    name="province"
                    rules={[{ required: true, message: 'Please select a province' }]}
                >
                    <Select
                        onChange={handleCityChange}
                        placeholder="Select Province"
                        optionFilterProp="ProvinceName"
                        options={provinces}
                        fieldNames={{ label: 'ProvinceName', value: 'ProvinceID' }}
                    />
                </Form.Item>

                <Form.Item
                    label="Select District"
                    name="district"
                    rules={[{ required: true, message: 'Please select a district' }]}
                >
                    <Select
                        placeholder="Select District"
                        optionFilterProp="ProvinceName"
                        options={districts}
                        fieldNames={{ label: 'DistrictName', value: 'DistrictID' }}
                        onChange={handleDistrictChange}
                    />
                </Form.Item>

                <Form.Item
                    label="Select Ward"
                    name="ward"
                    rules={[{ required: true, message: 'Please select a ward' }]}
                >
                    <Select
                        placeholder="Select Ward"
                        optionFilterProp="ProvinceName"
                        options={wards}
                        onChange={handleWardChange}
                        fieldNames={{ label: 'WardName', value: 'WardCode' }}
                    />
                </Form.Item>

                <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter address' }]}>
                    <TextArea placeholder="Enter address" />
                </Form.Item>

                <Form.Item
                    label="Payment method"
                    name="payment_method"
                    rules={[{ required: true, message: 'Please select a payment method' }]}
                >
                    <Radio.Group>
                        <Radio value="COD">Cash on Delivery (COD)</Radio>
                        <Radio value="VNPAY">VNPAY</Radio>
                        <Radio value="ZALOPAY">ZALOPAY</Radio>
                        <Radio value="MOMO">MOMO</Radio>
                        <Radio value="PAYPAL">PAYPAL</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="Shipping method"
                    name="shipping_method"
                    rules={[{ required: true, message: 'Please select a shipping method' }]}
                >
                    <Radio.Group onChange={(e) => handleShippingChange(e.target.value)} disabled={!wardCode}>
                        <Radio value={1}>Express Shipping</Radio>
                        <Radio value={2}>Standard shipping</Radio>
                        <Radio value={3}>Saving shipping</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Note" name="note">
                    <TextArea placeholder="Enter note" />
                </Form.Item>

                {fee.service_fee && totalAmount && (
                    <div className="text-end my-10">
                        <p className="font-medium text-[16px] color-gray">
                            Shipping Fee: {formatPrice(fee.service_fee)} VND
                        </p>
                        <p className="font-medium text-[16px] color-gray">Product: {formatPrice(totalAmount)} VND</p>
                        <h1 className="font-medium text-[20px] text-red-500">
                            Total: {formatPrice(totalAmount + +fee.service_fee)} VND
                        </h1>
                    </div>
                )}

                <Form.Item className="text-end">
                    <ButtonComponent htmlType="submit">{loading ? <LoadingSmall /> : 'Submit'}</ButtonComponent>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Addorder;
