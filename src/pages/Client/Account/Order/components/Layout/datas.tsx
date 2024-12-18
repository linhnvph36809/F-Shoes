import {
    ArrowDownUp,
    Blocks,
    CircleX,
    Clock4,
    PackageCheck,
    PackageOpen,
    PanelsLeftBottom,
    RotateCcw,
    Undo2,
} from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export const MENU_ITEM = [
    {
        key: '1',
        icon: <PanelsLeftBottom className="w-[18px]" />,
        label: (
            <Link to="/profile/orders">
                <FormattedMessage id="allOrders" />
            </Link>
        ),
    },
    {
        key: '2',
        icon: <CircleX className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=cancelled">
                <FormattedMessage id="cancelled" />
            </Link>
        ),
    },
    {
        key: '3',
        icon: <Clock4 className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=waiting_confirm">
                <FormattedMessage id="waitingConfirm" />
            </Link>
        ),
    },
    {
        key: '4',
        icon: <PackageCheck className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=confirmed">
                <FormattedMessage id="confirmed" />
            </Link>
        ),
    },
    {
        key: '5',
        icon: <ArrowDownUp className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=delivering">
                <FormattedMessage id="delivering" />
            </Link>
        ),
    },
    {
        key: '6',
        icon: <PackageOpen className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=delivered">
                <FormattedMessage id="delivered" />
            </Link>
        ),
    },
    
];

export default MENU_ITEM;
