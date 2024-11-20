import { MenuProps } from 'antd';
import {
    BookOpen,
    Box,
    File,
    Folder,
    Grid2X2,
    House,
    Image,
    ListOrdered,
    Plus,
    ScanBarcode,
    Star,
    Tag,
    TicketCheck,
    TicketPercent,
    User,
    Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PERMISSION } from '../../../constants';
import { BarChartOutlined } from '@ant-design/icons';

export const items: MenuProps['items'] = [
    {
        key: '1',
        icon: <House className="w-[18px]" />,
        label: <Link to="">Dashboard</Link>,
    },
    {
        key: '2',
        icon: <Folder className="w-[18px]" />,
        label: 'Category',
        permissionName: PERMISSION.PERMISSION_CATEGORY,
        children: [
            {
                key: '2-1',
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
        key: '3',
        icon: <BarChartOutlined className="text-[14px]" />,
        label: 'Statistic',
        children: [
            {
                key: '3-1',
                label: (
                    <Link to="statistic" className="text-[14px]">
                        Statistic List
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        key: '4',
        icon: <ListOrdered className="w-[18px]" />,
        label: 'Order',
        children: [
            {
                key: '4-1',
                label: (
                    <Link to="orderlist" className="text-[14px]">
                        Order List
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '4-2',
                label: (
                    <Link to="orderadd" className="text-[14px]">
                        Add Order
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
            {
                key: '4-3',
                label: (
                    <Link to="orderdetail" className="text-[14px]">
                        Order Details
                    </Link>
                ),
                icon: <ScanBarcode className="w-[16px]" />,
            },
        ],
    },
    {
        key: '5',
        icon: <TicketPercent className="w-[18px]" />,
        label: 'Sale',
        children: [
            {
                key: '5-1',
                label: (
                    <Link to="listsale" className="text-[14px]">
                        List Sale
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '5-2',
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
        key: '6',
        icon: <Box className="w-[18px]" />,
        label: 'Product',
        permissionName: PERMISSION.PERMISSION_PRODUCT,
        children: [
            {
                key: '6-1',
                label: (
                    <Link to="list-product" className="text-[14px]">
                        List Product
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '6-2',
                label: (
                    <Link to="add-product" className="text-[14px]">
                        Add Product
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
            {
                key: '6-3',
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
        key: '7',
        icon: <Users className="w-[18px]" />,
        label: 'Groups',
        children: [
            {
                key: '7-1',
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
        key: '8',
        icon: <User className="w-[18px]" />,
        label: 'User',
        children: [
            {
                key: '8-1',
                label: (
                    <Link to="list-user" className="text-[14px]">
                        List User
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '8-2',
                label: (
                    <Link to="add-user" className="text-[14px]">
                        Add User
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
        ],
    },
    {
        key: '9',
        icon: <File className="w-[18px]" />,
        label: 'Topic',
        children: [
            {
                key: '9-1',
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
        key: '10',
        icon: <BookOpen className="w-[18px]" />,
        label: 'Post',
        children: [
            {
                key: '10-1',
                label: (
                    <Link to="posts" className="text-[14px]">
                        List Post
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '10-2',
                label: (
                    <Link to="add-posts" className="text-[14px]">
                        Add Post
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
        ],
    },
    {
        key: '11',
        icon: <Image className="w-[18px]" />,
        label: 'Media',
        children: [
            {
                key: '11-1',
                label: (
                    <Link to="media" className="text-[14px]">
                        List Media
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        key: '12',
        icon: <TicketCheck className="w-[18px]" />,
        label: 'Voucher',
        children: [
            {
                key: '12-1',
                label: (
                    <Link to="voucher" className="text-[14px]">
                        List Voucher
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        key: '13',
        icon: <Star className="w-[18px]" />,
        label: 'Review',
        children: [
            {
                key: '13-1',
                label: (
                    <Link to="list-review" className="text-[14px]">
                        List Review
                    </Link>
                ),
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
