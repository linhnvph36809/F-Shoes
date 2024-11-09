import LayoutAdmin from '../components/Layouts/LayoutAdmin';
import ListCategory from '../pages/Admin/Category';
import UpdateCategory from '../pages/Admin/Category/Update';
import AdminDashboard from '../pages/Admin/DashboardAdmin';
import ListProduct from '../pages/Admin/Products';
import Attribute from '../pages/Admin/Products/Attribute';
import UpdateProduct from '../pages/Admin/Products/UpdateProduct';
import AddProduct from '../pages/Admin/Products/AddProduct';
import AddVariant from '../pages/Admin/Products/AddVariant';
import UpdateVariant from '../pages/Admin/Products/UpdateVariant';
import Discounts from '../pages/Admin/Discount';
import DiscountList from '../pages/Admin/Discount/ListCount';
import AddCount from '../pages/Admin/Discount/AddCount';
import AddSale from '../pages/Admin/Discount/AddSale';
import ListSale from '../pages/Admin/Discount/ListSale';
import OrderList from '../pages/Admin/Oder/Order List';
import Addorder from '../pages/Admin/Oder/AddOrder';
import UpdateOrder from '../pages/Admin/Oder/UpdateOrder';
import LoginAdmin from '../pages/Admin/Login';
import PrivateRouteAdmin from '../components/PrivateRoute/PrivateRouteAdmin';
import ListGroups from '../pages/Admin/Groups/ListGroup';
import Authorization from '../pages/Admin/Groups/Authorization';
import PermissionPage from '../components/Permissions/PermissionPage';
import ListTopic from '../pages/Admin/Topics';
import UpdateTopic from '../pages/Admin/Topics/UpdateTopic';
import ListPost from '../pages/Admin/Posts';

const routerAdmin = [
    {
        path: '/admin', // Đường dẫn chính cho admin
        element: (
            <PrivateRouteAdmin>
                <LayoutAdmin />
            </PrivateRouteAdmin>
        ), // Layout tổng thể cho phần admin
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
            {
                path: 'update-variant/:slug',
                element: <UpdateVariant />,
            },
            {
                path: 'discount',
                element: <Discounts />,
            },
            {
                path: 'listsale',
                element: <ListSale />,
            },
            {
                path: 'listcount',
                element: <DiscountList />,
            },
            {
                path: 'addcount',
                element: <AddCount />,
            },
            {
                path: 'addsale',
                element: <AddSale />,
            },
            {
                path: 'orderlist',
                element: <OrderList />,
            },
            {
                path: 'orderadd',
                element: <Addorder />,
            },
            {
                path: 'orderupdate/:id',
                element: <UpdateOrder />,
            },
            {
                path: 'groups',
                element: (
                    <PermissionPage keyName="product" action="edit">
                        <ListGroups />
                    </PermissionPage>
                ),
            },
            {
                path: 'permissions/:id',
                element: <Authorization />,
            },
            {
                path: 'topic',
                element: <ListTopic />,
            },
            {
                path: 'topic/:id',
                element: <UpdateTopic />,
            },
            {
                path: 'posts',
                element: <ListPost />,
            },
        ],
    },
    {
        path: 'login-admin',
        element: <LoginAdmin />,
    },
];

export default routerAdmin;
