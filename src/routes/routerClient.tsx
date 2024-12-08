import LayoutClient from '../components/Layouts/LayoutClient';
import HomePage from '../pages/Client/HomePages';
import Detail from '../pages/Client/Details';
import CategoryPage from '../pages/Client/CategoryPages';
import Cart from '../pages/Client/Cart';
import LayoutAuthentication from '../pages/Client/Authtication';
import ProfilePage from '../pages/Client/Account/Profile';
import Order from '../pages/Client/Order';
import PrivateRoute from '../components/PrivateRoute';
import OrderVnpayComplete from '../pages/Client/OrderComplete/OrderVnpayComplete';
import AccountSetting from '../pages/Client/Account/AccountSetting';
import Layout from '../pages/Client/Account/Layout';
import OrderProfile from '../pages/Client/Account/Order';
import Post from '../pages/Client/Post';
import PostDetail from '../pages/Client/PostDetail';
import OrderCashOnDelivery from '../pages/Client/OrderComplete/OrderCashOnDelivery';
import OrderList from '../pages/Client/Account/OrderDetail';
import OrderDetail from '../pages/Client/Account/OrderDetail';
import LayoutOrderProfile from '../pages/Client/Account/Order/components/Layout';
import OrderMomoComplete from '../pages/Client/OrderComplete/OrderMomoComplete';
const routerClient = [
    {
        path: '',
        element: <LayoutClient />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: '/detail/:slug',
                element: <Detail />,
            },
            {
                path: '/category/:slug?',
                element: <CategoryPage />,
            },
            {
                path: '/cart',
                element: (
                    <PrivateRoute>
                        <Cart />
                    </PrivateRoute>
                ),
            },
            {
                path: '/profile',
                element: (
                    <PrivateRoute>
                        <Layout />
                    </PrivateRoute>
                ),
                children: [
                    {
                        path: '',
                        element: <ProfilePage />,
                    },
                    {
                        path: 'setting',
                        element: <AccountSetting />,
                    },
                    {
                        path: 'orders',
                        element: <LayoutOrderProfile />,
                        children: [
                            {
                                path: '',
                                element: <OrderProfile />,
                            },
                            {
                                path: ':id',
                                element: <OrderDetail />,
                            },
                        ],
                    },
                    {
                        path: 'order/:id',
                        element: <OrderDetail />,
                    },
                ],
            },
            {
                path: '/order',
                element: (
                    <PrivateRoute>
                        <Order />
                    </PrivateRoute>
                ),
            },
            {
                path: '/order-vnpay-complete',
                element: <OrderVnpayComplete />,
            },
            {
                path: '/order-momo-complete',
                element: <OrderMomoComplete />,
            },
            {
                path: '/orderlist',
                element: <OrderList />,
            },
            {
                path: '/post',
                element: <Post />,
            },
            {
                path: '/post-detail',
                element: <PostDetail />,
            },
            {
                path: '/order-cash-on-delivery',
                element: <OrderCashOnDelivery />,
            },
        ],
    },

    {
        path: '/authentication',
        element: <LayoutAuthentication />,
    },
];

export default routerClient;
