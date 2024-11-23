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
import { Link } from 'react-router-dom';

export const MENU_ITEM = [
    {
        key: '1',
        icon: <PanelsLeftBottom className="w-[18px]" />,
        label: <Link to="">All Order</Link>,
    },
    {
        key: '2',
        icon: <CircleX className="w-[18px]" />,
        label: <Link to="?status=cancelled">Cancelled</Link>,
    },
    {
        key: '3',
        icon: <Clock4 className="w-[18px]" />,
        label: <Link to="?status=waiting_confirm"> Waiting Confirm</Link>,
    },
    {
        key: '4',
        icon: <PackageCheck className="w-[18px]" />,
        label: <Link to="?status=confirmed"> Confirmed </Link>,
    },
    {
        key: '5',
        icon: <ArrowDownUp className="w-[18px]" />,
        label: <Link to="?status=delivering"> Delivering </Link>,
    },
    {
        key: '6',
        icon: <PackageOpen className="w-[18px]" />,
        label: <Link to="?status=delivered"> Delivered </Link>,
    },
    {
        key: '7',
        icon: <Blocks className="w-[18px]" />,
        label: <Link to="?status=return_processing"> Return Processing </Link>,
    },
    {
        key: '8',
        icon: <Undo2 className="w-[18px]" />,
        label: <Link to="?status=denied_return"> Denied Return </Link>,
    },
    {
        key: '9',
        icon: <RotateCcw className="w-[18px]" />,
        label: <Link to="?status=returned"> Returned </Link>,
    },
];

export default MENU_ITEM;
