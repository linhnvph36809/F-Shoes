import LayoutClient from '../components/Layouts/LayoutClient';
import HomePage from '../pages/HomePages';
import Detail from '../pages/Details';
import CategoryPage from '../pages/CategoryPages';
import Cart from '../pages/Cart';

const routerClient = {
    path: '',
    element: <LayoutClient />,
    children: [
        {
            path: '',
            element: <HomePage />,
        },
        {
            path: '/detail',
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
    ],
};

export default routerClient;
