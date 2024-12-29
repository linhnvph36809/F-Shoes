import TableAdmin from '../../components/Table';
import { columns } from './datas';
import ModalChooseProduct from './ModalChooseProduct';

const FormOrder = () => {
    return (
        <div className="p-10">
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-[32px] font-bold">Giỏ hàng </h3>
                    <ModalChooseProduct />
                </div>
                <div>
                    <TableAdmin className="table-order-admin my-10" rowKey="id" columns={columns} pagination={false} />
                </div>
            </div>
        </div>
    );
};

export default FormOrder;
