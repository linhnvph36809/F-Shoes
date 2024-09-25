import { Button } from 'antd';

const ButtonPrimary = ({ width = 'w-[80px]', height = 'h-[35px]' }: { width?: string; height?: string }) => {
    return (
        <Button
            type="default"
            className={`bg-primary text-white ${width} ${height} rounded-[30px]
            text-[16px] font-medium transition-global hover:opacity-70`}
        >
            Submit
        </Button>
    );
};

export default ButtonPrimary;
