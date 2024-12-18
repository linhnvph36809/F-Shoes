import { Form, Input, Select, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useMemo, useState } from 'react';
import Heading from '../../components/Heading';
import useUser from '../../../../hooks/useUser';
import useDelivery from '../../../../hooks/useDelivery';
import useOrder from '../../../../hooks/useOrder';
import { formatPrice } from '../../../../utils';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import SelectPrimary from '../../components/Forms/SelectPrimary';
import InputPrimary from '../../components/Forms/InputPrimary';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import ButtonBack from '../../components/ButtonBack';
import { FormattedMessage, useIntl } from 'react-intl';

const Addorder = () => {
    const intl = useIntl();
    const { data } = useQueryConfig(
        `all-product-admin`,
        `/api/product?per_page=8&page=1&include=categories,sale_price,variations`,
    );

    const { refetch } = useQueryConfig('order-admin', '/api/orders');

    const products = data?.data.data;
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
            payment_method: 'cash_on_delivery',
            payment_status: 'not_yet_paid',
            shipping_method,
            phone: value.phone,
            shipping_cost: fee?.total || '',
            tax_amount: null,
            amount_collected: value.amount_collected || 0,
            receiver_email: value.receiver_email,
            receiver_full_name: value.receiver_full_name,
            address: `${value.address} - ${wards.find((ward: any) => ward.WardCode == wardCode)?.WardName} - ${
                districts.find((district: any) => district.DistrictID == districtId)?.DistrictName
            } - ${province}`,
            city: province,
            country: 'Viet Nam',
            voucher_id: null,
            status: 1,
            note: value.note,
            order_details,
            cart_ids: [],
        };

        postOrder(newValues);
        refetch();
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
                <ButtonBack to="/admin/orderlist" />
                <Heading>
                    <FormattedMessage id="admin.addOrder" />
                </Heading>

                {/* Select User */}
                <SelectPrimary
                    label={<FormattedMessage id="admin.selectUser" />}
                    name="user_id"
                    rules={[{ required: true, message: <FormattedMessage id="admin.pleaseSelectUser" /> }]}
                    placeholder={intl.formatMessage({ id: 'admin.selectUser' })}
                    optionFilterProp="email"
                    allowClear
                    options={users}
                    fieldNames={{ label: 'email', value: 'id' }}
                ></SelectPrimary>

                <SelectPrimary
                    label={<FormattedMessage id="admin.selectProduct" />}
                    name="product"
                    rules={[{ required: true, message: <FormattedMessage id="admin.pleaseSelectProducts" /> }]}
                    mode="multiple"
                    onChange={handleProductChange}
                    placeholder={intl.formatMessage({ id: 'admin.selectProduct' })}
                    optionFilterProp="name"
                    allowClear
                    options={products}
                    fieldNames={{ label: 'name', value: 'id' }}
                ></SelectPrimary>

                {/* Display selected variants and quantities */}
                {productSelected.map((product: any, index: number) => (
                    <div key={index} className="ml-20 mb-10">
                        <Form.Item
                            className="mb-5 font-medium"
                            label={
                                <>
                                    <FormattedMessage id="admin.Select_Variant" />: {product.name}
                                </>
                            }
                            name={`variant-${index}`}
                            rules={[
                                { required: true, message: <FormattedMessage id="admin.Please_select_a_variant" /> },
                            ]}
                        >
                            <Select
                                placeholder={intl.formatMessage({ id: 'admin.Select_Variant' })}
                                optionFilterProp="name"
                                options={product.variations}
                                fieldNames={{ label: 'slug', value: 'id' }}
                                onChange={(value) => handlerChangeVariant(index, value)}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<FormattedMessage id="body.Detail.Quantity" />}
                            className="font-medium"
                            name={`quantity-${index}`}
                            rules={[
                                { required: true, message: <FormattedMessage id="admin.Please_enter_a_quantity" /> },
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
                                placeholder={intl.formatMessage({ id: 'body.Detail.Quantity' })}
                                type="number"
                                value={listQuantity[index]}
                                onChange={(e) => handlerChangeQuantity(index, e.target.value)}
                            />
                        </Form.Item>
                    </div>
                ))}

                <InputPrimary
                    label={<FormattedMessage id="admin.amountCollected" />}
                    name="amount_collected"
                    placeholder={intl.formatMessage({ id: 'admin.pleaseEnterAmount' })}
                    type="number"
                    initialValue={0}
                    rules={[
                        {
                            validator: (_: any, value: number) => {
                                if (+value < 0) {
                                    return Promise.reject(new Error(intl.formatMessage({ id: 'Error.Amount_must' })));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                ></InputPrimary>

                <InputPrimary
                    label={<FormattedMessage id="receiver_name" />}
                    name="receiver_full_name"
                    rules={[{ required: true, message: <FormattedMessage id="receiver_name_message" /> }]}
                    placeholder={intl.formatMessage({ id: 'receiver_name' })}
                ></InputPrimary>
                <InputPrimary
                    label={<FormattedMessage id="receiver_email" />}
                    name="receiver_email"
                    rules={[{ required: true, message: <FormattedMessage id="receiver_email_message" /> }]}
                    placeholder={intl.formatMessage({ id: 'receiver_email' })}
                    type="email"
                ></InputPrimary>

                <InputPrimary
                    label={<FormattedMessage id="phone" />}
                    name="phone"
                    rules={[{ required: true, message: <FormattedMessage id="phone_message" /> }]}
                    placeholder={intl.formatMessage({ id: 'phone' })}
                ></InputPrimary>

                <SelectPrimary
                    label={<FormattedMessage id="city" />}
                    name="province"
                    rules={[{ required: true, message: <FormattedMessage id="city_message" /> }]}
                    onChange={handleCityChange}
                    placeholder={intl.formatMessage({ id: 'city' })}
                    optionFilterProp="ProvinceName"
                    options={provinces}
                    fieldNames={{ label: 'ProvinceName', value: 'ProvinceID' }}
                ></SelectPrimary>

                <SelectPrimary
                    label={<FormattedMessage id="district" />}
                    name="district"
                    rules={[{ required: true, message: <FormattedMessage id="district_message" /> }]}
                    placeholder={intl.formatMessage({ id: 'district' })}
                    optionFilterProp="ProvinceName"
                    options={districts}
                    fieldNames={{ label: 'DistrictName', value: 'DistrictID' }}
                    onChange={handleDistrictChange}
                ></SelectPrimary>

                <SelectPrimary
                    label={<FormattedMessage id="ward" />}
                    name="ward"
                    rules={[{ required: true, message: <FormattedMessage id="ward_message" /> }]}
                    placeholder={intl.formatMessage({ id: 'ward' })}
                    optionFilterProp="ProvinceName"
                    options={wards}
                    onChange={handleWardChange}
                    fieldNames={{ label: 'WardName', value: 'WardCode' }}
                ></SelectPrimary>

                <Form.Item
                    label={<FormattedMessage id="address_placeholder" />}
                    className="font-medium"
                    name="address"
                    rules={[{ required: true, message: <FormattedMessage id="address_message" /> }]}
                >
                    <TextArea placeholder={intl.formatMessage({ id: 'address_placeholder' })} />
                </Form.Item>

                <Form.Item
                    label={<FormattedMessage id="payment_method" />}
                    name="payment_method"
                    className="font-medium"
                    rules={[{ required: true, message: <FormattedMessage id="mess.payment_method" /> }]}
                >
                    <Radio.Group>
                        <Radio value="COD">
                            <FormattedMessage id="title.Payment.CASH ON DELIVERY" /> (COD)
                        </Radio>
                        <Radio value="VNPAY">VNPAY</Radio>
                        <Radio value="MOMO">MOMO</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label={<FormattedMessage id="shipping_method" />}
                    name="shipping_method"
                    className="font-medium"
                    rules={[{ required: true, message: <FormattedMessage id="shipping_method_message" /> }]}
                >
                    <Radio.Group onChange={(e) => handleShippingChange(e.target.value)} disabled={!wardCode}>
                        <Radio value={1}>
                            <FormattedMessage id="shipping_express" />
                        </Radio>
                        <Radio value={2}>
                            <FormattedMessage id="shipping_standard" />
                        </Radio>
                        <Radio value={3}>
                            <FormattedMessage id="shipping_saving" />
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label={<FormattedMessage id="note" />} name="note" className="font-medium">
                    <TextArea placeholder={intl.formatMessage({ id: 'note_placeholder' })} rows={9} />
                </Form.Item>

                {fee.service_fee && totalAmount ? (
                    <div className="text-end my-10">
                        <p className="font-medium text-[16px] color-gray">
                            <FormattedMessage id="box.Cart.Subtotal" />: {formatPrice(totalAmount)} đ{' '}
                        </p>
                        <p className="font-medium text-[16px] color-gray">
                            <FormattedMessage id="shipping" />: {formatPrice(fee.service_fee)} đ
                        </p>
                        <h1 className="font-medium text-[20px] text-red-500">
                            <FormattedMessage id="box.Cart.Total" />: {formatPrice(totalAmount + +fee.service_fee)} đ
                        </h1>
                    </div>
                ) : (
                    ''
                )}

                <Form.Item className="text-end">
                    <ButtonSubmit width="w-[180px]" loading={loading} />
                </Form.Item>
            </Form>
        </div>
    );
};

export default Addorder;
