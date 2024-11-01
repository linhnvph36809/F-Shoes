import { ReactNode } from 'react';
import useCookiesConfig from '../../hooks/useCookiesConfig';
import { COOKIE_USER } from '../../constants';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { cookies } = useCookiesConfig(COOKIE_USER);
    const userName = cookies?.userName;
    const accessToken = localStorage.getItem('accessToken');

    return (
        <div>
            {userName && accessToken ? children : <h1 className="text-center text-[50px] my-10">404 Not Found</h1>}
        </div>
    );
};

export default PrivateRoute;
