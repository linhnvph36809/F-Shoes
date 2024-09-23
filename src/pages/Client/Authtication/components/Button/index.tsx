import { Button } from 'antd';

const ButtonComponent = ({ children, type = 'default', ...props }: any) => {
    return (
        <Button
            type={type}
            {...props}
            className="bg-primary text-white sm:py-8 md:py-9 sm:w-[100px] md:w-[120px] sm:text-[14px] md:text-18px border-[#111111]
            font-medium rounded-[30px] hover:bg-[#111111] hover:opacity-60 transition-global"
        >
            {children}
        </Button>
    );
};

export default ButtonComponent;
