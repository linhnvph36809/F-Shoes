import { useRoutes } from 'react-router-dom';
import routerClient from './routerClient';

const Routes = () => {
    const routes = useRoutes([routerClient]);
    return routes;
};

export default Routes;
