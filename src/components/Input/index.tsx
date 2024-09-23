import { Input } from 'antd';

const InputPrimary = ({
    placeholder,
    type = 'text',
    width = 'w-full',
    ...props
}: {
    placeholder: string;
    width?: string;
    type?: string;
}) => {
    return (
        <Input
            placeholder={placeholder}
            {...props}
            type={type}
            className={`${width} sm:h-[45px] md:h-[56px] border-1 border-[#111111] sm:text-[15px] md:text-[18px]
            font-medium focus:border-[#111111] hover:border-[#111111] px-8 rounded-[8px] sm:mb-6 md:mb-10`}
        />
    );
};

export default InputPrimary;
