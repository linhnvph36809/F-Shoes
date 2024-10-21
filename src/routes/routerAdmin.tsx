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
import OrderDetail from '../pages/Admin/Oder/Order Detail';
import Addorder from '../pages/Admin/Oder/AddOrder';


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
                path: 'add-variant',
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
                path: 'orderdetail',
                element: <OrderDetail />,
            },
            {
                path: 'orderadd',
                element: <Addorder />,
            },


        ],
    },
];

export default routerAdmin;
