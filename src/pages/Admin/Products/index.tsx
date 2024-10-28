import { CopyPlus, SquarePen, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import { columnsAttribute } from './datas';
import useProduct from '../../../hooks/useProduct';
import { IProduct } from '../../../interfaces/IProduct';
import Heading from '../components/Heading';
import TableAdmin from '../components/Table';
import ButtonEdit from '../components/Button/ButtonEdit';
import SkeletonComponent from '../components/Skeleton';

const ListProduct = () => {
    const { loading, deleteProduct, products } = useProduct();
    console.log(products);

    const handleDeleteProduct = (id: string | number) => {
        if (confirm('Are you sure you want to delete this product')) deleteProduct(id);
    };

    const columnDelete = {
        title: '',
        dataIndex: 'slug',
        key: '8',
        render: (slug: string | number, values: IProduct) => {
            return (
                <div className="flex-row-center gap-x-3">
                    <Link to={`/admin/add-variant/${slug}`}>
                        <ButtonEdit>
                            <CopyPlus />
                        </ButtonEdit>
                    </Link>
                    <Link to={`/admin/update-product/${slug}`}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    <ButtonEdit onClick={() => handleDeleteProduct(values.id)}>
                        <Trash2 />
                    </ButtonEdit>
                </div>
            );
        },
    };
    return (
        <>
            {loading ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <Heading>List Product</Heading>
                    <div>
                        <TableAdmin
                            scroll={{ x: 'max-content' }}
                            rowKey="id"
                            columns={[...columnsAttribute, columnDelete]}
                            datas={products}
                        />
                    </div>
                </section>
            )}
        </>
    );
};

export default ListProduct;
