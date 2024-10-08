import { Input } from 'antd';

const InputPrimary = ({
    placeholder,
    type = 'text',
    width = 'w-full',
    height = 'sm:h-[45px] md:h-[56px]',
    margin = 'sm:mb-6 md:mb-10',
    textSize = 'sm:text-[15px] md:text-[18px]',
    ...props
}: {
    placeholder: string;
    width?: string;
    type?: string;
    textSize?: string;
    height?: string;
    margin?: string;
}) => {
    return (
        <Input
            placeholder={placeholder}
            {...props}
            type={type}
            className={`${width} ${height} ${textSize} border-1 border-[#111111] focus:shadow
            font-medium focus:border-[#111111] hover:border-[#111111] px-8 rounded-[8px] ${margin}`}
        />
    );
};

export default InputPrimary;
