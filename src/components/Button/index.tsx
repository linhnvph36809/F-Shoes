import { Button } from 'antd';

const ButtonPrimary = ({ width = 'w-[80px]', height = 'h-[35px]', children = 'Submit', ...props }: any) => {
    return (
        <Button
            {...props}
            className={`bg-primary text-white ${width} ${height} rounded-[30px]
            text-[16px] font-medium transition-global hover:opacity-70`}
        >
            {children}
        </Button>
    );
};

export default ButtonPrimary;
