import { ReactNode } from 'react';
import { handleGetLocalStorage } from '../../utils';
import { INFO_AUTH } from '../../constants';
import ButtonPrimary from '../Button';
import { Link } from 'react-router-dom';

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
                    <div className="flex justify-center">
                        <img
                            className="w-[600px]"
                            src="./public/images/Capture d’écran 2024-04-09 à 11.33.56.png"
                            alt=""
                        />
                    </div>
                    <Link to="/authentication" className="flex justify-center">
                        <ButtonPrimary>Login</ButtonPrimary>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PrivateRoute;
