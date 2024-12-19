import { ReactNode } from 'react';
import { INFO_AUTH } from '../../constants';
import { handleGetLocalStorage } from '../../utils';
import { Link } from 'react-router-dom';
import ButtonPrimary from '../Button';
import { PATH_ADMIN } from '../../constants/path';

const PrivateRouteAdmin = ({ children }: { children: ReactNode }) => {
    const isAdmin = handleGetLocalStorage(INFO_AUTH.isAdmin);
    const adminName = handleGetLocalStorage(INFO_AUTH.userName);

    return (
        <>
            <div>
                {isAdmin && adminName ? (
                    children
                ) : (
                    <div>
                        {/* <h1 className="text-center text-[50px] my-10">404 Not Found</h1> */}
                        <div className="flex justify-center">
                            <img
                                className="w-[600px]"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQapgOuAoFQ8eZJXjFpp9jLmkPbt9N8CzR8hg&s"
                                alt=""
                            />
                        </div>
                        <Link to={PATH_ADMIN.LOGIN_ADMIN} className="flex justify-center">
                            <ButtonPrimary>Login</ButtonPrimary>
                        </Link>
                    </div>
                )}
            </div >
        </>
    );
};

export default PrivateRouteAdmin;
