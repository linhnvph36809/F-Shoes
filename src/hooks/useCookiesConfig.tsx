import { useCookies } from 'react-cookie';

const useCookiesConfig = (cookieName: string) => {
    const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

    const handleSetCookie = (name:string, value: any, expires: any) => {
        setCookie(name, value, { path: '/', expires });
    };

    return {
        cookies,
        handleSetCookie,
        removeCookie,
    };
};

export default useCookiesConfig;
