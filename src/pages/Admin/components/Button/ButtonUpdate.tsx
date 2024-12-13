import { Button } from 'antd';
import { SquarePen } from 'lucide-react';
import { Link } from 'react-router-dom';

const ButtonUpdate = ({ to, children, ...props }: any) => {
    return (
        <Link to={to}>
            <Button {...props} className="w-[50px] h-[40px] font-medium">
                <SquarePen />
            </Button>
        </Link>
    );
};

export default ButtonUpdate;
