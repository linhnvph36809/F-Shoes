import LayoutAdmin from '../components/Layouts/LayoutAdmin';
import ListCategory from '../pages/Admin/Category';
import UpdateCategory from '../pages/Admin/Category/Update';
import AdminDashboard from '../pages/Admin/DashboardAdmin';
import ListProduct from '../pages/Admin/Products';
import Attribute from '../pages/Admin/Products/Attribute';
import UpdateProduct from '../pages/Admin/Products/UpdateProduct';
import AddProduct from '../pages/Admin/Products/AddProduct';
import AddVariant from '../pages/Admin/Products/AddVariant';

const routerAdmin = [
    {
        path: '/admin', // Đường dẫn chính cho admin
        element: <LayoutAdmin />, // Layout tổng thể cho phần admin
        children: [
            {
                path: '', // /admin
                element: <AdminDashboard />,
            },
            {
                path: 'list-category',
                element: <ListCategory />,
            },
            {
                path: 'update-category/:id',
                element: <UpdateCategory />,
            },
            {
                path: 'list-product',
                element: <ListProduct />,
            },
            {
                path: 'add-product',
                element: <AddProduct />,
            },
            {
                path: 'update-product/:slug',
                element: <UpdateProduct />,
            },
            {
                path: 'add-attribute',
                element: <Attribute />,
            },
            {
                path: 'add-variant/:slug',
                element: <AddVariant />,
            },
        ],
    },
];

export default routerAdmin;
