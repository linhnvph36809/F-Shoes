import { Button } from 'antd';

const ButtonSubmit = ({
    children,
    width = 'w-[200px]',
    height = 'h-[56px]',
}: {
    children: string;
    width?: string;
    height?: string;
}) => {
    return (
        <Button className={`${width} ${height} bg-primary text-[18px] font-medium text-white rounded-[8px]`}>
            {children}
        </Button>
    );
};

export default ButtonSubmit;
