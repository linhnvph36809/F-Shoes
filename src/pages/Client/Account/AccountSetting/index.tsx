import { Input, Select, DatePicker, Button, Form, Skeleton } from 'antd';
import useProfile from '../../../../hooks/page/useProfile.tsx';
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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [updateProfileForm] = Form.useForm();
    const { updateProfile, loadingUpdate } = useProfile();
    const { data, isFetching,refetch } = useQueryConfig('user-setting', 'api/auth/me?include=profile,times=user');
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
    console.log(initialValues,'value');
    
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
          
            showMessageClient('Change Password','Changed password Successfully!','success');
            navigate('/profile/setting');
            refetch();
        } catch (error) {
            const e = error as any;
            const { data } = e.response;
          
            showMessageClient('Change Password',data.message,'error');
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
                            <div className="my-8">
                                <Form.Item
                                    label="Current password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your password',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="Current password"
                                        className="w-full border border-black h-20"
                                    />
                                </Form.Item>
                            </div>
                            <div className="my-8">
                                <Form.Item
                                    label="New password"
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your password',
                                        },
                                        {
                                            min: 8,
                                            message: 'Minimum of 8 characters',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        placeholder="New password"
                                        className="w-full border border-black h-20"
                                    />
                                </Form.Item>
                            </div>
                            <div className="my-8">
                                <Form.Item
                                    label="Confirm new password"
                                    dependencies={['newPassword']}
                                    name="confirmedPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your password',
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
                                        placeholder="Confirm new password"
                                        className="w-full border border-black h-20"
                                    />
                                </Form.Item>
                            </div>
                            <div className="flex justify-end">
                                <Form.Item>
                                    <Button
                                        className="rounded-3xl bg-black w-32 h-16 "
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        {loading ? <LoadingSmall /> : 'Submit'}
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
                            <label className="block text-gray-700 mb-2 text-2xl">Country/Region</label>
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
                                <label className="block text-gray-700 mb-2 text-2xl">Province</label>
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
                <h1 className="text-5xl font-semibold mb-4">Account Details</h1>
                
                <Form
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    form={updateProfileForm}
                    onFinish={onFinishUpdateProfile}
                    name="update-profile"
                    key={JSON.stringify(initialValues)}
                    initialValues={initialValues}
                >
                    {/* Các trường nhập */}
                    <div>
                        
                    </div>
                    <div className="my-8">
                        <Form.Item label="Given Name" name="given_name">
                            <Input type="text" placeholder="Given name" className="w-full border border-black h-20" />
                        </Form.Item>
                    </div>
                    <div className="my-8">
                        <Form.Item label="Family Name" name="family_name">
                            <Input type="text" placeholder="Family name" className="w-full border border-black h-20" />
                        </Form.Item>
                    </div>
                    <div className="my-8">
                        <label className="block text-gray-700 mb-6">Email</label>
                        <Input
                            value={userD.email}
                            readOnly
                            className="w-full border border-none h-20"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="my-8">
                        <label className="block text-gray-700 mb-4">Password</label>
                        <div className="flex">
                            <Input
                                type="password"
                                value="12345678"
                                readOnly={true}
                                className="w-full border border-none h-20"
                                placeholder="Enter your password"
                            />
                            <Button
                                onClick={() => {
                                    setDisplayPasswordForm(!displayPasswordForm);
                                }}
                                className="mt-2 text-black bg-white border border-black"
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                    <div className="my-8">
                        <Form.Item
                            label="Date of Birth"
                            name="birth_date"
                            rules={[{ type: 'object', message: 'Please enter valid time' }]}
                        >
                            <DatePicker className="w-full border border-black h-20" />
                        </Form.Item>
                    </div>

                    <h3 className="text-3xl font-semibold mb-2">Location</h3>
                    <div className="my-8">
                        <Form.Item label="Address " name="detail_address">
                            <Input type="text" placeholder="Address" className="w-full border border-black h-20" />
                        </Form.Item>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => {
                                    setDisplayAddressForm(!displayPasswordForm);
                                }}
                                className=" h-10 text-black bg-white rounded-3xl border border-black "
                            >
                                Choosing Address
                            </Button>
                        </div>
                    </div>

                    <hr className="my-4" />
                    <div className="flex mt-4 justify-end">
                        <Form.Item className="mt-10">
                            <ButtonPrimary htmlType="submit" width="w-[120px] h-[56px]">
                                {loadingUpdate ? <LoadingSmall /> : 'Save'}
                            </ButtonPrimary>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AccountSetting;
