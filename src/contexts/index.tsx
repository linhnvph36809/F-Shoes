import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';

import useQueryConfig from '../hooks/useQueryConfig';
import LoadingPage from '../components/Loading/LoadingPage';

const Context = createContext<any>({});

export const useContextGlobal = () => useContext(Context);

const ContextGlobal = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>();
    const { data } = useQueryConfig('user-infor', '/api/auth/me');
    const userIdLocal = localStorage.getItem('userId');

    useEffect(() => {
        if (userIdLocal && data?.data.user) {
            setUser(data?.data.user);
            localStorage.setItem('userName', data?.data.user.name);
        }
    }, [data]);

    return (
        <CookiesProvider>
            <Context.Provider value={{ user, setUser }}>{children};</Context.Provider>
        </CookiesProvider>
    );
};

export default ContextGlobal;
