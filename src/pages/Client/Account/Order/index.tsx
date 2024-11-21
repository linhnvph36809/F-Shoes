import useQueryConfig from '../../../../hooks/useQueryConfig';
import Heading from './components/Heading';
import ListOrder from './components/ListOrder';
const OrderProfile = () => {
    const { data } = useQueryConfig('order-all', '/api/me/orders');
    console.log(data);

    return (
        <section>
            <Heading>All Order</Heading>
            <ListOrder data={data?.data?.data || []} />
        </section>
    );
};

export default OrderProfile;
