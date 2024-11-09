export const formatPrice = (price: number): string  => {
    const intPart = Math.floor(price);
    return intPart.toLocaleString('vi-VN')
}

export const formatTime = (time:string|undefined):string =>  {
    if(!time) return '';
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
}