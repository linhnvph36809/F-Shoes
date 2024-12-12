import { Form } from 'antd';

const InputPrimary = ({
    placeholder,
    type,
    width = 'w-full',
    height = 'h-[52px]',
    rules,
    label,
    name,
    ...props
}: any) => {
    return (
        <Form.Item name={name} label={label} className="font-medium" labelCol={{ span: 24 }} rules={rules}>
            <input
                {...props}
                type={type}
                className={`${width} ${height} border border-gray-300 rounded-lg px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                placeholder={placeholder}
            />
        </Form.Item>
    );
};

export default InputPrimary;
