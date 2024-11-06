import LayoutClient from '../components/Layouts/LayoutClient';
import HomePage from '../pages/Client/HomePages';
import Detail from '../pages/Client/Details';
import CategoryPage from '../pages/Client/CategoryPages';
import Cart from '../pages/Client/Cart';
import LayoutAuthentication from '../pages/Client/Authtication';
import ProfilePage from '../pages/Client/Account/Profile';
import Order from '../pages/Client/Order';
import PrivateRoute from '../components/PrivateRoute';
import OrderComplete from '../pages/Client/OrderComplete';
import AccountSetting from "../pages/Client/Account/AccountSetting";
import Layout from "../pages/Client/Account/Layout";

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
                       <Layout/>
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
                    }
                ]
            },
            {
                path: 'anc',
                element:  <ProfilePage />
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
                path: '/order-complete',
                element: <OrderComplete />,
            },
        ],
    },
    {
        path: '/authentication',
        element: <LayoutAuthentication />,
    },
];

export default routerClient;
