import { Button } from 'antd';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';
import { RefreshCcw } from 'lucide-react';

const ButtonRestore = ({ children, loading, ...props }: any) => {
    return (
        <Button {...props} className="w-[50px] h-[40px] font-medium">
            {loading ? <LoadingSmall color='color-primary' /> : <RefreshCcw />}
        </Button>
    );
};

export default ButtonRestore;
