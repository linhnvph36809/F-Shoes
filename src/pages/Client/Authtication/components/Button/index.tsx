import { Button } from 'antd';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

const ButtonComponent = ({ children, type = <FormattedMessage id="default" />, ...props }: any | ReactNode) => {
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
