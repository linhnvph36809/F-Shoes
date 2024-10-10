import LayoutClient from '../components/Layouts/LayoutClient';
import HomePage from '../pages/Client/HomePages';
import Detail from '../pages/Client/Details';
import CategoryPage from '../pages/Client/CategoryPages';
import Cart from '../pages/Client/Cart';
import LayoutAuthentication from '../pages/Client/Authtication';
import CheckEmail from '../pages/Client/Authtication/CheckEmail';
import Password from '../pages/Client/Authtication/Password';
import Register from '../pages/Client/Authtication/Register';
import ProfilePage from '../pages/Client/Account/Profile';

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
                path: '/category',
                element: <CategoryPage />,
            },
            {
                path: '/detail',
                element: <Detail />,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/profile',
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: '/authentication',
        element: <LayoutAuthentication />,
        children: [
            {
                path: '',
                element: <CheckEmail />,
            },
            {
                path: 'password',
                element: <Password />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
];

export default routerClient;
