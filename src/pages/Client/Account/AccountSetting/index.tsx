import {Input, Select, DatePicker, Button} from 'antd';
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
import ChangePasswordForm from "./components/ChangePasswordForm";
import {useState} from "react";
import useCountry from "../../../../hooks/useCountry.tsx";

const {Option} = Select;

const AccountSetting = () => {
    //const [form] = Form.useForm();
    const {currentUser} = useProfile();
    const {countries} = useCountry();
   // console.log(countries);
    const [displayPasswordForm, setDisplayPasswordForm] = useState(false);
    let userD:IUser = {
        id: "",
        avatar_url: "",
        nickname:"",
        name:"",
        email: "",
        email_verified_at: "",
        google_id: "",
        status:"",
        profile: [],
        favoriteProducts: [],
        created_at: ""
    };
    if(currentUser){
        userD = currentUser;
    }

    return (

        <div className="flex w-full flex-col md:flex-row p-4 space-y-6 md:space-y-0 md:space-x-6 bg-gray-100 min-h-screen  ">
            <ChangePasswordForm hidden={displayPasswordForm}/>
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
                            onClick={() => setDisplayPasswordForm(!displayPasswordForm)}
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
                    <Select className="w-full" defaultValue="Vietnam">
                        {countries.map((country) => (
                            <Option value={country?.ccas}>{country?.name?.common}</Option>
                        ))}


                    </Select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-4">Province</label>
                    <Select className="w-full" placeholder="Select your province">
                        <Option value="Hanoi">Hà Nội</Option>
                        <Option value="Ho Chi Minh">Thành phố Hồ Chí Minh</Option>
                        <Option value="Da Nang">Đà Nẵng</Option>
                        <Option value="Hai Phong">Hải Phòng</Option>
                        <Option value="Can Tho">Cần Thơ</Option>
                        {/* Thêm nhiều tỉnh thành khác nếu cần */}
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
                <div className="flex items-center justify-between mt-4">
                    <h1 className="text-3xl font-semibold text-black-600">Delete</h1>
                    <Button type="default" className="text-black bg-white border border-black">
                        Delete Account
                    </Button>
                </div>


                <hr className="my-4"/>
                <div className="flex mt-4">
                    <Button type="default" className="text-black bg-white border border-black ml-auto">
                        Save Changes
                    </Button>
                </div>


            </div>


        </div>
    );
};

export default AccountSetting;
