import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { IntlProvider } from 'react-intl';

import language_en from '../translations/en.json';
import language_vi from '../translations/vi.json';

import useQueryConfig from '../hooks/useQueryConfig';
import { handleGetLocalStorage, handleSetLocalStorage } from '../utils';

const Context = createContext<any>({});

export const useContextGlobal = () => useContext(Context);

type LanguageType = 'en' | 'vi';

const language = {
    en: language_en,
    vi: language_vi,
};

const ContextGlobal = ({ children }: { children: ReactNode }) => {
    const languageLocal = (handleGetLocalStorage('language') as LanguageType) || 'en';
    const [locale, setLocale] = useState<LanguageType>(languageLocal);

    const [user, setUser] = useState<any>();
    const [quantityCart, setQuantityCart] = useState<number>(0);

    const { data, refetch: refetchUser } = useQueryConfig('user-infor', '/api/auth/me', {
        cacheTime: 1000 * 60 * 30,
        staleTime: 1000 * 60 * 30,
        enabled: false,
    });

    const { data: carts, refetch: refetchQuantityCart } = useQueryConfig('cart', '/api/cart', {
        cacheTime: 0,
        staleTime: 0,
        retry: false,
        enabled: false,
    });

    useEffect(() => {
        setQuantityCart(carts?.data.length || 0);
    }, [carts]);

    const userIdLocal = localStorage.getItem('userId');

    useEffect(() => {
        if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
            refetchUser();
            refetchQuantityCart();
        }
    }, []);

    useEffect(() => {
        if (userIdLocal && data?.data.user) {
            setUser(data?.data.user);
            localStorage.setItem('userName', data?.data.user.name);
        }
    }, [data]);

    const changeLanguage = useCallback((selectedLocale: LanguageType) => {
        setLocale(selectedLocale);
        handleSetLocalStorage('language', selectedLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messages={language[locale]}>
            <CookiesProvider>
                <Context.Provider
                    value={{
                        user,
                        setUser,
                        locale,
                        changeLanguage,
                        quantityCart,
                        setQuantityCart,
                        refetchQuantityCart,
                    }}
                >
                    {children};
                </Context.Provider>
            </CookiesProvider>
        </IntlProvider>
    );
};

export default ContextGlobal;
