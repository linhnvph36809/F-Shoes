import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import { useContextGlobal } from '../contexts';
dayjs.extend(relativeTime);
dayjs.extend(utc);
import 'dayjs/locale/vi';
import { LANGUAGE_EN, LANGUAGE_VI } from '../constants';

export const formatPrice = (price: number): string => {
    const intPart = Math.floor(price);
    return intPart.toLocaleString('vi-VN');
};

export const timeToNow = (time: string) => {
    const { locale } = useContextGlobal();
    dayjs.locale(locale || 'vi');
    return dayjs(time).fromNow();
};

export const formatTime = (time: string | undefined): string => {
    if (!time) return '';
    const date = new Date(time);

    if (isNaN(date.getTime())) {
        throw new Error('Invalid Date');
    }

    const formattedDate = date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    return formattedDate;
};
export const oneMonthAgo = (): Date => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
};

export const handleSetLocalStorage = (name: string, value: any) => {
    localStorage.setItem(name, value);
};

export const handleGetLocalStorage = (name: string) => {
    return localStorage.getItem(name) || null;
};

export const handleRemoveLocalStorage = (name: string) => {
    return localStorage.removeItem(name);
};

export const handleChangeTitleTab = (title: string) => {
    document.title = title;
};

export const createTitleLoader = (title: string) => {
    document.title = title;
};

export const handleChangeMessage: (language: string, enMessage: string, viMessage: string) => any = (
    language,
    enMessage,
    viMessage,
) => {
    console.log(language);

    if (language === LANGUAGE_EN) {
        return enMessage;
    } else if (language === LANGUAGE_VI) {
        return viMessage;
    }
};
