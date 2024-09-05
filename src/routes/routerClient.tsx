import LayoutClient from '../components/Layouts/LayoutClient';
import CategoryPage from '../pages/CategoryPages';
import HomePage from '../pages/HomePages';

const routerClient = {
    path: '',
    element: <LayoutClient />,
    children: [
        {
            path: '',
            element: <HomePage />,
        },
        {
            path: '/CategoryPage',
            element: <CategoryPage />,
        },
    ],
};

export default routerClient;
