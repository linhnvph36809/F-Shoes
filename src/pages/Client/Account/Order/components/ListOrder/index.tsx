import { IOrder } from '../../../../../../interfaces/IOrder';
import OrderItem from '../OrderItem';

const ListOrder = ({ data }: { data: IOrder[] }) => {
    return (
        <div>
            {data.map((order: IOrder) => (
                <OrderItem order={order} />
            ))}
        </div>
    );
};

export default ListOrder;
