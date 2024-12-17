import { ConfigProvider, Form, Select } from 'antd';

const SelectPrimary = ({ width = '100%', name, label, rules, options, placeholder, ...props }: any) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBorder: '#ccc',
                    borderRadius: 4,
                },
                components: {
                    Select: {
                        multipleItemHeight: 40,
                    },
                },
            }}
        >
            <Form.Item name={name} className="font-medium" label={label} labelCol={{ span: 24 }} rules={rules}>
                <Select
                    
                    className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={placeholder}
                    options={options}
                    style={{ width: width, height: '52px' }}
                    {...props}
                />
            </Form.Item>
        </ConfigProvider>
    );
};

export default SelectPrimary;
