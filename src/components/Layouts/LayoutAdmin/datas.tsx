import { MenuProps } from 'antd';
import { Box, Folder, Grid2X2, House, Plus } from 'lucide-react';
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
        icon: <Box className="w-[18px]" />,
        label: 'Product',
        children: [
            {
                key: '31',
                label: (
                    <a href="#" className="text-[14px]">
                        List Product
                    </a>
                ),
                icon: <Grid2X2 className="w-[16px]" />,
            },
            {
                key: '32',
                label: (
                    <a href="#" className="text-[14px]">
                        Add Product
                    </a>
                ),
                icon: <Plus className="w-[16px]" />,
            },
        ],
    },
].map((item: any, index) => ({
    key: String(index + 1),
    icon: item.icon,
    label: item.label,
    children: item.children,
}));
