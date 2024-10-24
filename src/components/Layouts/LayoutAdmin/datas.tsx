import { MenuProps } from 'antd';
import { Box, Folder, Grid2X2, House, ListOrdered, Plus, ScanBarcode, Tag, TicketPercent,  } from 'lucide-react';
import { Link } from 'react-router-dom';

export const items: MenuProps['items'] = [
    {
        icon: <House className="w-[18px]" />,
        label: <Link to="">Dashboard</Link>,
    },
    {
        icon: <Folder className="w-[18px]" />,
        label: 'Category',
        children: [
            {
                key: '21',
                label: (
                    <Link to="list-category" className="text-[14px]">
                        List Category
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        icon: <ListOrdered  className="w-[18px]" />,
        label: 'Oder',
        children: [
            {
                key: '21',
                label: (
                    <Link to="orderlist" className="text-[14px]">
                        Order List
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '21',
                label: (
                    <Link to="orderadd" className="text-[14px]">
                        Add Order
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
            {
                key: '21',
                label: (
                    <Link to="orderdetail" className="text-[14px]">
                        Order Detials
                    </Link>
                ),
                icon: <ScanBarcode  className="w-[16px]" />,
            },
            
        ],
    },
    {
        icon: <TicketPercent className="w-[18px]"/>,
        label: 'Discount',
        children: [
            
            {
                key: '21',
                label: (
                    <Link to="listcount" className="text-[14px]">
                        List Count
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '21',
                label: (
                    <Link to="addcount" className="text-[14px]">
                        Add Count
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
            {
                key: '21',
                label: (
                    <Link to="listsale" className="text-[14px]">
                        List Sale
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '21',
                label: (
                    <Link to="addsale" className="text-[14px]">
                        Add Sale
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            }
        ],
    },
    {
        icon: <Box className="w-[18px]" />,
        label: 'Product',
        children: [
            {
                key: '31',
                label: (
                    <Link to="list-product" className="text-[14px]">
                        List Product
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '32',
                label: (
                    <Link to="add-product" className="text-[14px]">
                        Add Product
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
            {
                key: '33',
                label: (
                    <Link to="add-attribute" className="text-[14px]">
                        Attribute
                    </Link>
                ),
                icon: <Tag className="w-[16px]" />,
            },
        ],
    },
].map((item: any, index) => ({
    key: String(index + 1),
    icon: item.icon,
    label: item.label,
    children: item.children,
}));
