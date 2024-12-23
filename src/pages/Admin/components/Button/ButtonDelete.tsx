import { Button } from 'antd';
import { Trash2 } from 'lucide-react';
import LoadingSmall from '../../../../components/Loading/LoadingSmall';

const ButtonDelete = ({ children, loading, ...props }: any) => {
    return (
        <Button {...props} className="w-[50px] h-[40px] font-medium">
            {loading ? <LoadingSmall color='color-primary' /> : <Trash2 />}
        </Button>
    );
};

export default ButtonDelete;
