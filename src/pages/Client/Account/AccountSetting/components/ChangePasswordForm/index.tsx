import {Button, Form, Input} from "antd";
import React, {useEffect, useState} from "react";
import LoadingSmall from "../../../../../../components/Loading/LoadingSmall.tsx";
import useProfile from "../../../../../../hooks/page/useProfile.tsx";
import Data from "../../../../../Admin/Groups/listgroup/data.tsx";

interface Props{
    hidden: boolean,

}
interface Data{
    password: string,
    newPassword: string,
    confirmPassword: string,
}

const ChangePasswordForm:React.FC<Props> = ({hidden}) => {
    const [form] = Form.useForm();
    const [display, setDisplay] = useState(false);
    const {changePassword, loading} = useProfile();
    useEffect(() => {
        setDisplay(hidden)
    }, [hidden]);
    const onFinish = async (values: Data) => {
       changePassword(values);
    };
    if(!display){
        return ;
    }

    return (
        <div
            className="fixed top-0 bottom-0 right-0 left-0 bg-gray-100 bg-opacity-80 z-10 flex items-center justify-center">

            <div className="w-[40%] bg-white rounded-lg p-8 relative">
                <button onClick={() => setDisplay(!hidden)} className="absolute top-1 right-1 size-10 bg-black text-white flex items-center justify-center rounded-3xl hover:bg-gray-200">X</button>
                <Form labelCol={{span: 24}}
                      wrapperCol={{span: 24}}
                      form={form}
                      onFinish={onFinish}
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
                            <Input.Password placeholder="Current password" className="w-full border border-black h-20"/>
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
                            <Input.Password placeholder="New password" className="w-full border border-black h-20"/>
                        </Form.Item>
                    </div>
                    <div className="my-8">
                        <Form.Item label="Confirm new password" dependencies={['newPassword']} name="confirmedPassword"
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
                            <Button className="rounded-3xl bg-black w-32 h-16 " type="primary" htmlType="submit">
                                {loading ? <LoadingSmall/> : 'Submit'}
                            </Button>
                        </Form.Item>

                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;