import { useCallback, useState } from 'react';

import { IImage } from '../../../../interfaces/IImage';
import Heading from '../../components/Heading';
import FormProduct from '../components/FormProduct';
import useProduct from '../../../../hooks/useProduct';
import useQueryConfig from '../../../../hooks/useQueryConfig';

const AddProduct = () => {
    const { postProduct } = useProduct();

    const { refetch } = useQueryConfig(
        'all-product-admin-1',
        '/api/product?per_page=8&page=1&include=categories,sale_price,variations',
    );

    const [images, setImages] = useState<{
        isShow: boolean;
        images: IImage[];
    }>({
        isShow: false,
        images: [],
    });

    const onFinish = useCallback(
        async (values: any) => {
            postProduct(values);
            refetch();
        },
        [images],
    );

    return (
        <>
            <section>
                <Heading>Add Product</Heading>
                <FormProduct setImages={setImages} images={images} onFinish={onFinish} />
            </section>
        </>
    );
};

export default AddProduct;
