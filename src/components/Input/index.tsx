import { Input } from 'antd';

const InputPrimary = ({
    placeholder,
    type = 'text',
    width = 'w-full',
    height = 'sm:h-[45px] md:h-[56px]',
    margin = 'sm:mb-2 md:mb-3',
    textSize = 'sm:text-[15px] md:text-[18px]',
    ...props
}: any) => {
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
