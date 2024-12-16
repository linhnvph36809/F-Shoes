import { Button } from 'antd';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ButtonAdd = ({ title, to, children, ...props }: any) => {
    return (
        <Link to={to}>
            <Button {...props} className="px-8 h-[50px] text-[16px] font-medium rounded-[10px] transition-global">
                <Plus /> {title}
            </Button>
        </Link>
    );
};

export default ButtonAdd;
