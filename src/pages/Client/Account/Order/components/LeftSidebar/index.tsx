import React from 'react';
import {Link} from "react-router-dom";


type Props = {
    className?: string,
    title?: string
}
const items = [
    {
        path: 'confirming',
        label: 'Confirming'
    },
    {
        path: 'to-pay',
        label: 'To Pay'
    },
    {
        path: 'to-ship',
        label: 'To Ship'
    },
    {
        path: 'to-receive',
        label: 'To Receive'
    },
    {
        path: 'completed',
        label: 'Completed'
    },
    {
        path: '',
        label: 'Cancelled'
    },
    {
        path: '',
        label: 'Return Refund'
    }
];
const LeftSidebar:React.FC<Props> = ({className,title}) => {
    return (
        <div className={`flex flex-col max-h-[300px] items-center justify-center space-y-4 rounded-xl p-8 ${className}`}>
            <h3 className="text-3xl font-bold">{title}</h3>
            <div className="flex flex-col space-y-6">
                {items.map((item, index) => (
                    <Link to={item.path} key={index} className="text-2xl hover:font-bold cursor-pointer"> {item.label}</Link>
                ))}
            </div>
        </div>
    );
};

export default LeftSidebar;