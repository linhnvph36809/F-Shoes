import LayoutAdmin from '../components/Layouts/LayoutAdmin';
import ListCategory from '../pages/Admin/Category';
import UpdateCategory from '../pages/Admin/Category/Update';
import AdminDashboard from '../pages/Admin/DashboardAdmin';

import UpdateSale from '../pages/Admin/Discount/UpdateSale';
import AddSale from '../pages/Admin/Discount/AddSale';

import ListSale from '../pages/Admin/Discount/ListSale';
import LoginAdmin from '../pages/Admin/Login';
import PrivateRouteAdmin from '../components/PrivateRoute/PrivateRouteAdmin';

import Authorization from '../pages/Admin/Groups/Authorization';
import ListTopic from '../pages/Admin/Topics';
import ListPost from '../pages/Admin/Posts';
import Addorder from '../pages/Admin/Oder/AddOrder';
import OrderList from '../pages/Admin/Oder/Order List';
import UpdateOrder from '../pages/Admin/Oder/UpdateOrder';
import ListProduct from '../pages/Admin/Products';
import AddProduct from '../pages/Admin/Products/AddProduct';
import AddVariant from '../pages/Admin/Products/AddVariant';
import Attribute from '../pages/Admin/Products/Attribute';
import UpdateProduct from '../pages/Admin/Products/UpdateProduct';
import UpdateVariant from '../pages/Admin/Products/UpdateVariant';
import ListReview from '../pages/Admin/Review/ListReview/Index';
import Statistic from '../pages/Admin/Statistic/StatisticList';
import AddUser from '../pages/Admin/User/AddUser';
import ListUser from '../pages/Admin/User/ListUser';
import UpdateUser from '../pages/Admin/User/UpdateUser';
import MediaLibrary from '../pages/Admin/Image/list-image';
import ListVouCher from '../pages/Admin/Voucher';
import UpdateAttribute from '../pages/Admin/Products/Attribute/UpdateAttribute';

import { ACTIONS, PERMISSION } from '../constants';
import PermissionPage from '../components/Permissions/PermissionPage';
import ListGroups from '../pages/Admin/Groups/ListGroup';

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
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_CATEGORY} action={ACTIONS.ACTIONS_VIEW}>
                        <ListCategory />
                    </PermissionPage>
                ),
            },
            {
                path: 'update-category/:id',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_CATEGORY} action={ACTIONS.ACTIONS_EDIT}>
                        <UpdateCategory />
                    </PermissionPage>
                ),
            },
            {
                path: 'list-product',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_PRODUCT} action={ACTIONS.ACTIONS_VIEW}>
                        {' '}
                        <ListProduct />
                    </PermissionPage>
                ),
            },
            {
                path: 'add-product',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_PRODUCT} action={ACTIONS.ACTIONS_ADD}>
                        <AddProduct />
                    </PermissionPage>
                ),
            },
            {
                path: 'update-product/:slug',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_PRODUCT} action={ACTIONS.ACTIONS_EDIT}>
                        <UpdateProduct />
                    </PermissionPage>
                ),
            },
            {
                path: 'add-attribute',
                element: <Attribute />,
            },
            {
                path: 'update-attribute/:id',
                element: <UpdateAttribute />,
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
                path: 'listsale',
                element: <ListSale />,
            },
            {
                path: 'sale/update/:id?',
                element: <UpdateSale />,
            },
            {
                path: 'addsale',
                element: <AddSale />,
            },
            {
                path: 'orderlist',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_ORDER} action={ACTIONS.ACTIONS_VIEW}>
                        <OrderList />
                    </PermissionPage>
                ),
            },
            {
                path: 'orderadd',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_ORDER} action={ACTIONS.ACTIONS_ADD}>
                        <Addorder />
                    </PermissionPage>
                ),
            },
            {
                path: 'orderupdate/:id',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_ORDER} action={ACTIONS.ACTIONS_EDIT}>
                        <UpdateOrder />
                    </PermissionPage>
                ),
            },
            {
                path: 'list-user',
                element: <ListUser />,
            },
            {
                path: 'add-user',
                element: <AddUser />,
            },
            {
                path: 'Update-user/:nickname',
                element: <UpdateUser />,
            },
            {
                path: 'list-review',
                element: <ListReview />,
            },
            {
                path: 'groups',
                element: <ListGroups />,
            },
            {
                path: 'statistic',
                element: <Statistic />,
            },
            {
                path: 'permissions/:id',
                element: <Authorization />,
            },
            {
                path: 'topic',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_TOPIC} action={ACTIONS.ACTIONS_VIEW}>
                        <ListTopic />
                    </PermissionPage>
                ),
            },
            {
                path: 'posts',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_POST} action={ACTIONS.ACTIONS_VIEW}>
                        <ListPost />
                    </PermissionPage>
                ),
            },
            {
                path: 'media',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_MEDIA} action={ACTIONS.ACTIONS_VIEW}>
                        <MediaLibrary />
                    </PermissionPage>
                ),
            },
            {
                path: 'voucher',
                element: (
                    <PermissionPage keyName={PERMISSION.PERMISSION_VOUCHER} action={ACTIONS.ACTIONS_VIEW}>
                        <ListVouCher />
                    </PermissionPage>
                ),
            },
        ],
    },
    {
        path: 'login-admin',
        element: <LoginAdmin />,
    },
];

export default routerAdmin;
