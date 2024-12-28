import { statusArr, statusString } from '../../../../../interfaces/IOrder';

const StatusItem = ({ onChangeStatus, bgColor, status }: any) => {
    return (
        <div
            className={`text-center ${bgColor} rounded-[12px] gap-x-3 p-5 text-white font-medium text-[18px]
                            hover:cursor-pointer transition-global hover:opacity-60 relative`}
            onClick={() => onChangeStatus(statusArr[status])}
        >
            {statusString(status).text}
        </div>
    );
};

export default StatusItem;
