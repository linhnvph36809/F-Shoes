import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';

import useCookiesConfig from '../hooks/useCookiesConfig';
import { COOKIE_USER } from '../constants';

const Context = createContext<any>({});
const queryClient = new QueryClient();

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
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <Context.Provider value={{ user, setUser }}>{children};</Context.Provider>
            </CookiesProvider>

        </QueryClientProvider>
    );
};

export default ContextGlobal;
