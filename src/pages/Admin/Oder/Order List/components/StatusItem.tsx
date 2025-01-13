import { statusArr, statusString } from '../../../../../interfaces/IOrder';
import { ICON_STATUS_ORDER } from '../../../../../constants/icons';

const StatusItem = ({ onChangeStatus, bgColor, status, quantity, statusActive }: any) => {
    return (
        <div
            className={`flex items-center justify-center text-center ${bgColor} ${statusActive === status ? 'border-2 border-gray-500' : 'opacity-40'} rounded-[12px] gap-x-3 p-3 text-white font-medium text-[16px]
            hover:cursor-pointer transition-global hover:opacity-60 relative`}
            onClick={() => onChangeStatus(statusArr[status], status)}
        >
            <div>
                <div className="flex justify-center">
                    {ICON_STATUS_ORDER[status]}
                </div>
                <div>{quantity} {statusString(status).text}</div>
            </div>
        </div>
    );
};

export default StatusItem;
