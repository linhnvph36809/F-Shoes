import { Form, Input, Radio, ConfigProvider, Button, Collapse } from 'antd';
const { Panel } = Collapse;
import TextArea from 'antd/es/input/TextArea';
import { useMemo, useState } from 'react';
import Heading from '../../components/Heading';
import useDelivery from '../../../../hooks/useDelivery';
import useOrder from '../../../../hooks/useOrder';
import { formatPrice, handleChangeMessage } from '../../../../utils';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import SelectPrimary from '../../components/Forms/SelectPrimary';
import InputPrimary from '../../components/Forms/InputPrimary';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import ButtonBack from '../../components/ButtonBack';
import { FormattedMessage, useIntl } from 'react-intl';
import useVoucher from '../../../../hooks/useVoucher';
import { showMessageAdmin, showMessageClient } from '../../../../utils/messages';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import ModalAddOrder from './ModalAddOrder';
import { useContextGlobal } from '../../../../contexts';
import { FREE_SHIP } from '../../../../constants';

const Addorder = () => {
    const intl = useIntl();
    const { data } = useQueryConfig(
        `all-product-admin`,
        `/api/product?per_page=8&page=1&include=categories,sale_price,variations`,
    );

    const { refetch } = useQueryConfig('order-admin', '/api/orders');

    const products = data?.data.data;
    const { loading: loadingVoucher, voucher, postVoucher, setVoucher } = useVoucher();
    const { data: dataListUser } = useQueryConfig(['users', 'add/order/list/users'], '/api/user');
    const users = dataListUser?.data?.users?.data || [];
    const { postOrder, loading } = useOrder();
    const [productSelected, setProductSelected] = useState<any>([]);
    const { provinces, districts, fee, wards, getAllWard, getAllDistrict, getFee } = useDelivery();
    const [province, setProvince] = useState<any>('');
    const [districtId, setDistrictId] = useState<number | null>(null);
    const [wardCode, setWardCode] = useState<string | null>(null);
    const [code, setCode] = useState<string>('');
    const [orderDetail, setOrderDetail] = useState<any>([]);
    const { locale } = useContextGlobal();

    const handleProductChange = (ids: number[]) => {
        if (ids.length) {
            setProductSelected(products.filter((product: any) => ids.includes(product.id)));
        } else {
            setProductSelected([]);
        }
    };

    const handleGetVoucher = () => {
        if (code) {
            postVoucher(code);
            setCode('');
        } else {
            showMessageClient('Please enter code', '', 'warning');
        }
    };

    const handleTotalPrice = useMemo(() => {
        return orderDetail?.reduce((sum: any, curr: any) => {
            if (curr?.variant?.id) {
                return sum + (curr.variant.sale_price || curr.variant.price) * +curr.quantity;
            } else {
                return sum + (curr.sale_price || curr.price) * +curr.quantity;
            }
        }, 0);
    }, [orderDetail]);

    const totalAmount = useMemo(() => {
        let sum = 0;
        if (handleTotalPrice >= FREE_SHIP) {
            sum = handleTotalPrice;
        } else {
            sum = handleTotalPrice + (fee.total || 0);
        }
        if (voucher?.min_total_amount > sum) {
            showMessageClient(
                handleChangeMessage(
                    locale,
                    `The order must be larger than ${formatPrice(voucher.min_total_amount)}đ`,
                    `Đơn hàng phải lớn hơn ${formatPrice(voucher.min_total_amount)}đ`,
                ),
                '',
                'warning',
            );
            setVoucher([]);
            return sum;
        } else if (voucher.discount && voucher?.type && voucher?.type === 'fixed') {
            if (sum - +voucher.discount > 0) {
                return sum - +voucher.discount;
            }
            return 0;
        } else if (voucher?.type && voucher?.type === 'percentage') {
            if (sum - (sum * +voucher.discount) / 100 > 0) {
                return sum - (sum * +voucher.discount) / 100;
            }
            return 0;
        } else {
            return sum;
        }
    }, [handleTotalPrice, fee, voucher]);

    const onFinish = (value: any) => {
        if (!orderDetail?.length) {
            showMessageAdmin(
                handleChangeMessage(locale, 'Please select a product!', 'Vui lòng chọn sản phẩm!'),
                '',
                'warning',
            );
            return;
        }
        const order_details = orderDetail.map((product: any, index: number) => {
            if (product?.variant?.id) {
                return {
                    product_variation_id: product?.variant?.id,
                    product_id: null,
                    quantity: +product.quantity,
                    price: +product?.variant?.price || +product?.variant?.sale_price,
                    total_amount: +product?.variant?.price * +product.quantity,
                };
            } else {
                return {
                    product_id: product.id,
                    quantity: +product.quantity,
                    price: +product?.price || +product?.sale_price,
                    total_amount: +product?.price * +product.quantity,
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

        const newValues = {
            user_id: value.user_id,
            total_amount: totalAmount,
            payment_method: 'cash_on_delivery',
            payment_status: 'not_yet_paid',
            shipping_method,
            phone: value.phone,
            shipping_cost: fee?.total || '',
            tax_amount: null,
            amount_collected: value.amount_collected || 0,
            receiver_email: value.receiver_email,
            receiver_full_name: value.receiver_full_name,
            address: `${value.address} - ${wards.find((ward: any) => ward.WardCode == wardCode)?.WardName} - ${districts.find((district: any) => district.DistrictID == districtId)?.DistrictName
                } - ${province}`,
            city: province,
            country: 'Viet Nam',
            voucher_id: voucher?.id ? voucher.id : null,
            status: 1,
            note: value.note,
            order_details,
            cart_ids: [],
        };
        console.log(newValues);

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

                <Collapse defaultActiveKey={['1']} accordion className="mb-10 px-5">
                    {productSelected.map((product: any, index: number) => {
                        return (
                            <Panel
                                header={
                                    <div className="flex items-start justify-between">
                                        {product.name}
                                        <img src={product.image_url} alt="" className="w-[30px]" />
                                    </div>
                                }
                                key={index}
                            >
                                <div>
                                    <ModalAddOrder
                                        initialValues={product}
                                        index={index}
                                        setOrderDetail={setOrderDetail}
                                    />
                                    <p className="border-b py-5 font-medium">Product Name : {product?.name}</p>
                                    <p className="border-b py-5 font-medium">
                                        Price : {formatPrice(product?.price) || formatPrice(product?.sale_price)}đ
                                    </p>
                                    <p className="border-b py-5 font-medium">
                                        Description:{' '}
                                        <span dangerouslySetInnerHTML={{ __html: product?.short_description }}></span>{' '}
                                    </p>
                                    <p className="border-b py-5 font-medium">Stock quantity : {product?.stock_qty}</p>
                                    <p className="border-b py-5 font-medium">
                                        Image: <img src={product?.image_url} className="w-[80px]" />
                                    </p>
                                </div>
                            </Panel>
                        );
                    })}
                </Collapse>

                <InputPrimary
                    label={<FormattedMessage id="admin.amountCollected" />}
                    name="amount_collected"
                    placeholder={intl.formatMessage({ id: 'admin.pleaseEnterAmount' })}
                    type="number"
                    initialValue={0}
                    rules={[
                        {
                            validator: (_: any, value: number) => {
                                if (value > 0) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Vui lòng nhập lớn hơn 0!');
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
                    rules={[
                        { required: true, message: <FormattedMessage id="receiver_email_message" /> },
                        {
                            type: 'email',
                            message: <FormattedMessage id="receiver_email_invalid" />,
                        },
                    ]}
                    placeholder={intl.formatMessage({ id: 'receiver_email' })}
                    type="email"
                ></InputPrimary>

                <InputPrimary
                    label={<FormattedMessage id="phone" />}
                    name="phone"
                    type="number"
                    rules={[
                        { required: true, message: <FormattedMessage id="phone_message" /> },
                        {
                            min: 10,
                            message: 'Số điện thoại không hợp lệ',
                        },
                    ]}
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
                    showSearch
                    fieldNames={{ label: 'ProvinceName', value: 'ProvinceID' }}
                ></SelectPrimary>

                <SelectPrimary
                    label={<FormattedMessage id="district" />}
                    name="district"
                    rules={[{ required: true, message: <FormattedMessage id="district_message" /> }]}
                    placeholder={intl.formatMessage({ id: 'district' })}
                    optionFilterProp="DistrictName"
                    options={districts}
                    showSearch
                    fieldNames={{ label: 'DistrictName', value: 'DistrictID' }}
                    onChange={handleDistrictChange}
                ></SelectPrimary>

                <SelectPrimary
                    label={<FormattedMessage id="ward" />}
                    name="ward"
                    rules={[{ required: true, message: <FormattedMessage id="ward_message" /> }]}
                    placeholder={intl.formatMessage({ id: 'ward' })}
                    optionFilterProp="WardName"
                    options={wards}
                    showSearch
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
                        <Radio value={2}>
                            <FormattedMessage id="shipping_standard" />
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label={<FormattedMessage id="note" />} name="note" className="font-medium">
                    <TextArea placeholder={intl.formatMessage({ id: 'note_placeholder' })} rows={9} />
                </Form.Item>

                <div className="flex items-center justify-start gap-x-4 mb-10">
                    <div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Input: {
                                        hoverBorderColor: '#ccc',
                                        activeBorderColor: '#111111',
                                        activeShadow: '0 0 1px #111111',
                                    },
                                },
                            }}
                        >
                            <Input
                                value={code}
                                placeholder={intl.formatMessage({ id: 'Voucher_code' })}
                                className="w-[150px]"
                                onChange={(e: any) => setCode(e.target.value)}
                            />
                        </ConfigProvider>
                    </div>
                    <div>
                        <Button className="transition-global" onClick={handleGetVoucher}>
                            {loadingVoucher ? <LoadingSmall /> : <FormattedMessage id="Get" />}
                        </Button>
                    </div>
                </div>
                {fee.service_fee ? (
                    <div className="text-end my-10">
                        <p className="font-medium text-[16px] color-gray">
                            <FormattedMessage id="box.Cart.Subtotal" />: {formatPrice(totalAmount)}đ
                        </p>
                        <p className="font-medium text-[16px] color-gray">
                            <FormattedMessage id="shipping" />: {formatPrice(fee.service_fee)} đ
                        </p>
                        {voucher.discount ? (
                            <div className="flex justify-end items-center gap-x-2">
                                <p className="color-primary font-medium">Voucher :</p>
                                <p className="color-primary font-medium">
                                    -
                                    {formatPrice(
                                        voucher.type === 'fixed'
                                            ? voucher.discount
                                            : ((handleTotalPrice >= FREE_SHIP
                                                ? handleTotalPrice
                                                : handleTotalPrice + (fee?.total || 0)) *
                                                +voucher.discount) /
                                            100,
                                    )}
                                    đ
                                </p>
                            </div>
                        ) : (
                            ''
                        )}
                        <h1 className="font-medium text-[20px] text-red-500">
                            <FormattedMessage id="box.Cart.Total" />: {formatPrice(totalAmount)} đ
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
