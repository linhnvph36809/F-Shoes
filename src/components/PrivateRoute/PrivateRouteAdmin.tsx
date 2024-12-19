import { ReactNode } from 'react';
import { INFO_AUTH } from '../../constants';
import { handleGetLocalStorage } from '../../utils';
import { Link } from 'react-router-dom';
import ButtonPrimary from '../Button';
import { PATH_ADMIN } from '../../constants/path';
import { FormattedMessage } from 'react-intl';

const PrivateRouteAdmin = ({ children }: { children: ReactNode }) => {
    const isAdmin = handleGetLocalStorage(INFO_AUTH.isAdmin);
    const adminName = handleGetLocalStorage(INFO_AUTH.userName);
    const groupId = handleGetLocalStorage(INFO_AUTH.groupId);

    return (
        <>
            <div>
                {isAdmin && adminName && groupId ? (
                    children
                ) : (
                    <div>
                        {/* <h1 className="text-center text-[50px] my-10">404 Not Found</h1> */}
                        <div className="flex justify-center text-[40px] mb-10">
                            <FormattedMessage id="page.noAccessTile" />
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
