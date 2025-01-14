import { Helmet } from 'react-helmet';

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
import Policy from '../pages/Client/Policy';

const routerClient = [
    {
        path: '',
        element: <LayoutClient />,
        children: [
            {
                path: '',
                element: (
                    <>
                        <Helmet>
                            <title>Home</title>
                        </Helmet>
                        <HomePage />
                    </>
                ),
            },
            {
                path: '/detail/:slug',
                element: (
                    <>
                        <Detail />
                    </>
                ),
            },
            {
                path: '/category/:slug?',
                element: (
                    <>
                        <CategoryPage />
                    </>
                ),
            },
            {
                path: '/cart',
                element: (
                    <>
                        <Helmet>
                            <title>Cart</title>
                        </Helmet>
                        <PrivateRoute>
                            <Cart />
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: '/profile',
                element: (
                    <>
                        <Helmet>
                            <title>Profile</title>
                        </Helmet>
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    </>
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
                    <>
                        <Helmet>
                            <title>Order</title>
                        </Helmet>
                        <PrivateRoute>
                            <Order />
                        </PrivateRoute>
                    </>
                ),
            },
            {
                path: '/order-vnpay-complete',
                element: (
                    <>
                        <Helmet>
                            <title>Order Complete</title>
                        </Helmet>
                        <OrderVnpayComplete />
                    </>
                ),
            },
            {
                path: '/order-momo-complete',
                element: (
                    <>
                        <Helmet>
                            <title>Order Complete</title>
                        </Helmet>
                        <OrderMomoComplete />
                    </>
                ),
            },
            {
                path: '/orderlist',
                element: (
                    <>
                        <Helmet>
                            <title>Order Complete</title>
                        </Helmet>{' '}
                        <OrderList />
                    </>
                ),
            },
            {
                path: '/post',
                element: (
                    <>
                        <Helmet>
                            <title>Post</title>
                        </Helmet>
                        <Post />
                    </>
                ),
            },
            {
                path: '/post-detail/:slug?',
                element: (
                    <>
                        <Helmet>
                            <title>Post Detail</title>
                        </Helmet>
                        <PostDetail />
                    </>
                ),
            },
            {
                path: '/order-cash-on-delivery',
                element: (
                    <>
                        <Helmet>
                            <title>Order Complete</title>
                        </Helmet>
                        <OrderCashOnDelivery />
                    </>
                ),
            },
            {
                path: '/policy',
                element: (
                    <>
                        <Helmet>
                            <title>Policy</title>
                        </Helmet>{' '}
                        <Policy />
                    </>
                ),
            },
        ],
    },

    {
        path: '/authentication',
        element: (
            <>
                <Helmet>
                    <title>Login - Register</title>
                </Helmet>
                <LayoutAuthentication />
            </>
        ),
    },
];

export default routerClient;
