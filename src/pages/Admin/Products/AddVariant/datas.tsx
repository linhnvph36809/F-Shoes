export function combine(arr: any) {

    if (arr.length === 0) {
        return [];  // Nếu mảng trống, trả về mảng trống
    }

    const result: any = [];

    function helper(tempValues: any, tempIds: any, index: any) {
        if (index === arr.length) {
            result.push({
                values: tempValues,
                ids: tempIds,
            });
            return;
        }

        for (let i = 0; i < arr[index].length; i++) {
            helper(
                [...tempValues, arr[index][i].value], // Thêm giá trị vào mảng values
                [...tempIds, arr[index][i].id], // Thêm id vào mảng ids
                index + 1,
            );
        }
    }

    helper([], [], 0);
    return result;
}
