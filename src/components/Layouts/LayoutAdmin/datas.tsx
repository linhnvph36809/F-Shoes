import { MenuProps } from 'antd';
import {
    BookOpen,
    Box,
    File,
    Folder,
    Grid2X2,
    House,
    ListOrdered,
    Plus,
    ScanBarcode,
    Tag,
    TicketPercent,
    Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PERMISSION } from '../../../constants';

export const items: MenuProps['items'] = [
    {
        icon: <House className="w-[18px]" />,
        label: <Link to="">Dashboard</Link>,
    },
    {
        icon: <Folder className="w-[18px]" />,
        label: 'Category',
        permissionName: PERMISSION.PERMISSION_CATEGORY,
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
        icon: <ListOrdered className="w-[18px]" />,
        label: 'Oder',
        children: [
            {
                key: '22',
                label: (
                    <Link to="orderlist" className="text-[14px]">
                        Order List
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '23',
                label: (
                    <Link to="orderadd" className="text-[14px]">
                        Add Order
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
            {
                key: '24',
                label: (
                    <Link to="orderdetail" className="text-[14px]">
                        Order Detials
                    </Link>
                ),
                icon: <ScanBarcode className="w-[16px]" />,
            },
        ],
    },
    {
        icon: <TicketPercent className="w-[18px]" />,
        label: 'Discount',
        children: [
            {
                key: '25',
                label: (
                    <Link to="listcount" className="text-[14px]">
                        List Count
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '26',
                label: (
                    <Link to="addcount" className="text-[14px]">
                        Add Count
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
            {
                key: '27',
                label: (
                    <Link to="listsale" className="text-[14px]">
                        List Sale
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '28',
                label: (
                    <Link to="addsale" className="text-[14px]">
                        Add Sale
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
        ],
    },
    {
        icon: <Box className="w-[18px]" />,
        label: 'Product',
        permissionName: PERMISSION.PERMISSION_PRODUCT,
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
    {
        icon: <Users className="w-[18px]" />,
        label: 'Groups',
        children: [
            {
                key: '34',
                label: (
                    <Link to="groups" className="text-[14px]">
                        List Group
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        icon: <File className="w-[18px]" />,
        label: 'Topic',
        children: [
            {
                key: '35',
                label: (
                    <Link to="topic" className="text-[14px]">
                        List Topic
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        icon: <BookOpen className="w-[18px]" />,
        label: 'Post',
        children: [
            {
                key: '36',
                label: (
                    <Link to="posts" className="text-[14px]">
                        List Post
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
].map((item: any, index) => ({
    key: String(index + 1),
    icon: item.icon,
    label: item.label,
    children: item.children,
    permissionName: item.permissionName,
}));
