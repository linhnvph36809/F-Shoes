import { ReactNode } from 'react';
import { handleGetLocalStorage } from '../../utils';
import { INFO_AUTH } from '../../constants';
import ButtonPrimary from '../Button';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const userId = handleGetLocalStorage(INFO_AUTH.userId);
    const userName = handleGetLocalStorage(INFO_AUTH.userName);

    return (
        <div>
            {userId && userName ? (
                children
            ) : (
                <div>
                    {/* <h1 className="text-center text-[50px] my-10">404 Not Found</h1> */}
                    <div className="flex justify-center text-[40px] mb-10">
                        <FormattedMessage id="page.noAccessTile" />
                    </div>
                    <Link to="/authentication" className="flex justify-center">
                        <ButtonPrimary width="w-[100px]" height="h-[40px]">
                            <FormattedMessage id="Login" />
                        </ButtonPrimary>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PrivateRoute;
