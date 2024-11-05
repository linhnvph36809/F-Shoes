import { useRoutes } from 'react-router-dom';
import routerClient from './routerClient';
import routerAdmin from './routerAdmin';
import AppLayout from '../components/Layouts/AppLayout';
import NotFound from '../components/NotFound';

const Routes = () => {
    const routes = useRoutes([
        {
            path: '',
            element: <AppLayout />,
            children: [...routerClient, ...routerAdmin],
        },
        {
            path: '/*',
            element: <NotFound />,
        },
    ]);
    return routes;
};

export default Routes;
