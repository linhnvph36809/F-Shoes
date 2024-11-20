import Swal from 'sweetalert2';
export const showMessageAdmin = (title: string, text: string, type: 'success' | 'error' | 'warning') => {
    Swal.fire({
        title: title,
        text: text,
        icon: type,
        showConfirmButton: false,
        timer: 1000,
    });
};

export const showMessageClient = (title: string, text: string, type: 'success' | 'error' | 'warning') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
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
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
    }).then((result) => {
        if (result.isConfirmed) {
            handleActive();
        }
    });
};
