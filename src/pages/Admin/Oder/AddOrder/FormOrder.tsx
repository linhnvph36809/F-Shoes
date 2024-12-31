import { useState } from 'react';
import TableAdmin from '../../components/Table';
import { columns } from './datas';
import ModalChooseProduct from './ModalChooseProduct';
import { FormattedMessage } from 'react-intl';
import ButtonDelete from '../../components/Button/ButtonDelete';

const FormOrder = () => {
    const [products, setProducts] = useState<any>([]);

    const handleSetProducts = (product: any) => {
        const index = products.findIndex((productIndex: any) => {
            if (product.product_id) {
                return productIndex.product_id === product.product_id;
            } else {
                return productIndex.product_variation_id === product.product_variation_id;
            }
        });


        setProducts((preProducts: any) => {
            if (index >= 0) {
                const newValues = [...preProducts];
                newValues[index] = product;
                return newValues;
            } else {
                return [...preProducts, product];
            }
        });
    };

    const handleDeleteProduct = (index: number) => {
        setProducts((preProducts: any) => preProducts.filter((_: any, i: number) => i !== index));
    };


    return (
        <div className="p-10">
            <div>
                <div className="flex justify-between items-center">
                    <h3 className="text-[32px] font-bold">Giỏ hàng </h3>
                    <ModalChooseProduct handleSetProducts={handleSetProducts} />
                </div>
                <div>
                    <TableAdmin
                        className="table-order-admin my-10"
                        rowKey="id"
                        columns={[
                            ...columns,
                            {
                                title: <FormattedMessage id="category.table.action" />,
                                dataIndex: 'slug',
                                key: '9',
                                render: (_: number, __: any, index: number) => <ButtonDelete onClick={() => handleDeleteProduct(index)} />,
                            },
                        ]}
                        dataSource={products}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default FormOrder;
