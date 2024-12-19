import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import { IntlProvider } from 'react-intl';

import language_en from '../translations/en.json';
import language_vi from '../translations/vi.json';

import useQueryConfig from '../hooks/useQueryConfig';
import { handleGetLocalStorage, handleSetLocalStorage } from '../utils';
import { INFO_AUTH, TOKENS } from '../constants';
import { tokenManagerInstance } from '../api';

const Context = createContext<any>({});

export const useContextGlobal = () => useContext(Context);

type LanguageType = 'en' | 'vi';

const language = {
    en: language_en,
    vi: language_vi,
};

const ContextGlobal = ({ children }: { children: ReactNode }) => {
    const languageLocal = (handleGetLocalStorage('language') as LanguageType) || 'vi';
    const [locale, setLocale] = useState<LanguageType>(languageLocal);
    const [user, setUser] = useState<any>();
    const [quantityCart, setQuantityCart] = useState<number>(0);

    const {
        data,
        refetch: refetchUser,
        isFetching,
    } = useQueryConfig('user-infor', '/api/auth/me?include=group', {
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

    const userIdLocal = handleGetLocalStorage(INFO_AUTH.userId);
    const adminId = handleGetLocalStorage(INFO_AUTH.adminId);

    useEffect(() => {
        if (handleGetLocalStorage(TOKENS.ACCESS_TOKEN) && handleGetLocalStorage(TOKENS.REFRESH_TOKEN)) {
            refetchUser();
            refetchQuantityCart();
        }
        tokenManagerInstance('get', `api/change/language?lang=${locale}`);

    }, []);

    useEffect(() => {
        if (userIdLocal || (adminId && data?.data.user)) {
            setUser(data?.data.user);
            handleSetLocalStorage(INFO_AUTH.userName, data?.data.user.name);
            handleSetLocalStorage(INFO_AUTH.adminName, data?.data.user.name);
        }
    }, [data]);

    const changeLanguage = useCallback(async (selectedLocale: LanguageType) => {
        tokenManagerInstance('get', `api/change/language?lang=${selectedLocale}`);
        setLocale(selectedLocale);
        handleSetLocalStorage('language', selectedLocale);
    }, []);

    return (
        <IntlProvider locale={locale} messages={language[locale]}>
            <CookiesProvider>
                <Context.Provider
                    value={{
                        user,
                        isFetching,
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
