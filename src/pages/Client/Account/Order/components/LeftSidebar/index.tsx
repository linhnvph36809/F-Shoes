import React from 'react';
import {Link, useSearchParams} from "react-router-dom";


type Props = {
    className?: string,
    title?: string
}
const items = [
    {
      path: '',
      label: 'All',
      key: ''
    },
    {
        path: '?status=waiting_confirm',
        label: 'Waiting Confirm',
        key: 'waiting_confirm',
    },
    {
        path: '?status=confirmed',
        label: 'Confirmed',
        key: 'confirmed',
    },
    {
        path: '?status=delivering',
        label: 'Delivering',
        key: 'delivering',
    },
    {
        path: '?status=delivered',
        label: 'Delivered',
        key: 'delivered',
    },
    {
        path: '?status=return_processing',
        label: 'Return Processing',
        key: 'return_processing',
    },
    {
        path: '?status=denied_return',
        label: 'Denied Return',
        key: 'denied_return',
    },
    {
        path: '?status=returned',
        label: 'Returned',
        key: 'returned',
    },
    {
        path: '?status=cancelled',
        label: 'Cancelled',
        key: 'cancelled',
    }
];
const LeftSidebar:React.FC<Props> = ({className,title}) => {
    const [searchParams] = useSearchParams();
    const statusOptionParam = searchParams.get("status");
    return (
        <div className={`flex flex-col h-[360px] items-center justify-center space-y-4 rounded-xl p-8 ${className}`}>
            <h3 className="text-3xl font-bold">{title}</h3>
            <div className="flex flex-col space-y-6">
                {items.map((item, index) => (
                    <Link to={item.path} key={index} className={`text-2xl hover:font-bold cursor-pointer ${statusOptionParam && statusOptionParam === item.key ? 'font-bold': item.key ==='' && !statusOptionParam ? 'font-bold' : '' }`}> {item.label}</Link>
                ))}
            </div>
        </div>
    );
};

export default LeftSidebar;