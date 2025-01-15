import {
    CirclePlus,
    CircleX,
    ClipboardCheck,
    ClipboardX,
    Clock4,
    CreditCard,
    Eye,
    History,
    Hourglass,
    PackageCheck,
    PackageOpen,
    PackagePlus,
    SquarePen,
    Trash2,
    Truck,
} from 'lucide-react';
import { ACTIONS_LIST } from './';

export const STAR = (
    <svg
        className="w-7 h-7 text-yellow-300 ms-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
    >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
);

const className = 'w-[25px]';

export const ICON_STATUS_ORDER = [
    <CircleX className={className} />,
    <CreditCard className={className} />,
    <Clock4 className={className} />,
    <PackageCheck className={className} />,
    <Truck className={className} />,
    <PackageOpen className={className} />,
    <History className={className} />,
    <Hourglass className={className} />,
    <ClipboardX className={className} />,
    <ClipboardCheck className={className} />,
];

const ACTIONS = {
    ACTIONS_VIEW: 'view',
    ACTIONS_ADD: 'add',
    ACTIONS_EDIT: 'edit',
    ACTIONS_DELETE: 'delete',
};

const ACTIONS_CATEGORY = {
    ACTIONS_ADD_PRODUCT: 'add-product',
};

export const ICON_STATUS_GROUP = (status: string) => {
    if (ACTIONS.ACTIONS_VIEW === status) {
        return <Eye className={className} />;
    } else if (ACTIONS.ACTIONS_ADD === status) {
        return <CirclePlus className={className} />;
    } else if (ACTIONS.ACTIONS_EDIT === status) {
        return <SquarePen className={className} />;
    } else if (ACTIONS.ACTIONS_DELETE === status) {
        return <Trash2 className={className} />;
    } else if (ACTIONS_CATEGORY.ACTIONS_ADD_PRODUCT === status) {
        return <PackagePlus className={className} />;
    }
};
