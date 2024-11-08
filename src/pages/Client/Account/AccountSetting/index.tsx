import {Input, Select, DatePicker, Button, Form} from 'antd';
import {
    UserOutlined,
    CreditCardOutlined,
    HomeOutlined,
    ShoppingOutlined,
    MailOutlined,
    EyeOutlined,
    LinkOutlined,
} from '@ant-design/icons';
import useProfile from "../../../../hooks/page/useProfile.tsx";
import {IUser} from "../../../../interfaces/IUser.ts";
import {useEffect, useState} from "react";
import useCountry from "../../../../hooks/useCountry.tsx";
import LoadingSmall from "../../../../components/Loading/LoadingSmall.tsx";
import {tokenManagerInstance} from "../../../../api";
import {useNavigate} from "react-router-dom";
import {geonameCountry, geonameProvince} from "../../../../interfaces/GeoNames/IGeoNames.ts";

interface DataChangePassword {
    password: string,
    newPassword: string,
    confirmPassword: string,
}



const {Option} = Select;

const AccountSetting = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [updateProfileForm] = Form.useForm();
    const {currentUser} = useProfile();
    const {countries,provinces,getProvinces} = useCountry();


    //
    const [selectedCountryGeonameId,setSelectedCountryGeonameId] = useState('');
    const [selectedProvince,setSelectedProvince] = useState('');
    const onFinishUpdateProfile = async (data: IUser) => {
        console.log(data);
    }
    const onChangeCountry = (value:string) => {
        console.log(selectedCountryGeonameId);
        setSelectedCountryGeonameId(value);
        getProvinces(value);
    }
    useEffect(() => {
        if(provinces){
            setSelectedProvince(provinces[0]?.geonameId);
        }
    }, [provinces]);
    const onChangeProvince = (value:string) => {
        setSelectedProvince(value);
    }
    //Change password handling
    const changePassword = async (data: { password: string, newPassword: string }) => {
        try {
            setLoading(true);
            await tokenManagerInstance('post', 'api/change-password', data);
            alert('Changed password Successfully!')
            navigate("/profile/setting");
        } catch (error) {
            const e = error as e;
            const {data} = e.response;
            console.log(data);
            alert(data.message);

        } finally {
            setLoading(false);
        }
    }
    const [displayPasswordForm, setDisplayPasswordForm] = useState(false);
    const [changePasswordForm] = Form.useForm();
    const onFinishChangePassword = async (values: DataChangePassword) => {
        await changePassword(values);
        changePasswordForm.resetFields();
        setDisplayPasswordForm(false);
    };

    let userD: IUser = {
        id: "",
        avatar_url: "",
        nickname: "",
        name: "",
        email: "",
        email_verified_at: "",
        google_id: "",
        status: "",
        profile: [],
        favoriteProducts: [],
        created_at: ""
    };
    if (currentUser) {
        userD = currentUser;
    }

    return (

        <div
            className="flex w-full flex-col md:flex-row p-4 space-y-6 md:space-y-0 md:space-x-6 bg-gray-100 min-h-screen  ">
            {/* change password form */}
            {displayPasswordForm ? (
                <div
                    className="fixed top-0 bottom-0 right-0 left-0 bg-gray-100 bg-opacity-80 z-10 flex items-center justify-center">

                    <div className="w-[40%] bg-white rounded-lg p-8 relative">
                        <button onClick={() => setDisplayPasswordForm(false)}
                                className="absolute top-1 right-1 size-10 bg-black text-white flex items-center justify-center rounded-3xl hover:bg-gray-200">X
                        </button>
                        <Form labelCol={{span: 24}}
                              wrapperCol={{span: 24}}
                              form={changePasswordForm}
                              onFinish={onFinishUpdateProfile}
                              name="change-password"
                        >
                            <div className="my-8">
                                <Form.Item label="Current password" name="password" rules={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter your password"
                                        },

                                    ]
                                }>
                                    <Input.Password placeholder="Current password"
                                                    className="w-full border border-black h-20"/>
                                </Form.Item>
                            </div>
                            <div className="my-8">
                                <Form.Item label="New password" name="newPassword" rules={
                                    [
                                        {
                                            required: true,
                                            message: "Please enter your password"
                                        },
                                        {
                                            min: 8,
                                            message: "Minimum of 8 characters"
                                        }

                                    ]
                                }>
                                    <Input.Password placeholder="New password"
                                                    className="w-full border border-black h-20"/>
                                </Form.Item>
                            </div>
                            <div className="my-8">
                                <Form.Item label="Confirm new password" dependencies={['newPassword']}
                                           name="confirmedPassword"
                                           rules={
                                               [
                                                   {
                                                       required: true,
                                                       message: "Please enter your password"
                                                   },
                                                   ({getFieldValue}) => ({
                                                       validator(_, value) {
                                                           if (!value || getFieldValue('newPassword') === value) {
                                                               return Promise.resolve();
                                                           }
                                                           return Promise.reject(new Error('Passwords do not match!'));
                                                       },
                                                   }),
                                               ]
                                           }>
                                    <Input.Password placeholder="Confirm new password"
                                                    className="w-full border border-black h-20"/>
                                </Form.Item>
                            </div>
                            <div className="flex justify-end">
                                <Form.Item>
                                    <Button className="rounded-3xl bg-black w-32 h-16 " type="primary"
                                            htmlType="submit">
                                        {loading ? <LoadingSmall/> : 'Submit'}
                                    </Button>
                                </Form.Item>

                            </div>
                        </Form>
                    </div>
                </div>

            ) : ''}
            {/* Sidebar */}
            <div className="w-full md:w-1/4 ml-12 text-2xl">
                <ul className="space-y-4">
                    <li className="font-bold">Settings</li>
                    <li className="flex items-center space-x-2">
                        <UserOutlined/>

                        <span>Account Details</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <CreditCardOutlined/>
                        <span>Payment Methods</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <HomeOutlined/>
                        <span>Delivery Addresses</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <ShoppingOutlined/>
                        <span>Shop Preferences</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <MailOutlined/>
                        <span>Communication Preferences</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <EyeOutlined/>
                        <span>Profile Visibility</span>
                    </li>
                    <li className="flex items-center space-x-2">
                        <LinkOutlined/>
                        <span>Linked Accounts</span>
                    </li>
                </ul>
            </div>

            {/* Account Details Form */}
            <div className="w-full md:w-1/2 bg-white p-6 shadow-md rounded-lg">
                <h1 className="text-5xl font-semibold mb-4">Account Details</h1>

                <Form
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    form={updateProfileForm}
                    onFinish={onFinishChangePassword}
                    name="change-password"
                >
                    {/* Các trường nhập */}
                    <div className="my-8">
                        <label className="block text-gray-700 mb-6">Email</label>
                        <Input value={userD.email}
                               className="w-full border border-black h-20"
                               placeholder="Enter your email"
                               defaultValue="trinhhiepb98@gmail.com"
                        />
                    </div>
                    <div className="my-8">
                        <label className="block text-gray-700 mb-4">Password</label>
                        <div className="flex">
                            <Input type="password" value="12345678" readOnly={true}
                                   className="w-full border border-none h-20"
                                   placeholder="Enter your password"
                            />
                            <Button
                                onClick={() => {
                                    setDisplayPasswordForm(!displayPasswordForm)
                                }}
                                className="mt-2 text-black bg-white border border-black"
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-4 text-2xl">Date of Birth</label>
                        <DatePicker
                            className="w-full border border-black h-20"
                            placeholder="Select your birth date"
                        />
                    </div>
                    <h3 className="text-3xl font-semibold mb-2">Location</h3>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-2xl">Country/Region</label>
                        <Select
                            showSearch={true}
                            className="w-full h-20 "
                            defaultValue="Choosing your country"
                            optionFilterProp="children"
                            onChange={onChangeCountry}
                            filterOption={(input, option) => {
                                const {children} = option;
                                const name = children.props.children[0];
                                return name.toLowerCase().includes(input.toLowerCase()) || false
                            }}
                        >
                            {countries.map((country:geonameCountry, index) => (
                                <Option key={index} value={`${country?.geonameId}`}>
                                    <div className="flex items-center">
                                        {country?.countryName}
                                        <img src={`https://flagsapi.com/${country?.countryCode}/flat/64.png`}
                                             className="mx-4 size-6"/>
                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 text-2xl">Province</label>
                        <Select
                            showSearch={true}
                            className="w-full h-20"
                            value={selectedProvince}
                            optionFilterProp="children"
                            onChange={onChangeProvince}
                            filterOption={(input, option) => {
                                const {children} = option;
                                const name = children.props.children[0];
                                return name.toLowerCase().includes(input.toLowerCase()) || false
                            }}
                        >
                            {provinces.map((province:geonameProvince, index) => (
                                <Option key={index} value={province?.geonameId}>
                                    <div className="flex items-center">
                                        {province?.toponymName}

                                    </div>
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-4">City</label>
                        <Input className="w-full border border-black" placeholder="Enter your city"/>
                    </div>


                    <div className="mb-4">
                        <label className="block text-gray-700 mb-4">Postcode</label>
                        <Input className="w-full border border-black" placeholder="Enter your postcode"/>
                    </div>


                    <hr className="my-4"/>
                    <div className="flex mt-4">
                        <Button type="default" className="rounded-3xl text-black bg-white border border-black ml-auto">
                            Save
                        </Button>
                    </div>

                </Form>


            </div>


        </div>
    );
};

export default AccountSetting;
