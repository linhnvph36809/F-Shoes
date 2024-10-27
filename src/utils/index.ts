export const formatPrice = (price: number): string  => {
    const intPart = Math.floor(price);
    return intPart.toLocaleString('vi-VN')
}