import { Button } from 'antd';

const ButtonEdit = ({ loading, children, ...props }: any) => {
    return <Button loading={loading} {...props} className="w-[50px] h-[40px] font-medium">{children}</Button>;
};

export default ButtonEdit;
