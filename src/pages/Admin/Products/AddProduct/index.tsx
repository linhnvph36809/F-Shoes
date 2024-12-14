import { useCallback, useState } from 'react';

import { IImage } from '../../../../interfaces/IImage';
import Heading from '../../components/Heading';
import FormProduct from '../components/FormProduct';
import useProduct from '../../../../hooks/useProduct';
import ButtonBack from '../../components/ButtonBack';
import { PATH_ADMIN } from '../../../../constants/path';

const AddProduct = () => {
    const { loading, postProduct } = useProduct();

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
        },
        [images],
    );

    return (
        <>
            <section>
                <ButtonBack to={PATH_ADMIN.LIST_PRODUCT} />
                <Heading>Add Product</Heading>
                <FormProduct setImages={setImages} loading={loading} images={images} onFinish={onFinish} />
            </section>
        </>
    );
};

export default AddProduct;
