import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const ButtonBack = ({
    to,
    children = <FormattedMessage id="Back" />,
}: {
    to: string;
    children?: string | ReactNode;
}) => {
    return (
        <Link to={to} className="flex gap-x-2 items-center text-[16px] font-medium color-primary my-5">
            <ArrowLeft />
            {children}
        </Link>
    );
};

export default ButtonBack;
