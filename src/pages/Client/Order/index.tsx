import { useEffect, useMemo, useState } from 'react';
import {
    Form,
    Divider,
    Typography,
    Row,
    Col,
    Card,
    Progress,
    Radio,
    Select,
    ConfigProvider,
    Button,
    Input,
} from 'antd';
import { Navigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

import InputPrimary from '../../../components/Input';
import useDelivery from '../../../hooks/useDelivery';
import { useContextGlobal } from '../../../contexts';
import ButtonPrimary from '../../../components/Button';
import useVoucher from '../../../hooks/useVoucher';
import LoadingSmall from '../../../components/Loading/LoadingSmall';
import { formatPrice, handleChangeMessage } from '../../../utils';
import useOnlinePayment from '../../../hooks/useOnlinePayment';
import LoadingPage from '../../../components/Loading/LoadingPage';
import useCookiesConfig from '../../../hooks/useCookiesConfig';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { showMessageActive, showMessageClient } from '../../../utils/messages';
import { FREE_SHIP } from '../../../constants';
import { useForm } from 'antd/es/form/Form';
import { FormattedMessage, useIntl } from 'react-intl';

const { Title, Text } = Typography;

const Order = () => {
    const intl = useIntl();
    const [form] = useForm();
    const { provinces, districts, fee, wards, getAllWard, getAllDistrict, getFee } = useDelivery();
    const orderId = JSON.parse(localStorage.getItem('orderId') || '[]');
    const { data, isFetching: loadingCart } = useQueryConfig('cart', '/api/cart');

    const carts = data?.data ? data.data.filter((cart: any) => orderId.includes(cart.id)) : null;

    const { loading: loadingVoucher, voucher, postVoucher, setVoucher } = useVoucher();
    const { loading: loadingCheckOut, postVNPAY, postOrder, postMomo } = useOnlinePayment();
    const { user, locale } = useContextGlobal();
    const { handleSetCookie } = useCookiesConfig('order');

    const [province, setProvince] = useState<any>('');
    const [districtId, setDistrictId] = useState<number | null>(null);
    const [wardCode, setWardCode] = useState<string | null>(null);
    const [code, setCode] = useState<string>('');

    const handleCityChange = (cityId: number) => {
        getAllDistrict(cityId);
        setProvince(provinces.find((province: any) => province.ProvinceID == cityId).ProvinceName);
        form.setFieldsValue({
            shipping_method: null,
            ward: null,
            district: null,
        });
    };

    const handleDistrictChange = (districtId: number) => {
        getAllWard(districtId);
        setDistrictId(districtId);
        form.setFieldsValue({
            ward: null,
            shipping_method: null
        });

    };

    const handleWardChange = (code: string) => {
        setWardCode(code);
        form.setFieldValue('shipping_method', null);
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
        return carts?.reduce((sum: any, curr: any) => {
            if (curr?.product?.price) {
                return sum + (curr.product.sale_price || curr.product.price) * curr.quantity;
            } else if (curr?.product_variation?.price) {
                return sum + (curr.product_variation.sale_price || curr.product_variation.price) * curr.quantity;
            }
            return sum;
        }, 0);
    }, [carts, user]);

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
            showMessageClient('Please select a code', '', 'warning');
        }
    };

    const onFinish = async (value: any) => {
        const order_details = carts?.map((cart: any) => {
            if (cart?.product_variation) {
                return {
                    product_variation_id: cart.product_variation.id,
                    product_image: cart?.product_variation?.product?.image_url,
                    product_name: cart?.product_variation?.product?.name,
                    classify: cart?.product_variation?.classify,
                    product_id: null,
                    quantity: cart.quantity,
                    price: +cart.product_variation.sale_price || +cart.product_variation.price,
                    total_amount: +cart.product_variation.sale_price || +cart.product_variation.price * cart.quantity,
                    detail_item: JSON.stringify(
                        cart?.product_variation.values?.reduce(
                            (acc: Record<string, string>, item: { attribute: string; values: string }) => {
                                acc[item.attribute] = item.values;
                                return acc;
                            },
                            {},
                        ) || null,
                    ),
                };
            } else if (cart?.product) {
                return {
                    product_variation_id: null,
                    product_image: cart.product?.image_url,
                    product_name: cart.product.name,
                    classify: cart?.product?.classify,
                    product_id: cart.product.id,
                    quantity: cart.quantity,
                    price: +cart.product.sale_price || +cart.product.price,
                    total_amount: +cart.product.sale_price || +cart.product.price * cart.quantity,
                    detail_item: null,
                };
            }
        });

        const newValues = {
            user_id: user.id,
            total_amount: totalAmount,
            payment_method: value.payment_method,
            payment_status: 'not_yet_paid',
            shipping_method: 'Standard shipping',
            phone: value.phone,
            shipping_cost: handleTotalPrice >= FREE_SHIP ? '0' : fee?.total,
            tax_amount: null,
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
            amount_collected: value.payment_method !== 'cash on delivery' ? totalAmount : 0,
            cart_ids: orderId,
        };

        handleSetCookie(
            'order',
            {
                voucher_cost:
                    voucher.type == 'fixed'
                        ? voucher.discount
                        : ((handleTotalPrice >= FREE_SHIP ? handleTotalPrice : handleTotalPrice + (fee?.total || 0)) *
                            +voucher.discount) /
                        100,
                ...newValues,
            },
            new Date(Date.now() + 20 * 60 * 1000),
        );

        if (value.payment_method == 'cash_on_delivery') {
            postOrder({
                ...newValues,
                status: 2,
            });
        } else if (value.payment_method == 'vnpay') {
            showMessageActive(
                handleChangeMessage(
                    locale,
                    'When using the VNPAY payment method, you cannot cancel the order',
                    'Khi sử dụng phương thức thanh toán VNPAY bạn không thể hủy đơn hàng ',
                ),
                '',
                'warning',
                () => {
                    postVNPAY(
                        {
                            total: Math.round(totalAmount),
                            url: `${window.location.origin}/order-vnpay-complete`,
                        },
                        newValues,
                    );
                },
            );
        } else if (value.payment_method == 'momo') {
            showMessageActive(
                handleChangeMessage(
                    locale,
                    'When using the MOMO payment method, you cannot cancel the order',
                    'Khi sử dụng phương thức thanh toán MOMO bạn không thể hủy đơn hàng ',
                ),
                '',
                'warning',
                () => {
                    postMomo(
                        {
                            total: Math.round(totalAmount),
                            url: `${window.location.origin}/order-momo-complete`,
                        },
                        newValues,
                    );
                },
            );
        }
    };

    useEffect(() => {
        form.setFieldValue('receiver_full_name', user?.name);
        form.setFieldValue('receiver_email', user?.email);
    }, [user]);

    if (carts && !carts.length) {
        return <Navigate to="/" />;
    }

    return (
        <>
            {loadingCart ? (
                <LoadingPage />
            ) : (
                <Form layout="vertical" form={form} style={{ marginTop: '20px' }} onFinish={onFinish}>
                    <Row style={{ padding: '20px' }}>
                        <Col xs={24} md={12}>
                            <Card bordered={false}>
                                <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
                                    <Title level={1}>{<FormattedMessage id="Order.Delivery" />}</Title>
                                    <Title level={4}>
                                        {<FormattedMessage id="Order.Enter your name and address:" />}
                                    </Title>
                                    <Text type="secondary" className="mb-5 block">
                                        {
                                            <FormattedMessage id="Order.If you have a promo code, you will be able to input it after filling in your contact details." />
                                        }
                                    </Text>
                                    <Form.Item
                                        name="receiver_full_name"
                                        label={<FormattedMessage id="receiver_name" />}
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="receiver_name_message" />,
                                            },
                                        ]}
                                    >
                                        <InputPrimary
                                            placeholder={intl.formatMessage({ id: 'receiver_name_placeholder' })}
                                            margin="mb-0"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="receiver_email"
                                        label={<FormattedMessage id="receiver_email" />}
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="receiver_email_message" />,
                                            },
                                            {
                                                type: 'email',
                                                message: <FormattedMessage id="receiver_email_invalid" />,
                                            },
                                        ]}
                                    >
                                        <InputPrimary
                                            placeholder={intl.formatMessage({ id: 'receiver_email_placeholder' })}
                                            margin="mb-0"
                                            type="email"
                                        />
                                    </Form.Item>

                                    <Form.Item label={<FormattedMessage id="country" />}>
                                        <InputPrimary
                                            value="Vietnam"
                                            readOnly
                                            margin="mb-0"
                                            suffix={<span style={{ color: 'green' }}>●</span>}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={<FormattedMessage id="city" />}
                                        name="province"
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="city_message" />,
                                            },
                                        ]}
                                    >
                                        <Select
                                            onChange={handleCityChange}
                                            placeholder={intl.formatMessage({ id: 'city_placeholder' })}
                                            optionFilterProp="ProvinceName"
                                            options={provinces}
                                            className="w-full h-[56px] border-1 border-[#111111] focus:shadow font-medium focus:border-[#111111] hover:border-[#111111] rounded-[8px]"
                                            fieldNames={{ label: 'ProvinceName', value: 'ProvinceID' }}
                                            showSearch
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={<FormattedMessage id="district" />}
                                        name="district"
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="district_message" />,
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder={intl.formatMessage({ id: 'district_placeholder' })}
                                            optionFilterProp="DistrictName"
                                            options={districts}
                                            className="w-full h-[56px] border-1 border-[#111111] focus:shadow font-medium focus:border-[#111111] hover:border-[#111111] rounded-[8px]"
                                            fieldNames={{ label: 'DistrictName', value: 'DistrictID' }}
                                            onChange={handleDistrictChange}
                                            showSearch
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={<FormattedMessage id="ward" />}
                                        name="ward"
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="ward_message" />,
                                            },
                                        ]}
                                    >
                                        <Select
                                            placeholder={intl.formatMessage({ id: 'ward_placeholder' })}
                                            optionFilterProp="WardName"
                                            options={wards}
                                            className="w-full h-[56px] border-1 border-[#111111] focus:shadow font-medium focus:border-[#111111] hover:border-[#111111] rounded-[8px]"
                                            fieldNames={{ label: 'WardName', value: 'WardCode' }}
                                            onChange={handleWardChange}
                                            showSearch
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="phone"
                                        label={<FormattedMessage id="phone" />}
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="phone_message" />,
                                            },
                                        ]}
                                    >
                                        <InputPrimary
                                            placeholder={intl.formatMessage({ id: 'phone_placeholder' })}
                                            margin="mb-0"
                                            type="number"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="address"
                                        label={<FormattedMessage id="address" />}
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="address_message" />,
                                            },
                                        ]}
                                    >
                                        <InputPrimary placeholder={intl.formatMessage({ id: 'address_placeholder' })} />
                                    </Form.Item>

                                    <Form.Item label={<FormattedMessage id="note" />} name="note">
                                        <TextArea
                                            placeholder={intl.formatMessage({ id: 'note_placeholder' })}
                                            className="hover:border-[#000] font-medium text-[18px]"
                                            rows={5}
                                        />
                                    </Form.Item>

                                    <ConfigProvider
                                        theme={{
                                            components: {
                                                Radio: {
                                                    colorPrimary: '#111111',
                                                },
                                            },
                                        }}
                                    >
                                        <Form.Item
                                            label={<FormattedMessage id="shipping_method" />}
                                            name="shipping_method"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: <FormattedMessage id="shipping_method_message" />,
                                                },
                                            ]}
                                        >
                                            <Radio.Group
                                                onChange={(e) => handleShippingChange(e.target.value)}
                                                disabled={!wardCode}
                                            >
                                                <Radio className="font-medium" value={2}>
                                                    <FormattedMessage id="shipping_standard" />
                                                </Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </ConfigProvider>
                                </div>
                                {fee?.total ? (
                                    <div
                                        style={{ width: '100%', maxWidth: '500px', margin: '0 auto', padding: '20px' }}
                                    >
                                        <Title level={3} style={{ marginBottom: '16px' }}>
                                            <FormattedMessage id="shipping" />
                                        </Title>

                                        <Text
                                            className="font-medium text-red-500"
                                            style={{ fontSize: '16px', color: '#555', marginTop: '25px' }}
                                        >
                                            {formatPrice(fee?.total)} đ
                                        </Text>

                                        <div style={{ marginTop: '16px' }}>
                                            <Text
                                                strong
                                                style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}
                                            >
                                                <FormattedMessage id="shipment_one" />
                                            </Text>
                                            <Text style={{ fontSize: '14px', color: '#555' }}>
                                                <FormattedMessage id="pickup_info" />
                                            </Text>
                                        </div>

                                        <div style={{ marginTop: '16px' }}>
                                            <Text type="secondary" style={{ fontSize: '14px' }}>
                                                <FormattedMessage id="customs_info" />
                                            </Text>
                                        </div>
                                        <div style={{ borderTop: '1px solid #ddd', marginTop: '20px' }}></div>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </Card>
                        </Col>

                        <Col xs={24} md={12}>
                            <div style={{ width: '100%', maxWidth: '800px' }}>
                                <Card bordered={false}>
                                    <Title level={3}>{<FormattedMessage id="Order Summary" />}</Title>
                                    <div className="flex items-center justify-end gap-x-4 mb-10">
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
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '16px',
                                        }}
                                    >
                                        <Text className="color-primary font-medium">
                                            {<FormattedMessage id="box.Cart.Subtotal" />}
                                        </Text>
                                        <Text className="color-primary font-medium">
                                            {formatPrice(handleTotalPrice)}đ
                                        </Text>
                                    </div>

                                    {fee?.total ? (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '16px',
                                            }}
                                        >
                                            <Text className="color-primary font-medium">Delivery/Shipping</Text>
                                            <Text className="color-gray font-medium">
                                                {handleTotalPrice >= FREE_SHIP
                                                    ? 'Free Ship'
                                                    : formatPrice(fee?.total) + '₫'}
                                            </Text>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    {voucher.discount ? (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '16px',
                                            }}
                                        >
                                            <Text className="color-primary font-medium">Voucher</Text>
                                            <Text className="color-primary font-medium">
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
                                            </Text>
                                        </div>
                                    ) : (
                                        ''
                                    )}

                                    <div style={{ margin: '16px 0', fontSize: '12px' }}>
                                        <Text className="color-primary font-medium">
                                            {<FormattedMessage id="box.Add 1.000.000₫ more to earn Free Shipping!" />}
                                        </Text>
                                        <Progress
                                            percent={
                                                handleTotalPrice >= FREE_SHIP
                                                    ? 100
                                                    : Math.round((handleTotalPrice / FREE_SHIP) * 100)
                                            }
                                            showInfo={false}
                                            strokeColor="#4caf50"
                                            style={{ marginTop: '8px' }}
                                        />
                                    </div>

                                    <Divider />
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontWeight: 'bold',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <Text className="color-primary font-medium text-[20px]">
                                            {<FormattedMessage id="box.Cart.Total" />}
                                        </Text>
                                        <Text className="color-primary font-medium text-[20px]">
                                            {formatPrice(totalAmount)}đ
                                        </Text>
                                    </div>

                                    <Divider />
                                    <div className="h-[500px] overflow-auto">
                                        {carts?.map((cart: any) => (
                                            <div className="flex gap-x-10" key={cart.id}>
                                                <Row justify="start">
                                                    <img
                                                        src={
                                                            cart?.product
                                                                ? cart?.product?.image_url
                                                                : cart?.product_variation?.product?.image_url
                                                        }
                                                        alt="Tatum 3 PF 'Zero Days Off' Basketball Shoes"
                                                        className="w-[200px] h-[220px] mb-5 object-cover"
                                                    />
                                                </Row>

                                                <div>
                                                    <Title level={5}>
                                                        {cart?.product?.name
                                                            ? cart.product.name
                                                            : cart?.product_variation?.product?.name}
                                                    </Title>
                                                    <div style={{ marginTop: '8px' }}>
                                                        <div>
                                                            {cart?.product_variation_id ? (
                                                                <div>
                                                                    <p className="text-[14px] color-gray font-medium">
                                                                        {cart?.product_variation?.values.map(
                                                                            (value: any, index: number) => (
                                                                                <p
                                                                                    key={index}
                                                                                    className="color-gray text-[13px] font-medium"
                                                                                >
                                                                                    {value.attribute} : {value.values}
                                                                                </p>
                                                                            ),
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </div>
                                                        <Text className="block my-2 text-[15px] color-gray">
                                                            {<FormattedMessage id="body.Detail.Quantity" />}:{' '}
                                                            {cart?.quantity}
                                                        </Text>
                                                        <Text className="block font-medium text-[18px] color-primary">
                                                            {formatPrice(
                                                                cart?.product
                                                                    ? cart?.product.price
                                                                    : cart?.product_variation?.sale_price ||
                                                                    cart?.product_variation?.price,
                                                            )}{' '}
                                                            ₫
                                                        </Text>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-10">
                                        <Title level={3}>{<FormattedMessage id="title.Payment" />}</Title>
                                        <div>
                                            <ConfigProvider
                                                theme={{
                                                    components: {
                                                        Radio: {
                                                            buttonCheckedBg: '#ccc',
                                                        },
                                                    },
                                                }}
                                            >
                                                <Form.Item
                                                    name="payment_method"
                                                    className="mb-5"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please select a payment method',
                                                        },
                                                    ]}
                                                >
                                                    <Radio.Group name="payment_method" style={{ width: '100%' }}>
                                                        <Radio.Button
                                                            value="momo"
                                                            className="font-medium"
                                                            style={styles.radioButton}
                                                            disabled={totalAmount <= 100000 || totalAmount > 50000000}
                                                        >
                                                            <div className="text-[15px] flex items-center gap-x-3">
                                                                <img
                                                                    src="data:image/png;base64,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"
                                                                    alt="PayPal"
                                                                    className={'w-[30px]'}
                                                                />
                                                                MOMO
                                                            </div>
                                                        </Radio.Button>
                                                        <Radio.Button
                                                            value="vnpay"
                                                            className="font-medium"
                                                            style={styles.radioButton}
                                                            disabled={totalAmount <= 100000 || totalAmount > 50000000}
                                                        >
                                                            <div className="text-[15px] flex items-center gap-x-3">
                                                                <img
                                                                    src="data:image/png;base64,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"
                                                                    alt="PayPal"
                                                                    className={'w-[30px]'}
                                                                />
                                                                VNPAY
                                                            </div>
                                                        </Radio.Button>
                                                        <Radio.Button
                                                            value="cash_on_delivery"
                                                            className="font-medium"
                                                            style={styles.radioButton}
                                                        >
                                                            <div className="text-[15px] flex items-center gap-x-3">
                                                                <img
                                                                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUSEhITFRUXFRUYFxEXGBcWGhUYFxcXGBUYFRUaHSwgGBslGxYVITEiJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGy4mHyUvLS0vLy4wLy0tLS0tLS0tLS01LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgIDBAUHAQj/xABLEAABAwEDBgkHCQYFBQEAAAABAAIDEQQFIQYSMVFhkQcTIkFScYGhsRQyQlNiktEVIzNDcnOCosEWNFSys8JEk9Lh8BckNYPxCP/EABsBAQACAwEBAAAAAAAAAAAAAAACAwEEBQYH/8QANREAAgEDAAcGBQUAAgMAAAAAAAECAwQRBRITITFBUTJSYZGhsRQicYHRFTNCwfDh8SM0Q//aAAwDAQACEQMRAD8A7igCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAIAgCAsWy2RxNL5XtY0ek4gDeedYbwRlOMVmTwiJ3nwkWSPCIPmOwZje1zsdwKi5o0Kuk6MezvIvbuE21O+jjijHa87zQdyg5s0Z6VqPspI05ykvGfzZ53bIxm/0wFjWb5mv8VdVODf2/4Ko7Decno211ecmUA9rjRMMyoXcu96lfyFegx4u1YanGvZRyYZL4e7XXzLRdecWJNubhXHjtG1N6IZu4971L9ly7t8ZoZs+noyMae8AHvRSfUlHSFxHi8/VG/u7hRdgJ7ODrdG6n5HVr7ykqj5m3T0t34+RLrpyxsdooGzBrj9XJyDXVjgewlTU0zoUryjU4Pf4m/UjaCAIAgCAIAgCAIAgCAIAgCAIAgCAs2y1siYXyvaxo0ucQBvKN4IynGCzJ4RzvKHhL0ssbf/c8fyM/V25VOfQ5FxpTlSX3f4IlZ7DbbwfnASTGp+ccaMbrGceSOoblHezQjTr3LzvfsTC6eC8YG0zE6Pm4xQdRecT2AKap9ToUtFJb6j8iWXfknY4RyLPGT0njPO91adikopG/TtKMOEV7m6a0DAAAagpGyeoAgCAx7XYIpRSWKOQanta7xCxhEJU4y7STI3eXB7YpfNa6E64zh7rqjdRRcEadTR1CfBY+hDb54N7TFV0Lmzt1DkP90mh7D2KDgznVtF1I74PPuay6cqLZY3Zmc6jdMEoNBsAPKZ2LCk0U0ruvQeH5M6Vk3lvZ7VRhPFSn6txwcfYfod1YHYrFNM7NvfU627g+hJ1M3QgCAIAgCAIAgCAIAgCAIAgNDlRlTDY28rlyEVZCNJ2uPotrz7qqMpYNW5u4UFv49Dk14Xja7xmAIdI4+ZCzzWDYNA04uPaVU22zgVKta6njj4f73J1k1wcxx0fayJH6eKHmN+0dLzuHWpqHU6ttoyMPmqb305E6iia0BrQGgaGgAAdQGhWHTSSWEVoZCAIAgCAIAgCAIDXX1ccFqbmzxh2p2hzfsuGI8FhxTKa1CnVWJo5blRkHNZqyRVmiGmg5bB7TRpG0bgqpRaOHc6OnS+aG9epkZJZfSQUitJMkWgP0vjH97dmnwSM8E7XSMofLU3rrzR1ay2lkjGyRuDmOFQ4YghXJ5O7GSksrgXUJBAEAQBAEAQBAEAQBARjLXKxtjZmso6dw5LOZo6b9moc+9QlLBpXl4qEcLtHMblue0XjO41JqQZZ3aGg+JpoaNXMFWk2ziUaFS6nnzZ2K4LihskeZE3HDOkPnPOtx/TQFcopHoqFCFGOrFGzWS4IAgCAIAgCAIAgCAofK0YFwHWQFhyS4mVFvgiprgdBB6kTTDTXE9WTBBcs8hGzAzWUBkuJdGKBsmunM123QefWq5Q5o5l5o9VFr09z9yF5LZSzWCUscHGPOpJAcC0g0JaD5rxq5+fmIhGWDmW11O3nqvhzR2a77bHNG2WJwcxwqHDwOojQRzK5PJ6OE4zipRe4yFkmEAQBAEAQBAEAQGiyvyjbYoc7AyOqI2azzk+yKivWBzqMpYNW7uVQhnnyOUXFdE942h1XE1OdLMcc0H9TSgGzUFUk2zg0KE7qo8v6s7RdN2R2eJsUTc1o3k87nHnJVyWD0lKlGnHVitxmLJYEAQBAWbVamRjOe4NFaV2qurVhSWtN4RZTpTqPEFlmJ8uWf1o3H4Kj4+376Lvgq/dHy3Z/Wjcfgnx9v30Pgq/dHy3Z/Wjcfgnx9v30Pgq/dHy5Z/Wjcfgnx9v30Pgq/dLFpygiHmOBOs1AHxUJ6Qo4+WSJwsaufmRr5L3LtMu4geC13eJ/zXmjZVrq/x9GWPKGk+cCTt0qCqwk+0s/VE9nJLh6MrVhErbK4aHOHUSs6zXMi4p8UXGWyQem7tNfFSVSa5kHSg+RyLhQypZ8pCItaM2JjZZAKHjHcoE7A0tHbsW3HM463M4Gk7BTbcOK9TbZD5UmxyUcSYHnlt05pOiRvdXWOxZjLBx7K6dCerLg+PgdqjeHAOaQQQCCMQQcQQVcekTysoqQyEAQBAEAQBAWbXaWxsdI80axpc46gBUo3gjKSinJ8EcPvW2zXjbOSCXPdmRx9BvMD1CrietUNts8zVqTuq27nwOx5O3LHZIWwsx53v53uOlx+HMKK6Kwj0VChGjBRibNZLggCAIAgNHld9CPvB4OXM0t+wvqv7Ojoz95/T8GHcdyxSxB7w6pLtBpoNFrWNjSrUVOec7+ZsXl5VpVXGPDcbD9moNTveK2/0u36PzNX9Sr+HkaC3xQ8YYoGFzhUZxfhUVJoNFBQ4nUuTXhR2jpUY5fXPT8eJ06M6uptKssLpg8sEMVWtnYRnGjZQ/kk12YahUFKEKKajWjjPBp7vTd5CtOq05UZcOKxv/JtLwueCOnJea19IgYLo1dH28FwfmaVG9r1HxXkYD7DGdDSPxV/Ra7s6PJepsK4q836FLbCwGtDvWY2tKLTSDuJtYbMpbBSeID0BZMHzNl1bRNeFqkBqDM4A6wzkAjsaF0aSxBHMqPMmzMyVvWvzDz9g/2/D/4sTjzOHpK0/wDrH7/n8nb+C3KP/Byu1mEne6PxI7dixCXIaMus/wDil9vwdJVp2QgCAIAgCAIDm/Cxfnm2Nh1Pl/sb3Z3uqub5HG0pX3KkvqzM4Lbg4uI2p45cmDK+jHrH2j3Aa0guZboy31IbR8X7E8Vh1AgCAIAgCA0eV30I+8Hg5czS37C+q/s6OjP3n9PwXclv3dv2n/zFT0X/AOuvq/chpH99/b2Ns7QugzRRB7otT2PLK0FJC7khxBDHVOOOkaF5ezrTpzcM97O7O9J/g9HdUoVIKX0xvxzX5PbXernRiJpLqk1cWMacQAGtA0c+OlZrXkpU9lF5zzwlx5JL/sxStIxntJLHhlv7t/5E0YzkgOFcBWuOK9Kl8qTPPt720W32GM6WDsw8FF0oPkSVWa5kevb5u0RxtHJdmVrUnlOIOPUuTdVHTuI04rc8erwdS2jtKEpt71n0WTavuYei8jrFfCi6DtlyZoq6fNFLLm6T9w+KK26sy7rojXZZ5PST2C0WeylrZpGUa95OjOBeK+jnNBFdqujShHgiidacuLPlC9bsms8joZ43RyNNCxwoesaweYjA8ysKzFY4tIINCDUHURoQw0msM6Lk/epe1kzHZsjSMR6L241Hce1UNYZ5i5pO2rfL9UfRGTl7NtVnjnGBcOU3ouGDhv7iFdF5R6K3rKrTU0bNZLggCAIAgLNttLYo3yPNGsaXE7AKlG8EZyUYuT5HCoHi2W0One1gllq9znUDW1qW5x0ckZo7Fr8XvPLxar18zeMs7xAGhoDKZoADaaKDAU2LYPUrGNxWhkIAgCAIAgNHlf8AQj7weDly9LfsL6r+zo6M/ef0/Bg3JfkUUQY7OqC7QARia61q2WkKVGkoSznebN3Y1atVzjjG4z/2og1P3D4rb/VqHj5Gt+mVvA1dvtllkdnjjWONQS0NxqKGoJ1FaNevaVZa61k/DG/kblGjdU46rw14lN3WmyROzvnXuGguDaDaADpUberZ0Za3zN+ODNend1Y6u5Lwybb9qINT9w+K6H6tQ8fI0v0yt4D9qINT9w+Kfq1Dx8v+R+mVvA1FutzZrVE5laAxjHDEPr+q51e4hXuoSh1j7m9RoSo204y8fYmS9IcAIAgI9ljkdZbxi4u0M5QBzJm4PjJ6LtWw4FAfNWXeQFqux/zg4yEnkWlgOadj+g7YewmiA1uStt4ubMJ5MmH4vRP6dqhNbsmhpGhtKWVxW/8AJ3LgnvfMmfZnHkyDOYPbaMadba+4FGD34NHRVbEnTfP3OrK07oQBAEAQEN4U7x4uyCIedM8N/C3lO/tHaoTe452k6upR1epx9VHnTPuy+bRZ/oZns580HknrYcDuRbuBdTuKlPsSwS66uE6ZuFoiZIOkzkO3YtPcpqbOhS0rNfuLP0JjdWXFjnoON4txpyZBmY6s7zTvUlNHRpX1GpuTw/EkbXAioII1hTNw9QBAEBS9gIoQCNRFVhxTWGZUmt6LfkkfQZ7oUNlT7q8ie1n3n5jySP1bPdCbKn3V5Daz7z8x5JH0Ge6E2VPuryG1n3n5jyWPoM90JsqfdXkNrPq/MeSR+rZ7oTZU+6vIbWfefmPJI+gz3Qmyp91eQ2s+8/MNsrAahjARz5oRUoJ5UV5GHVm1ht+ZeVhAIAgCAs2yyslY6OVjXscCHMcAQ4HSCDpQHB+EXgcfCXWm7Q58Y5RsuJkjpjWI6Xj2fO60Brcn70c10Nobg5pa4jaDy2/zBUcGeWmnb3G7k/T/AKPo2KQOaHNNQQCDrBFQrz1CeVlFaGQgCAIDknCzbM61Mi5o4x7zzU9wYqp8TgaVnmqo9EQhQOWEAQBAZt3XvPAfmZpGbATm9rTge0It3Atp16lPsyaJhd+WtqtDHRSBugHjmVY7A1oaGlTspoKhVqNRweh0Tc1Lio1NLCXErFulH1svvv8AitXXl1fmd/Uj0K/lOb10vvO+KztJ9Rs49D0XrP66X3nJtJ9TGzj0Pfle0euk94ptZ9Rs49CoX1aPXSb1naz6jZQ6D5btHrn7x8E2tTqY2UOh78uWn1z+74JtqnUzsodD0X7afXO7vgm2n1MbGHQ9+X7T6524fBZ20+o2MOhX+0dq9b+VnwTb1OpjYw6EsyWvJ00RzzV7XEE4CoOLTQYbOxblCo5x38TWrQUZbuBuVcUhAEAQBAco4V7qbHNHMxgaJQ7PoKAvaQc4+0Q78qqmt5w9LU8SjPruJrwfWzjbBDrYDGdmYaD8uae1ThwOjYz16EfLyJEpG2EAQBAcJy3tPGW60OrWkmbz+gAzn+yVRLizy19PWryf+3GjWDVCAIAgCAluS93Ew5+PKcebmbh41WvVTbPWaEgoUHPvP0W78m4+TzrO5V6h2NdD5POs7k1Brj5POs7k1BrDyA6zuTUGsPIDrO5NQaw8gOs7k1BrDyA6zuTUGsPIDrO5NQaw8gOs7k1BrDyA6zuWdQaxu8kgY5i0k0e2mimLcQd2cr7f5ZYKa+HHJMluGoEAQBAEBCeFmz51kY/nZK3c4Oae+irqcDm6UjmjnozH4IZ6wTM6Mod7zQP7e9KZDRL/APHJeJPlYdUIAgCA+fL/AD/3Vo+/m/qOWu+J5K5/en9X7mPZWRk0ke5ntBmfvGcCOyqwQgoPtPHqbez5PMl+httmJ6MhfCewPbiso2Y2sZ9iovvuMuXg/twFWsjkHMWSNofeos6rJy0bXXDD+5hz5H25umzSH7Oa/wDlJTD6FbsbhfxMGe5bSzz7PM3aY3030osPcVu2rJ41X5HQLE7io2RtAo1oHXTSe01Ko1j2tKiqdOMFyRf8rOoJrFmquo8rOoJrDVHlR1BNYzqnnlZ2JrDVHlZ2JrMao8rOxNZjVHlZ2JrMao8rOxNZjVHlZ2JrMao8rOxNZjVK4beWuDsMCDp1Ip4eTDhlYJxG8EAjQQCDsK308mkypAEAQBARvhFZW759nFndIxRnwNO/WbeX+5kX4HTyrT1Q+MihT4s0dEfz+39nTFadoIAgCA+fL+/erR9/N/Uctc8lcfvT+r9zAQpCAy7Dec0P0U0keNaNcQO1ug9qFsK1SHZk0SS7uEW2R4PLJh7baH3m07wVJSaNynpStHtYZtLfwjNmgdGYXsc6gJDg4ZvPjgeyijUk5RwjoUNMUk8zi/t/kauC8I36HiuihwPYDpWk4SXE7VLSFtV7M1no93v/AEZNVE3AgCAIAgCAICpjCdAJTcuISzwKuId0So60eqM6j6McQ7olNaPVGdR9GUvjI0ghZTT4EWscif5I2gvsza+iSyusDR3EDsXSoPMDQrrEzcq4qCAIAgI7whf+Pn6mf1GKM+BqX3/ry/3MinA751p+zF4yKFPizQ0R/P7f2dNVp2ggCAIDgGU0RbbLQ0+ukPYXEjuIVD4nk7pNVp56s1iwUBAEAQBASTJG4+PLpXEhrCA3CtXacdgwPaFTVlhYR3NC2Kqz20uEXu8X/wAEnNyv5nN7wtfB6zBafdMg0AHqKxgYMWWBzfOaR1j9UMFtAEAQBAZFl9Ls/Val7+2vr/TNq0/c+34Ly5Z0QgLdq80dZ8F0bHsy+xoXnaiTHIn93P3jvALu23YONcds362CgIAgCAi3CZNm3fIOk6No99rvBpUJ8DR0i8W8vt7kf4HYv3l/3TadWef1WKfM1NELdN/Q6SrDshAEAQHFOEmy5lvkPM8MeO1uae9pVMuJ5rSUNWu/EjCiaIQBAEBVGwkhoFSSABrJwARmYxcmkuLOs3RYRDCyIU5IxI53HFx317lpyeXk+gWlurejGn0XrzMtYNg9QHjhUUOI1IZNHeF2FvKZi3nbzt+IWMEcGtWDAQBAXrM8CtTStNuivxVNek6kdVdS6jUVOWWXuNb0u4rT+Cl1Xr+Da+Mj0fp+Rxrel3FPgZdV6/gfGR6P0/JbtEgIABrjq2Lat6LpJpvia1eqqjTS4EzyJ/dz947wC69t2Dl3HbN+tgoCAIAgOf8AC/a6QwxVxdIX02MbTxeFXUOTpaeIRj1fsZXBPZs2yOefTlcR1NAb4hyzT4Fmi4Yo56smymdIIAgCA5rwv2D6G0AdKNx/Mz+9V1FzONpan2Z/YgFlu+aUExQyyAYEsY5wB1EgYKs5EKU574psyGXDaiaCy2iv3T/gs4ZNW1Z7tV+RebkvbTh5LN2tI7ymH0Jqzrv+LLoyPt38LJ+UfqmH0JfA3HdNjcuT09mlbPaYHNY2tDVh5fo4B1dfcqquVE6WirGcbhSqR3Lf9ybxvDgHDQRVax6wqQBAY14Wl0bQ4AEVx6kB7Y7a2TRgeidPZrQZMO8brryoxjzt19W1YaMNGlWDAQBAEAQBATvIn93P3jvALftuwaVx2zfrYKAgCAIDjnChePGWwsBwiYGfiPKd4gfhVM3vPO6Tq61bV6HT8mLDxFkgiIoWxtzh7R5T/wAxKtisI7lvT2dKMfA2iyXBAEAQGkyzuw2ixyxtFXZucwe0zlADroR2qMllGtd0trRlFcSAcFF68XaHQOPJmbVv22VPe0u90KuD3nK0XW1Zum+fujrSuO8EAQEfy2/dx943wcte57Bfb9s0FxT1aWHmxHUf91oo3kbNZMhAUyRhwLToOBQEZniMbyKmoOB8CokS7JeMhFC7dgT1lMjJiIAgCAIAgCAneRP7ufvHeAW/bdg0rjtm/WwUBAEBj3hbGwxPleaNY0uPYK71hvCIzmoRcnyOK5M2R1tt7eMxznmWXqBziOomje0KmKyzzVtB3FxmXXLO5K89OEAQBAEAQHFMs7vdYrcXx1aC4TRO1GtSOx1cNRGtUSWGebvKboV9aP1R1y4rzbaYI526HtxHRcMHN7CCFcnlZO/RqqrBTXMz1ktCAjuXJ+Yb94P5XLWuuwX2/aIXZrQWODhzd+sLRN4ktmtLZBVp7OcKWTJdQBAa++bNnNzxpb3hYYZos06juTDI5QzTqO5YwxlFXFu6LtxWcMxlDindF24/BNVjKHFO6LtxTVYyj1sDzoY49TSU1X0GUe+Syerf7rvgmq+gyupN8jGEWchwIPGOwII5hrW/brEDSrvMzfK8pCAIDnXCxfdGtsjDi6j5PsjzGnrPK/CNarm+RyNKV8RVJfVmVwVXNxcLrS4cqXBuyNp0/idXsa1ILmT0XQ1abm+L9idqw6gQBAEAQBAR3Lq4PK7MQ0fOx1fHtNOU38Q7wFGSyjTvbfbU8LiuBBODbKLyeY2eUkRymgr6EmgV1A6DtA2quEsM5mjrnZz2cuD9GddVx3wgPC0HSEB4GDUEBTLC1wLSMCoyipLDJRk4vKNNLdTwTm0I5saErTlbyT3G7G5g1vLPkMnQPcobGfQntqfUyBdMmFC3vw7lZ8PLqVu5g92DdBbpomHa7xaw5ua4ncN6pnWUHjBfToOazkt2e9WuNHDN21qO3UowuIt4e4lO2kllbzYrYNYICl7wBUkAaysNpcTKTfAtstTDoe3eFhTi+DJOnJcUY183tHZoXzvD3NZSrY2mRxq4NFGNxOJ8VnKI4Zzm2cO93twZDann7LGjvfXuWTBp7Z/+gG/VWBx2vlA7gw+KAwIuG63TvEcFms0dcS53GSZo5zgW/wDCFhvCKq9aNGDnIyLnsUt42zlkkvdnyvGGawUBpq5mjsVKWWedowndVsv6v6HcYYmsaGNAa1oADRgABgAFeemSSWEVoZCAIAgCAIAgOV8JmTBY82uJvIefnWj0Xn0+p3Pt61VOPM4ekrXVe1jw5/k3/B5lX5QzyeZ3zzBg4/WMHP8AaHPr066ZhLkzasLzax1JdpepNVYdIIAgCAIAgCAIC3PA14o4V/TqUZRUlhkozcXlGntd1ubi3lDvHxWpO3kuzvN2ncp9rcY0Vre3AONNWnx0KtVZrcmWOlCW9oqfbpDpeeyg8EdWb5mFRguRYc4nSSevFQbb4liSXApWAetTBk+XsrLDxFttMXRmeB1FxLe4hdODzFM5c1iTRq4Yy4hrQSTgAOcqRXJqKy+BP8nrmMbQxozpXkA0xJJ0NaqJPJ5q7uZXNTEeHI7/AJFZOCxwUdQzPoZHbeZgOod5qVbGOEduztlQhjm+JIlI2wgCAIAgCAIAgKJomvaWPaHNcCC0ioIOkEIYaUlhnGssMmpLBM2WEu4ourHINMbgahpOvUefsKplHB527tZW89eHDl4E8yJywba2iOQhs7RiNAkA9Ju3WP0U4yzuZ1LO9VZar7XuSxTN8IAgCAIAgCAIAgMW1WBj8SKHpD9darnSjIthWlDgYZub2+7/AHVHwviX/FeB6LmHTO7/AHWfhV1MfFPoXBc7Nbu74KXw0erIu5lyRX8lR00Gusk+AUvh4EXcTOLZX8DltlkltTrdZnuNC572GAUa0Cpzc4DADcrUlFYRROfGUmQ+5biEJq6j5KkAtxAxpyMMa66KqUsnnr29dZ6kOz7nbuD/ACO4gC0WhvzxHIYfqgec+2RuGGtSjHmzesbLZfPPtexOVYdMIAgCAIAgCAIAgCAs2uzMlY6ORocxwoWkVBRrJGUVJYlwORZX5Hy2N/HQZzoQc4PFc6Eg4ZxGOnQ7ftplHB5+7spUHrw4exIMkeEIOpDbCGuwDZ9DXfedE7dHUpRn1Ny00kpfLV3PqdCa4EVGI1qw6x6gCAIAgCAIAgCAIAgCAwL5viGys4yZ4aOYaXOOprdJKw2kVVa0KUdabOSZT5VT294iY1zYyeTA2pc88xfTzjz00DbpVMpNnAubupcvUit3TqTLIfIcWek9oAM2lsekRba6HO26Bza1OMObOjZWCpfPPtexOFYdMIAgCAIAgCAIAgCAIAgPHNBFCKg6RrQHP8quDtr6y2OjHaTAcGuPsH0Ds0dSrlDocm60apfNS3PoRS6co7Zd7+KcHZo02eUGg2sOlvPiMOtQTcTQpXVa2erLh0Z0a4cuLLaaNLuKkP1cmFT7L9B8disU0zs0L6lV3Zw+jJKCpm4eoAgCAIAgCAIDHtttjhbnyyMY3pOIA79Kw2kRnOMFmTwQPKDhLaAWWRmcfXPFGja1mk9tOoqDn0OVX0pFbqSz4siV33TbLylMhLndKd+DG7G/6WjcoJNmhTo17qWX5vgdSyXyThsYq3lykcqZwx2ho9EbN5KtjFI7dtaQoLdvfU36kbYQBAEAQBAEAQBAEAQBAEAQBAYN7XRDaW5k8bXjmJwLfsuGI7FhpPiVVaMKqxNZOf33wYuFXWWQOHq5MD2PAoe0DrVbp9DlVtFPjSf2ZHWWq8bvNCZomj0XcuM9Vat3YqO+Jpqd1bdV6r8G/u7hQlGE8DH+0wlh3Go8FJTZtU9LS/nHyN9ZOEqxu88Sx/abnD8pJ7lLaI24aToPjlGwjy5sB/xAHWyQeLVnXRar+3f8vcuftpYP4lm53wTXRL42h3kY0vCBYAMJnO2COT9WgLGuiD0jbr+XozU2zhRgH0UErzj5xawbNBJ7ljaGvPS1NdmLZHLy4RrXJhHmQj2RnO3uqNwCi5s06mk60uzuMOx5MXhbHcY5rzX62dxG7O5RHUKLCi2Vxtbmu8vzZN7i4OLPFR05M7xjm+awfh0u7TQ6lYoLmdOhoynDfPe/QmkbA0BrQABgABQAbApnRSS3IqQyEAQBAEAQBAEAQBAEAQBAEAQBAEAQHjmgihFRqKA0tvyRsU1c+zsBPpMHFmuuraV7VFxTNadnRnxivY0Vp4MbKTVkkzNlWuA3ivesbNGrLRVJ8G0YJ4K2/wAWf8of61jZ+JV+kR73oef9Kx/Fn/KH+tNn4j9Ij3/Qri4LGelankbGAeLimz8TK0THnJm0sfBxYmecJZPtPIH5Kf8AAs6iL4aMoLjl/wC8CQ2C5rPD9FBGw6w0V7XaSpJJG3CjTh2YpGesloQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQBAEAQH/9k="
                                                                    alt="PayPal"
                                                                    className={'w-[30px]'}
                                                                />
                                                                {
                                                                    <FormattedMessage id="title.Payment.CASH ON DELIVERY" />
                                                                }
                                                            </div>
                                                        </Radio.Button>
                                                    </Radio.Group>
                                                </Form.Item>
                                            </ConfigProvider>
                                        </div>
                                    </div>
                                    <div className="mt-10">
                                        <ButtonPrimary width="w-full" height="h-[56px]" htmlType="submit">
                                            {loadingCheckOut ? (
                                                <LoadingSmall />
                                            ) : (
                                                <FormattedMessage id="box.Cart.Checkout" />
                                            )}
                                        </ButtonPrimary>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Form>
            )}
        </>
    );
};

export default Order;

const styles = {
    radioButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '10px',
        width: '100%',
    },
    icon: {
        marginRight: '8px',
        fontSize: '18px',
        height: '19px',
    },
    placeOrderButton: {
        backgroundColor: '#f0f0f0',
        color: '#333',
        borderRadius: '5px',
        height: '40px',
    },
    paypalButton: {
        backgroundColor: '#909090',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '5px',
        height: '40px',
    },
    googlePayButton: {
        backgroundColor: '#909090',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '5px',
        height: '40px',
    },
    iconImage: {
        marginRight: '8px',
        height: '18px',
        verticalAlign: 'middle',
    },
};
