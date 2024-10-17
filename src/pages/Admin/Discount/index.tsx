
import { columns, data } from '../Category/datas';
import Heading from '../components/Heading';
// import { columns, data } from './datas';
import TableAdmin from '../components/Table';

const Discount = () => {
    return (
        <>
            <section>
                <Heading>List Category</Heading>
                <div>
                    <TableAdmin columns={columns} datas={data} />
                </div>
            </section>
        </>
    );
};

export default Discount;
