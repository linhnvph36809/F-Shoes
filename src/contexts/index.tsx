import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import useCookiesConfig from '../hooks/useCookiesConfig';
import { COOKIE_USER } from '../constants';

const Context = createContext<any>({});

export const useContextGlobal = () => useContext(Context);

const ContextGlobal = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>();
    const { cookies } = useCookiesConfig(COOKIE_USER);

    useEffect(() => {
        const userId = cookies?.userId;
        if (!user?.id && userId) {
            setUser({
                id: userId,
            });
        }
    }, []);
    return (
        <CookiesProvider>
            <Context.Provider value={{ user, setUser }}>{children};</Context.Provider>
        </CookiesProvider>
    );
};

export default ContextGlobal;
