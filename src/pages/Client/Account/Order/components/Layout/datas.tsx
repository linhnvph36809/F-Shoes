import {
    CircleX,
    ClipboardCheck,
    ClipboardX,
    Clock4,
    CreditCard,
    History,
    Hourglass,
    PackageCheck,
    PackageOpen,
    PanelsLeftBottom,
    Truck,

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
        icon: <CreditCard className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=waiting_payment">
                <FormattedMessage id="status.waiting_payment" />
            </Link>
        ),
    },
    {
        key: '4',
        icon: <Clock4 className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=waiting_confirm">
                <FormattedMessage id="waitingConfirm" />
            </Link>
        ),
    },
    {
        key: '5',
        icon: <PackageCheck className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=confirmed">
                <FormattedMessage id="confirmed" />
            </Link>
        ),
    },
    {
        key: '6',
        icon: <Truck className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=delivering">
                <FormattedMessage id="delivering" />
            </Link>
        ),
    },
    {
        key: '7',
        icon: <PackageOpen className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=delivered">
                <FormattedMessage id="delivered" />
            </Link>
        ),
    },
    {
        key: '8',
        icon: <History className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=waiting_accept_return">
                <FormattedMessage id="status.waitingAcceptReturn" />
            </Link>
        ),
    },
    {
        key: '9',
        icon: <Hourglass className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=return_processing">
                <FormattedMessage id="returnProcessing" />
            </Link>
        ),
    },
    {
        key: '10',
        icon: <ClipboardX className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=denied_return">
                <FormattedMessage id="deniedReturn" />
            </Link>
        ),
    },
    {
        key: '11',
        icon: <ClipboardCheck className="w-[18px]" />,
        label: (
            <Link to="/profile/orders?status=returned">
                <FormattedMessage id="returned" />
            </Link>
        ),
    },

];

export default MENU_ITEM;
