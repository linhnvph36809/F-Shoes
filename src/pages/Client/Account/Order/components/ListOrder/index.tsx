import { FormattedMessage } from 'react-intl';
import { IOrder } from '../../../../../../interfaces/IOrder';
import OrderItem from '../OrderItem';

const ListOrder = ({ data }: { data: IOrder[] }) => {
    return (
        <div>
            {data.length ? (
                data.map((order: IOrder) => <OrderItem key={order.id} order={order} />)
            ) : (
                <p className="text-center font-medium text-[16px]">{<FormattedMessage id="No data" />}</p>
            )}
        </div>
    );
};

export default ListOrder;
