import { useEffect, useMemo, useState } from 'react';
import TableAdmin from '../../components/Table';
import { columns } from './datas';
import ModalChooseProduct from './ModalChooseProduct';
import { FormattedMessage, useIntl } from 'react-intl';
import ButtonDelete from '../../components/Button/ButtonDelete';
import { Button, ConfigProvider, Form, Input, Radio, Switch } from 'antd';
import InputPrimary from '../../components/Forms/InputPrimary';
import SelectPrimary from '../../components/Forms/SelectPrimary';
import useDelivery from '../../../../hooks/useDelivery';
import TextArea from 'antd/es/input/TextArea';
import { useForm } from 'antd/es/form/Form';
import ModalUser from './ModalUser';
import useVoucher from '../../../../hooks/useVoucher';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import { showMessageClient } from '../../../../utils/messages';
import ButtonSubmit from '../../components/Button/ButtonSubmit';
import { FREE_SHIP, LANGUAGE, LANGUAGE_VI } from '../../../../constants';
import { formatPrice, handleChangeMessage, handleGetLocalStorage } from '../../../../utils';
import { useContextGlobal } from '../../../../contexts';
import { CircleDollarSign, CircleX, QrCode } from 'lucide-react';
import useOnlinePayment from '../../../../hooks/useOnlinePayment';

const paymentMehtods = {
    cash_on_delivery: 'cash_on_delivery',
    banking: 'banking',
};

const FormOrder = () => {
    const [form] = useForm();
    const { locale } = useContextGlobal();
    const [products, setProducts] = useState<any>([]);
    const intl = useIntl();
    const { provinces, districts, fee, wards, getAllWard, getAllDistrict, getFee, setFee } = useDelivery();
    const [province, setProvince] = useState<any>('');
    const [districtId, setDistrictId] = useState<number | null>(null);
    const [wardCode, setWardCode] = useState<string | null>(null);
    const [code, setCode] = useState<string>('');
    const [user, setUser] = useState<any>(null);
    const { loading: loadingVoucher, voucher, postVoucher, setVoucher } = useVoucher();
    const [infoShip, setInfoShip] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('cash_on_delivery');
    const { loading: loadingCheckOut, postOrderAdmin } = useOnlinePayment();

    const handleSetProducts = (product: any) => {
        const index = products.findIndex((productIndex: any) => {
            if (product.product_id) {
                return productIndex.product_id === product.product_id;
            } else {
                return productIndex.product_variation_id === product.product_variation_id;
            }
        });

        setProducts((preProducts: any) => {
            if (index >= 0) {
                const newValues = [...preProducts];
                newValues[index] = product;
                return newValues;
            } else {
                return [...preProducts, product];
            }
        });
    };

    const handleDeleteProduct = (index: number) => {
        setProducts((preProducts: any) => preProducts.filter((_: any, i: number) => i !== index));
    };

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
            shipping_method: null,
        });
    };

    const handleWardChange = (code: string) => {
        setWardCode(code);
        form.setFieldValue('shipping_method', null);
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

    const handleGetVoucher = () => {
        if (code) {
            postVoucher(code);
            setCode('');
        } else {
            showMessageClient('Please enter code', '', 'warning');
        }
    };

    const handleTotalPrice = useMemo(() => {
        return products?.reduce((sum: any, curr: any) => {
            if (curr?.product_variation_id) {
                return sum + (curr.sale_price || curr.price) * curr.quantity;
            } else {
                return sum + (curr.sale_price || curr.price) * curr.quantity;
            }
        }, 0);
    }, [products]);

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
        } else if (voucher?.max_total_amount < sum) {
            showMessageClient(
                handleChangeMessage(
                    locale,
                    `The order must be smaller than ${formatPrice(voucher.min_total_amount)}đ`,
                    `Đơn hàng phải nhỏ hơn ${formatPrice(voucher.max_total_amount)}đ`,
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
    }, [handleTotalPrice, fee, voucher, products]);

    const onFinish = async (values: any) => {
        const newValues = {
            user_id: user?.id || 0,
            total_amount: totalAmount,
            payment_method: infoShip ? paymentMethod : 'pay_at_the_counter',
            payment_status: infoShip ? 'not_yet_paid' : 'paid',
            shipping_method: infoShip ? 'standard_shipping' : null,
            phone: values?.phone || null,
            shipping_cost: infoShip ? (handleTotalPrice >= FREE_SHIP ? '0' : fee?.total) : '0',
            tax_amount: null,
            receiver_email: infoShip ? values?.receiver_email : user ? user.email : null,
            receiver_full_name: infoShip
                ? values?.receiver_full_name
                : user
                ? user.name
                : handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'Retail customers', ' Khách lẻ'),
            address: infoShip
                ? `${values?.address} - ${wards.find((ward: any) => ward.WardCode == wardCode)?.WardName} - ${
                      districts.find((district: any) => district.DistrictID == districtId)?.DistrictName
                  } - ${province}`
                : handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'At the counter', 'Tại quầy'),
            city: infoShip
                ? province
                : handleChangeMessage(handleGetLocalStorage(LANGUAGE) || LANGUAGE_VI, 'At the counter', 'Tại quầy'),
            country: 'Viet Nam',
            voucher_id: voucher?.id ? voucher.id : null,
            status: infoShip ? 3 : 5,
            note: values?.note || null,
            order_details: products,
            amount_collected: infoShip ? 0 : totalAmount,
        };

        try {
            await postOrderAdmin(newValues);
            setProducts([]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            receiver_full_name: user?.name || '',
            receiver_email: user?.email || '',
        });
    }, [form, user, infoShip]);

    return (
        <div className="p-10">
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-[32px] font-bold">
                        <FormattedMessage id="box.Cart.Bag" />{' '}
                    </h3>
                    <ModalChooseProduct handleSetProducts={handleSetProducts} />
                </div>
                <div className="mb-20">
                    <TableAdmin
                        className="table-order-admin my-10"
                        rowKey="id"
                        columns={[
                            ...columns,
                            {
                                title: <FormattedMessage id="category.table.action" />,
                                dataIndex: 'slug',
                                key: '9',
                                render: (_: number, __: any, index: number) => (
                                    <ButtonDelete onClick={() => handleDeleteProduct(index)} />
                                ),
                            },
                        ]}
                        dataSource={products}
                        pagination={false}
                    />
                </div>
                {products?.length ? (
                    <div className="flex gap-x-5 items-start">
                        <div className="w-9/12">
                            <h3 className="text-[20px] font-medium">
                                <FormattedMessage id="Payment_Information" />
                            </h3>

                            <div>
                                <Form form={form} onFinish={onFinish}>
                                    {infoShip ? (
                                        <div className="grid grid-cols-2 gap-x-5 my-10">
                                            <InputPrimary
                                                label={<FormattedMessage id="receiver_name" />}
                                                name="receiver_full_name"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: <FormattedMessage id="receiver_name_message" />,
                                                    },
                                                ]}
                                                placeholder={intl.formatMessage({ id: 'receiver_name' })}
                                            ></InputPrimary>
                                            <InputPrimary
                                                label={<FormattedMessage id="receiver_email" />}
                                                name="receiver_email"
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
                                                placeholder={intl.formatMessage({ id: 'receiver_email' })}
                                                type="email"
                                            ></InputPrimary>

                                            <InputPrimary
                                                label={<FormattedMessage id="phone" />}
                                                name="phone"
                                                type="number"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: <FormattedMessage id="phone_message" />,
                                                    },
                                                    {
                                                        min: 10,
                                                        message: <FormattedMessage id="Invalid_phone_number" />,
                                                    },
                                                ]}
                                                placeholder={intl.formatMessage({ id: 'phone' })}
                                            ></InputPrimary>

                                            <SelectPrimary
                                                label={<FormattedMessage id="city" />}
                                                name="province"
                                                rules={[
                                                    { required: true, message: <FormattedMessage id="city_message" /> },
                                                ]}
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
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: <FormattedMessage id="district_message" />,
                                                    },
                                                ]}
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
                                                rules={[
                                                    { required: true, message: <FormattedMessage id="ward_message" /> },
                                                ]}
                                                placeholder={intl.formatMessage({ id: 'ward' })}
                                                optionFilterProp="WardName"
                                                options={wards}
                                                showSearch
                                                onChange={handleWardChange}
                                                fieldNames={{ label: 'WardName', value: 'WardCode' }}
                                            ></SelectPrimary>

                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label={<FormattedMessage id="address_placeholder" />}
                                                className="font-medium"
                                                name="address"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: <FormattedMessage id="address_message" />,
                                                    },
                                                ]}
                                            >
                                                <TextArea
                                                    rows={6}
                                                    placeholder={intl.formatMessage({ id: 'address_placeholder' })}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                labelCol={{ span: 24 }}
                                                label={<FormattedMessage id="note" />}
                                                className="font-medium"
                                                name="note"
                                            >
                                                <TextArea
                                                    rows={6}
                                                    placeholder={intl.formatMessage({ id: 'note_placeholder' })}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label={<FormattedMessage id="shipping_method" />}
                                                name="shipping_method"
                                                className="font-medium"
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
                                                    <Radio value={2}>
                                                        <FormattedMessage id="shipping_standard" />
                                                    </Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </Form>
                            </div>
                        </div>
                        <div className="w-3/12">
                            <div className="px-5 border-l">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium color-primary text-[16px]">
                                        <FormattedMessage id="admin.customer" /> :{' '}
                                        {user ? (
                                            ''
                                        ) : (
                                            <span className="text-[18px]">
                                                <FormattedMessage id="Retail_customer" />
                                            </span>
                                        )}
                                    </h3>
                                    <ModalUser setUser={setUser} />
                                </div>
                                {user ? (
                                    <div className="relative flex items-center gap-x-5 mt-8">
                                        <img src={user?.avatar_url} alt="" className="w-[60px] h-[60px] object-cover" />
                                        <div>
                                            <p className="color-primary text-[16px]">
                                                <span className="font-medium">
                                                    <FormattedMessage id="admin.user" />
                                                </span>{' '}
                                                : {user?.name}
                                            </p>
                                            <p className="color-primary text-[16px]">
                                                <span className="font-medium">Email</span> : {user?.email}
                                            </p>
                                            <p className="color-primary text-[16px]">
                                                <span className="font-medium">
                                                    <FormattedMessage id="admin.groups" />
                                                </span>{' '}
                                                : {user?.group?.group_name}
                                            </p>
                                        </div>
                                        <CircleX
                                            onClick={() => setUser(null)}
                                            className="absolute w-6 right-0 top-0 hover:cursor-pointer hover:opacity-60 transition-global"
                                        />
                                    </div>
                                ) : (
                                    ''
                                )}
                                <div className="flex items-center justify-between mt-8">
                                    <h3 className="font-medium color-primary text-[16px]">
                                        <FormattedMessage id="Delivery" /> :
                                    </h3>
                                    <Switch
                                        className="w- text-16px font-medium"
                                        onChange={(value: boolean) => {
                                            setInfoShip(value);
                                            setFee([]);
                                        }}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center justify-between my-8 gap-x-5">
                                        <div className="w-10/12">
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
                                                    className="w-full h-[45px]"
                                                    onChange={(e: any) => setCode(e.target.value)}
                                                />
                                            </ConfigProvider>
                                        </div>
                                        <div className="w-2/12">
                                            <Button
                                                className="transition-global h-[45px] w-full text-[16px] font-medium"
                                                onClick={handleGetVoucher}
                                            >
                                                {loadingVoucher ? (
                                                    <LoadingSmall color="color-primary" />
                                                ) : (
                                                    <FormattedMessage id="Get" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between py-5 border-b">
                                    <h3 className="font-medium color-primary text-[16px]">
                                        <FormattedMessage id="Total_merchandise_amount" /> :
                                    </h3>
                                    <p className="font-medium color-primary text-[16px]">
                                        {formatPrice(handleTotalPrice)}đ
                                    </p>
                                </div>
                                {voucher.discount ? (
                                    <div className="flex items-center justify-between py-5 border-b">
                                        <h3 className="font-medium color-primary text-[16px]">
                                            <FormattedMessage id="voucher" /> :
                                        </h3>
                                        <p className="font-medium color-primary text-[16px] flex items-center gap-x-1">
                                            -
                                            {voucher.type === 'fixed'
                                                ? formatPrice(voucher.discount)
                                                : `${voucher.discount}%`}
                                            <CircleX
                                                onClick={() => setVoucher([])}
                                                className="w-6 hover:cursor-pointer hover:opacity-60 transition-global"
                                            />
                                        </p>
                                    </div>
                                ) : (
                                    ''
                                )}
                                {fee?.total ? (
                                    <div className="flex items-center justify-between py-5 border-b">
                                        <h3 className="font-medium color-primary text-[16px]">
                                            <FormattedMessage id="Shipping_Cost" /> :
                                        </h3>
                                        <p className="font-medium color-primary text-[16px]">
                                            {totalAmount >= FREE_SHIP ? 'Free ship' : `${formatPrice(fee.total)}đ`}
                                        </p>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <div className="flex items-center justify-between py-5 border-b mb-10">
                                    <h3 className="font-medium color-primary text-[16px]">
                                        <FormattedMessage id="box.Cart.Total" /> :
                                    </h3>
                                    <p className="font-medium text-red-500 text-[28px]">{formatPrice(totalAmount)}đ</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-center gap-x-5 my-10">
                                    <button
                                        onClick={() => setPaymentMethod(paymentMehtods.cash_on_delivery)}
                                        className={`px-5 py-3 rounded-lg ${
                                            paymentMethod === paymentMehtods.cash_on_delivery
                                                ? 'bg-primary'
                                                : 'bg-gray opacity-80'
                                        }  text-white flex items-center gap-x-5 font-medium
                                    transition-global`}
                                    >
                                        <FormattedMessage id="Cash" />
                                        <CircleDollarSign />
                                    </button>
                                    {totalAmount > 10000 ? (
                                        <button
                                            onClick={() => setPaymentMethod(paymentMehtods.banking)}
                                            className={`px-5 py-3 rounded-lg ${
                                                paymentMethod === paymentMehtods.banking
                                                    ? 'bg-primary'
                                                    : 'bg-gray opacity-80'
                                            } text-white flex items-center gap-x-5 font-medium
                                                                        transition-global`}
                                        >
                                            QR
                                            <QrCode />
                                        </button>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div>
                                    {paymentMethod === paymentMehtods.banking ? (
                                        <img
                                            src={`https://img.vietqr.io/image/vietinbank-113366668888-compact2.jpg?amount=${totalAmount}&addInfo=dong%20gop%20quy%20vac%20xin&accountName=Thanh%20toan%20don%20hang`}
                                            alt=""
                                        />
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                            {paymentMethod === paymentMehtods.banking ? (
                                ''
                            ) : (
                                <ButtonSubmit
                                    loading={loadingCheckOut}
                                    width="w-full"
                                    onClick={() => {
                                        form.submit();
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default FormOrder;
