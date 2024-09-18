import { useRoutes } from 'react-router-dom';
import routerClient from './routerClient';
import routerAdmin from './routerAdmin';

const Routes = () => {
    const routes = useRoutes([routerClient, ...routerAdmin]); // Gộp hai router lại thành một mảng
    return routes;
};

export default Routes;
