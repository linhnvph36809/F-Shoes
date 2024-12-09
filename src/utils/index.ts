import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
export const formatPrice = (price: number): string => {
    const intPart = Math.floor(price);
    return intPart.toLocaleString('vi-VN');
};

export const timeToNow = (time: string) => {
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
    return localStorage.getItem(name);
};

export const handleRemoveLocalStorage = (name: string) => {
    return localStorage.removeItem(name);
};
