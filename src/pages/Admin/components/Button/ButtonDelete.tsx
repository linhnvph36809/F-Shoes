import { Button } from 'antd';
import { Trash2 } from 'lucide-react';

const ButtonDelete = ({ children, ...props }: any) => {
    return (
        <Button {...props} className="w-[50px] h-[40px] font-medium">
            <Trash2 />
        </Button>
    );
};

export default ButtonDelete;
