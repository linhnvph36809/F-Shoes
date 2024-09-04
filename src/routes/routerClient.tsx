import LayoutClient from '../components/Layouts/LayoutClient';
import HomePage from '../pages/HomePages';

const routerClient = {
    path: '',
    element: <LayoutClient />,
    children: [
        {
            path: '',
            element: <HomePage />,
        },
    ],
};

export default routerClient;
