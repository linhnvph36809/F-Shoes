import { Button } from 'antd';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import './style.scss';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

const ButtonSubmit = ({
    width = 'w-[120px]',
    height = 'h-[56px]',
    loading,
    children = <FormattedMessage id="submit" />,
    ...props
}: any | ReactNode) => {
    return (
        <Button
            className={`bg-primary text-white ${width} ${height} rounded-[30px]
        text-[16px] font-medium transition-global hover:opacity-70`}
            htmlType="submit"
            {...props}
        >
            {loading ? <LoadingSmall /> : children}
        </Button>
    );
};

export default ButtonSubmit;
