import { Button } from 'antd';

const ButtonEdit = ({ children, ...props }: any) => {
    return <Button {...props} className="w-[50px] h-[40px] font-medium">{children}</Button>;
};

export default ButtonEdit;
