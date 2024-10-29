export function formatCurrencyVND(amount: any) {
    return amount.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
    });
}