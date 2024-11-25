import { ReactNode } from 'react';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const userName = localStorage.getItem('userName');
    const accessToken = localStorage.getItem('accessToken');
    return (
        <div>
            {userName && accessToken ? children : <h1 className="text-center text-[50px] my-10">404 Not Found</h1>}
        </div>
    );
};

export default PrivateRoute;
