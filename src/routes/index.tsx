import { useRoutes } from 'react-router-dom';
import routerClient from './routerClient';
import routerAdmin from './routerAdmin';
import AppLayout from '../components/Layouts/AppLayout';

const Routes = () => {
    const routes = useRoutes([
        {
            path: '',
            element: <AppLayout />,
            children: [
                ...routerClient,
                ...routerAdmin,
            ],
        },
    ]);
    return routes;
};

export default Routes;
