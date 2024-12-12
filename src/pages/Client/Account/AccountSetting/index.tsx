import { Input, Select, DatePicker, Button, Form, Skeleton } from 'antd';
import useProfile, { QUERY_KEY as QUERY_KEY_PROFILE } from '../../../../hooks/page/useProfile.tsx';
import dayjs from 'dayjs';
import { IUser } from '../../../../interfaces/IUser.ts';
import { useEffect, useState } from 'react';
import useCountry from '../../../../hooks/useCountry.tsx';
import LoadingSmall from '../../../../components/Loading/LoadingSmall.tsx';
import { tokenManagerInstance } from '../../../../api';
import { useNavigate } from 'react-router-dom';
import { geonameCountry, geonameProvince } from '../../../../interfaces/GeoNames/IGeoNames.ts';
import useQueryConfig from '../../../../hooks/useQueryConfig.tsx';
import ButtonPrimary from '../../../../components/Button/index.tsx';
import { showMessageClient } from '../../../../utils/messages.ts';
import { FormattedMessage, useIntl } from 'react-intl';
interface DataChangePassword {
    password: string;
    newPassword: string;
    confirmPassword: string;
}

interface DataUpdateProfile {
    given_name: string;
    family_name: string;
    birth_date: string;
    detail_address: string;
}

const { Option } = Select;

const AccountSetting = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [updateProfileForm] = Form.useForm();
    const { updateProfile, loadingUpdate } = useProfile();
    const { data, isFetching, refetch } = useQueryConfig([QUERY_KEY_PROFILE,'user-setting'], 'api/auth/me?include=profile,times=user');
    const [userD, setUserD] = useState<IUser>();

    useEffect(() => {
        if (data?.data.user) {
            setUserD(data?.data.user);
        }
    }, [data?.data.user]);
    // update profile
    const [initialValues, setInitialValues] = useState({});

    const [userAddress, setUserAddress] = useState<string>('');
    useEffect(() => {
        setInitialValues({
            given_name: data?.data.user?.profile?.given_name,
            family_name: data?.data.user?.profile?.family_name,
            birth_date: data?.data.user?.profile?.birth_date ? dayjs(data?.data.user?.profile?.birth_date) : null,
            detail_address: data?.data.user?.profile?.detail_address,
        });
        if (initialValues) {
            updateProfileForm.setFieldsValue(initialValues);
        }
    }, [userD, data?.data.user]);
    console.log(initialValues, 'value');

    if (userAddress) {
        updateProfileForm.setFieldValue('detail_address', userAddress);
    }

    const onFinishUpdateProfile = async (data: DataUpdateProfile) => {
        let date;
        if (data.birth_date) {
            date = (data.birth_date as any)?.format('YYYY-MM-DD');
        }
        const updateData = {
            given_name: data.given_name,
            family_name: data.family_name,
            detail_address: data.detail_address,
            birth_date: date,
        };
        setInitialValues({
            given_name: data.given_name,
            family_name: data.family_name,
            detail_address: data.detail_address,
            birth_date: data.birth_date,
        });
        const updateUser = await updateProfile(updateData);
        if (updateUser?.name) {
            setUserD(updateUser);
        }
        refetch();
    };
    // Address
    const {
        thisDeviceAddressGeoname,
        setThisDeviceAddressGeoname,
        countries,
        provinces,
        getProvinces,
        districts,
        getDistricts,
        communes,
        getCommunes,
    } = useCountry();

    const [selectedCountryGeonameId, setSelectedCountryGeonameId] = useState('');
    const [selectedProvinceGeonameId, setSelectedProvinceGeonameId] = useState('');
    const [selectedDistrictGeonameId, setSelectedDistrictGeonameId] = useState('');
    const [selectedCommuneGeonameId, setSelectedCommuneGeonameId] = useState('');
    const onChangeCountry = (value: string) => {
        setSelectedCountryGeonameId(value);
        getProvinces(value);
        setSelectedProvinceGeonameId('');
        setSelectedDistrictGeonameId('');
        setSelectedCommuneGeonameId('');
    };
    const onChangeProvince = (value: string) => {
        setSelectedProvinceGeonameId(value);
        getDistricts(value);
        setSelectedDistrictGeonameId('');
        setSelectedCommuneGeonameId('');
    };
    const onChangeDistrict = (value: string) => {
        setSelectedDistrictGeonameId(value);
        getCommunes(value);
        setSelectedCommuneGeonameId('');
    };
    const onChangeCommune = (value: string) => {
        setSelectedCommuneGeonameId(value);
    };
    useEffect(() => {
        getProvinces(selectedCountryGeonameId);
        getDistricts(selectedProvinceGeonameId);
    }, [selectedCountryGeonameId, selectedProvinceGeonameId, selectedDistrictGeonameId]);

    useEffect(() => {
        if (thisDeviceAddressGeoname) {
            setSelectedCountryGeonameId(thisDeviceAddressGeoname?.geonameId);
            if (thisDeviceAddressGeoname?.geonameId) {
                getProvinces(thisDeviceAddressGeoname?.geonameId);
            }
            setThisDeviceAddressGeoname(undefined);
        }
    }, [thisDeviceAddressGeoname]);
    const handleSaveAddress = () => {
        let country;
        let province;
        let district;
        let commune;
        let address = '';
        if (selectedCommuneGeonameId) {
            country = countries.find((country) => country.geonameId === selectedCountryGeonameId);
            if (country?.countryName) {
                address = country?.countryName;
            }
        }
        if (selectedProvinceGeonameId) {
            province = provinces.find((province) => province.geonameId === selectedProvinceGeonameId);
            if (province?.toponymName) {
                address = `${province?.toponymName}, ${address}`;
            }
        }
        if (selectedDistrictGeonameId) {
            district = districts.find((district) => district.geonameId === selectedDistrictGeonameId);
            if (district?.toponymName) {
                address = `${district?.toponymName}, ${address}`;
            }
        }
        if (selectedCommuneGeonameId) {
            commune = communes.find((commune) => commune.geonameId === selectedCommuneGeonameId);
            if (commune?.toponymName) {
                address = `${commune?.toponymName}, ${address}`;
            }
        }
        setUserAddress(address);
        setDisplayAddressForm(false);
    };

    //Change password handling
    const changePassword = async (data: { password: string; newPassword: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', 'api/change-password', data);
            showMessageClient('Change Password', 'Changed password Successfully!', 'success');
            navigate('/profile/setting');
            refetch();
        } catch (error) {
            const e = error as any;
            const { data } = e.response;

            showMessageClient('Change Password', data.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    const [displayAddressForm, setDisplayAddressForm] = useState(false);
    const [displayPasswordForm, setDisplayPasswordForm] = useState(false);
    const [changePasswordForm] = Form.useForm();
    const onFinishChangePassword = async (values: DataChangePassword) => {
        await changePassword(values);
        changePasswordForm.resetFields();
        setDisplayPasswordForm(false);
    };
    if (isFetching || !userD) {
        return <Skeleton className="my-8" />;
    }
    return (
        <div className="flex w-full flex-col md:flex-row p-4 space-y-6 md:space-y-0 md:space-x-6 bg-gray-100 min-h-screen items-center justify-center">
            {/* change password form */}
            {displayPasswordForm ? (
                <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-100 bg-opacity-80 z-10 flex items-center justify-center">
                    <div className="w-[40%] bg-white rounded-lg p-8 relative">
                        <button
                            onClick={() => setDisplayPasswordForm(false)}
                            className="absolute top-1 right-1 size-10 bg-black text-white flex items-center justify-center rounded-3xl hover:bg-gray-200"
                        >
                            X
                        </button>
                        <Form
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            form={changePasswordForm}
                            onFinish={onFinishChangePassword}
                            name="change-password"
                        >
                            {/* Current Password Field */}
                            <div className="my-8">
                                <Form.Item
                                    label={<FormattedMessage id="currentPassword" />}
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: <FormattedMessage id="pleaseEnterPassword" />,
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={intl.formatMessage({ id: 'currentPasswordPlaceholder' })}
                                        className="w-full border border-black h-20"
                                    />
                                </Form.Item>
                            </div>

                            {/* New Password Field */}
                            <div className="my-8">
                                <Form.Item
                                    label={<FormattedMessage id="newPassword" />}
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: <FormattedMessage id="pleaseEnterPassword" />,
                                        },
                                        {
                                            min: 8,
                                            message: <FormattedMessage id="minimumCharacters" />,
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={intl.formatMessage({ id: 'newPasswordPlaceholder' })}
                                        className="w-full border border-black h-20"
                                    />
                                </Form.Item>
                            </div>

                            {/* Confirm New Password Field */}
                            <div className="my-8">
                                <Form.Item
                                    label={<FormattedMessage id="confirmNewPassword" />}
                                    dependencies={['newPassword']}
                                    name="confirmedPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: <FormattedMessage id="pleaseEnterPassword" />,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Passwords do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        placeholder={intl.formatMessage({ id: 'confirmNewPasswordPlaceholder' })}
                                        className="w-full border border-black h-20"
                                    />
                                </Form.Item>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end">
                                <Form.Item>
                                    <Button className="rounded-3xl bg-black w-32 h-16" type="primary" htmlType="submit">
                                        {loading ? <LoadingSmall /> : <FormattedMessage id="submit" />}
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>
            ) : (
                ''
            )}
            {displayAddressForm ? (
                <div className="fixed top-0 bottom-0 right-0 left-0 bg-gray-100 bg-opacity-80 z-10 flex items-center justify-center">
                    <div className="w-[40%] bg-white rounded-lg p-8 relative">
                        <button
                            onClick={() => setDisplayAddressForm(false)}
                            className="absolute top-1 right-1 size-10 bg-black text-white flex items-center justify-center rounded-3xl hover:bg-gray-200"
                        >
                            X
                        </button>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2 text-2xl">
                                {<FormattedMessage id="Country/Region" />}
                            </label>
                            <Select
                                showSearch={true}
                                className="w-full h-20 "
                                value={selectedCountryGeonameId}
                                optionFilterProp="children"
                                onChange={onChangeCountry}
                                filterOption={(input, option) => {
                                    const children = option?.children as any;
                                    const name: string = children?.props?.children[0];
                                    return name?.toLowerCase().includes(input.toLowerCase()) || false;
                                }}
                            >
                                {countries
                                    ? countries.map((country: geonameCountry, index) => (
                                          <Option key={index} value={country?.geonameId}>
                                              <div className="flex items-center">
                                                  {country?.countryName}
                                                  <img
                                                      src={`https://flagsapi.com/${country?.countryCode}/flat/64.png`}
                                                      className="mx-4 size-6"
                                                  />
                                              </div>
                                          </Option>
                                      ))
                                    : ''}
                            </Select>
                        </div>

                        {provinces && provinces.length > 0 ? (
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2 text-2xl">
                                    {<FormattedMessage id="Province" />}
                                </label>
                                <Select
                                    showSearch={true}
                                    className="w-full h-20"
                                    value={selectedProvinceGeonameId}
                                    optionFilterProp="children"
                                    onChange={onChangeProvince}
                                    filterOption={(input, option) => {
                                        const children = option?.children as any;
                                        const name = children?.props?.children;
                                        return name.toLowerCase().includes(input.toLowerCase()) || false;
                                    }}
                                >
                                    {provinces
                                        ? provinces.map((province: geonameProvince, index) => (
                                              <Option key={index} value={province?.geonameId}>
                                                  <div className="flex items-center">{province?.toponymName}</div>
                                              </Option>
                                          ))
                                        : ''}
                                </Select>
                            </div>
                        ) : (
                            ''
                        )}

                        {districts && districts.length > 0 ? (
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2 text-2xl">District</label>
                                <Select
                                    showSearch={true}
                                    className="w-full h-20"
                                    value={selectedDistrictGeonameId}
                                    optionFilterProp="children"
                                    onChange={onChangeDistrict}
                                    filterOption={(input, option) => {
                                        const children = option?.children as any;
                                        const name = children?.props?.children;
                                        return name.toLowerCase().includes(input.toLowerCase()) || false;
                                    }}
                                >
                                    {districts
                                        ? districts.map((district: geonameProvince, index) => (
                                              <Option key={index} value={district?.geonameId}>
                                                  <div className="flex items-center">{district?.toponymName}</div>
                                              </Option>
                                          ))
                                        : ''}
                                </Select>
                            </div>
                        ) : (
                            ''
                        )}
                        {communes && communes.length > 0 ? (
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2 text-2xl">Commune</label>
                                <Select
                                    showSearch={true}
                                    className="w-full h-20"
                                    value={selectedCommuneGeonameId}
                                    optionFilterProp="children"
                                    onChange={onChangeCommune}
                                    filterOption={(input, option) => {
                                        const children = option?.children as any;
                                        const name = children?.props?.children;
                                        return name.toLowerCase().includes(input.toLowerCase()) || false;
                                    }}
                                >
                                    {communes
                                        ? communes.map((district: geonameProvince, index) => (
                                              <Option key={index} value={district?.geonameId}>
                                                  <div className="flex items-center">{district?.toponymName}</div>
                                              </Option>
                                          ))
                                        : ''}
                                </Select>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="flex justify-end">
                            <Button className="rounded-3xl" onClick={handleSaveAddress}>
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
            <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-lg">
                <h1 className="text-[32px] font-semibold mb-4">
                    <FormattedMessage id="accountDetails" />
                </h1>

                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    form={updateProfileForm}
                    onFinish={onFinishUpdateProfile}
                    name="update-profile"
                    key={JSON.stringify(initialValues)}
                    initialValues={initialValues}
                >
                    {/* Given Name Field */}
                    <div className="my-8">
                        <Form.Item label={<FormattedMessage id="givenName" />} name="given_name">
                            <Input
                                type="text"
                                placeholder={intl.formatMessage({ id: 'givenNamePlaceholder' })}
                                className="w-full border border-black h-20"
                            />
                        </Form.Item>
                    </div>

                    {/* Family Name Field */}
                    <div className="my-8">
                        <Form.Item label={<FormattedMessage id="familyName" />} name="family_name">
                            <Input
                                type="text"
                                placeholder={intl.formatMessage({ id: 'familyNamePlaceholder' })}
                                className="w-full border border-black h-20"
                            />
                        </Form.Item>
                    </div>

                    {/* Email Field */}
                    <div className="my-8">
                        <label className="block text-gray-700 mb-6">
                            <FormattedMessage id="email" />
                        </label>
                        <Input
                            value={userD.email}
                            readOnly
                            className="w-full border border-none h-20"
                            placeholder={intl.formatMessage({ id: 'emailPlaceholder' })}
                        />
                    </div>

                    {/* Password Field */}
                    <div className="my-8">
                        <label className="block text-gray-700 mb-4">
                            <FormattedMessage id="password" />
                        </label>
                        <div className="flex">
                            <Input
                                type="password"
                                value="12345678"
                                readOnly={true}
                                className="w-full border border-none h-20"
                                placeholder={intl.formatMessage({ id: 'enterPassword' })}
                            />
                            <Button
                                onClick={() => setDisplayPasswordForm(!displayPasswordForm)}
                                className="mt-2 text-black bg-white border border-black"
                            >
                                <FormattedMessage id="edit" />
                            </Button>
                        </div>
                    </div>

                    {/* Date of Birth Field */}
                    <div className="my-8">
                        <Form.Item
                            label={<FormattedMessage id="dateOfBirth" />}
                            name="birth_date"
                            rules={[{ type: 'object', message: <FormattedMessage id="validTimevMessage" /> }]}
                        >
                            <DatePicker className="w-full border border-black h-20" />
                        </Form.Item>
                    </div>

                    {/* Location Section */}
                    <h3 className="text-3xl font-semibold mb-2">
                        <FormattedMessage id="location" />
                    </h3>
                    <div className="my-8">
                        <Form.Item label={<FormattedMessage id="address" />} name="detail_address">
                            <Input
                                type="text"
                                placeholder={intl.formatMessage({ id: 'address' })}
                                className="w-full border border-black h-20"
                            />
                        </Form.Item>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => setDisplayAddressForm(!displayPasswordForm)}
                                className="h-10 text-black bg-white rounded-3xl border border-black"
                            >
                                <FormattedMessage id="choosingAddress" />
                            </Button>
                        </div>
                    </div>

                    <hr className="my-4" />
                    <div className="flex mt-4 justify-end">
                        <Form.Item className="mt-10">
                            <ButtonPrimary htmlType="submit" width="w-[120px] h-[56px]">
                                {loadingUpdate ? <LoadingSmall /> : <FormattedMessage id="save" />}
                            </ButtonPrimary>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AccountSetting;
