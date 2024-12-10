import { ReactNode } from 'react';
import { INFO_AUTH } from '../../constants';
import { handleGetLocalStorage } from '../../utils';
import { Link } from 'react-router-dom';
import ButtonPrimary from '../Button';
import { PATH_ADMIN } from '../../constants/path';

const PrivateRouteAdmin = ({ children }: { children: ReactNode }) => {
    const adminId = handleGetLocalStorage(INFO_AUTH.adminId);
    const adminName = handleGetLocalStorage(INFO_AUTH.adminName);
    return (
        <div>
            {adminId && adminName ? (
                children
            ) : (
                <div>
                    {/* <h1 className="text-center text-[50px] my-10">404 Not Found</h1> */}
                    <div className="flex justify-center">
                        <img
                            className="w-[600px]"
                            src="./public/images/Capture d’écran 2024-04-09 à 11.33.56.png"
                            alt=""
                        />
                    </div>
                    <Link to={PATH_ADMIN.LOGIN_ADMIN} className="flex justify-center">
                        <ButtonPrimary>Login</ButtonPrimary>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PrivateRouteAdmin;
