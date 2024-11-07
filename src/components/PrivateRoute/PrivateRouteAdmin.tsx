import { ReactNode } from 'react';
import useCookiesConfig from '../../hooks/useCookiesConfig';
import { COOKIE_USER } from '../../constants';

const PrivateRouteAdmin = ({ children }: { children: ReactNode }) => {
    const { cookies } = useCookiesConfig(COOKIE_USER);
    const adminName = cookies?.adminName;
    const accessToken = localStorage.getItem('accessToken');

    return (
        <div>
            {adminName && accessToken ? children : <h1 className="text-center text-[50px] my-10">404 Not Found</h1>}
        </div>
    );
};

export default PrivateRouteAdmin;
