import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Header';
import Footer from '../../Footer';
import { useContextGlobal } from '../../../contexts';

const ContextClient = createContext<any>({});

export const useContextClient = () => useContext(ContextClient);

const LayoutClient = () => {
    const [userName, setUserName] = useState<any>();
    const userNameLocal = localStorage.getItem('userName');
    const { user } = useContextGlobal();

    useEffect(() => {
        if (userNameLocal) {
            setUserName(userNameLocal);
        } else if (user?.name) {
            setUserName(user.name);
        }
    }, [user]);

    return (
        <ContextClient.Provider value={{ userName, setUserName }}>
            <div>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </ContextClient.Provider>
    );
};

export default LayoutClient;
