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
    Star,
    Tag,
    TicketCheck,
    TicketPercent,
    User,
    Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PERMISSION } from '../../../constants';
import { FormattedMessage } from 'react-intl';

export const items: MenuProps['items'] = [
    {
        key: '1',
        icon: <House className="w-[18px]" />,
        label: (
            <Link to="">
                <FormattedMessage id="admin.dashboard" />
            </Link>
        ),
    },
    {
        key: '2',
        icon: <Folder className="w-[18px]" />,
        label: <FormattedMessage id="admin.category" />,
        permissionName: PERMISSION.PERMISSION_CATEGORY,
        children: [
            {
                key: '2-1',
                label: (
                    <Link to="list-category" className="text-[14px]">
                        <FormattedMessage id="admin.listCategory" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        key: '4',
        icon: <ListOrdered className="w-[18px]" />,
        label: <FormattedMessage id="admin.order" />,
        permissionName: PERMISSION.PERMISSION_ORDER,
        children: [
            {
                key: '4-1',
                label: (
                    <Link to="orderlist" className="text-[14px]">
                        <FormattedMessage id="admin.orderList" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '4-2',
                label: (
                    <Link to="orderadd" className="text-[14px]">
                        <FormattedMessage id="admin.addOrder" />
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
        ],
    },
    {
        key: '5',
        icon: <TicketPercent className="w-[18px]" />,
        label: <FormattedMessage id="admin.sale" />,
        permissionName: PERMISSION.PERMISSION_SALE,

        children: [
            {
                key: '5-1',
                label: (
                    <Link to="listsale" className="text-[14px]">
                        <FormattedMessage id="admin.listSale" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '5-2',
                label: (
                    <Link to="addsale" className="text-[14px]">
                        <FormattedMessage id="admin.addSale" />
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
        ],
    },
    {
        key: '6',
        icon: <Box className="w-[18px]" />,
        label: <FormattedMessage id="admin.product" />,
        permissionName: PERMISSION.PERMISSION_PRODUCT,
        children: [
            {
                key: '6-1',
                label: (
                    <Link to="list-product" className="text-[14px]">
                        <FormattedMessage id="admin.listProduct" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '6-2',
                label: (
                    <Link to="add-product" className="text-[14px]">
                        <FormattedMessage id="admin.addProduct" />
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
            {
                key: '6-3',
                label: (
                    <Link to="add-attribute" className="text-[14px]">
                        <FormattedMessage id="admin.attribute" />
                    </Link>
                ),
                icon: <Tag className="w-[16px]" />,
            },
        ],
    },
    {
        key: '7',
        icon: <Users className="w-[18px]" />,
        label: <FormattedMessage id="admin.groups" />,
        permissionName: PERMISSION.PERMISSION_GROUP,

        children: [
            {
                key: '7-1',
                label: (
                    <Link to="groups" className="text-[14px]">
                        <FormattedMessage id="admin.listGroup" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        key: '8',
        icon: <User className="w-[18px]" />,
        label: <FormattedMessage id="admin.user" />,
        permissionName: PERMISSION.PERMISSION_USER,

        children: [
            {
                key: '8-1',
                label: (
                    <Link to="list-user" className="text-[14px]">
                        <FormattedMessage id="admin.listUser" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '8-2',
                label: (
                    <Link to="add-user" className="text-[14px]">
                        <FormattedMessage id="admin.addUser" />
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
        ],
    },
    {
        key: '9',
        icon: <File className="w-[18px]" />,
        label: <FormattedMessage id="admin.topic" />,
        permissionName: PERMISSION.PERMISSION_TOPIC,

        children: [
            {
                key: '9-1',
                label: (
                    <Link to="topic" className="text-[14px]">
                        <FormattedMessage id="admin.listTopic" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        key: '10',
        icon: <BookOpen className="w-[18px]" />,
        label: <FormattedMessage id="admin.post" />,
        permissionName: PERMISSION.PERMISSION_POST,

        children: [
            {
                key: '10-1',
                label: (
                    <Link to="posts" className="text-[14px]">
                        <FormattedMessage id="admin.listPost" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '10-2',
                label: (
                    <Link to="add-posts" className="text-[14px]">
                        <FormattedMessage id="admin.addPost" />
                    </Link>
                ),
                icon: <Plus className="w-[16px]" />,
            },
        ],
    },
    {
        key: '11',
        icon: <Image className="w-[18px]" />,
        label: <FormattedMessage id="admin.media" />,
        permissionName: PERMISSION.PERMISSION_MEDIA,

        children: [
            {
                key: '11-1',
                label: (
                    <Link to="media" className="text-[14px]">
                        <FormattedMessage id="admin.listMedia" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        key: '12',
        icon: <TicketCheck className="w-[18px]" />,
        label: <FormattedMessage id="admin.voucher" />,
        permissionName: PERMISSION.PERMISSION_VOUCHER,

        children: [
            {
                key: '12-1',
                label: (
                    <Link to="voucher" className="text-[14px]">
                        <FormattedMessage id="Featureadmin.listVoucherd" />
                    </Link>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
        ],
    },
    {
        key: '13',
        icon: <Star className="w-[18px]" />,
        label: <FormattedMessage id="admin.review" />,
        permissionName: PERMISSION.PERMISSION_REVIEW,
        children: [
            {
                key: '13-1',
                label: (
                    <Link to="list-review" className="text-[14px]">
                        <FormattedMessage id="admin.listReview" />
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
