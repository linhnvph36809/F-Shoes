import Swal from 'sweetalert2';
import { handleChangeMessage, handleGetLocalStorage } from '.';
import { LANGUAGE_VI } from '../constants';
export const showMessageAdmin = (title: string, text: string, type: 'success' | 'error' | 'warning', time?: number) => {
    Swal.fire({
        title: title,
        text: text,
        icon: type,
        showConfirmButton: false,
        timer: time || 1000,
    });
};

export const showMessageClient = (title: string, text: string, type: 'success' | 'error' | 'warning') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });
    Toast.fire({
        icon: type,
        title: title,
        text: text,
        customClass: {
            title: 'message-client-text',
            icon: 'message-client-icon',
        },
    });
};

export const showMessageActive = (
    title: string,
    text: string,
    type: 'success' | 'error' | 'warning',
    handleActive: () => void,
) => {
    Swal.fire({
        title: title,
        text: text,
        icon: type,
        confirmButtonColor: '#111111',
        showCancelButton: true,
        confirmButtonText: handleChangeMessage(handleGetLocalStorage('language') || LANGUAGE_VI, 'OK', 'Đồng ý'),
        cancelButtonText: handleChangeMessage(handleGetLocalStorage('language') || LANGUAGE_VI, 'Cancel', 'Hủy'),
    }).then((result) => {
        if (result.isConfirmed) {
            handleActive();
        }
    });
};
