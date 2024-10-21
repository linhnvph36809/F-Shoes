import { useCallback, useEffect, useState } from 'react';
import { IImage } from '../../../interfaces/IImage';
import Heading from '../components/Heading';
import FormProduct from './components/FormProduct';
import useProduct from '../../../hooks/useProduct';
import SkeletonComponent from '../components/Skeleton';

const UpdateProduct = () => {
    const [images, setImages] = useState<{
        isShow: boolean;
        images: IImage[];
    }>({
        isShow: false,
        images: [],
    });

    console.log(images);

    const { loading, product, postProduct } = useProduct();

    const onFinish = useCallback(
        async (values: any) => {
            postProduct(values);
        },
        [images],
    );

    useEffect(() => {
        setImages((preImage) => ({
            ...preImage,
            isShow: true,
            images: product ? product.images : [],
        }));
    }, [product]);

    return (
        <>
            {loading ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <Heading>Update Product</Heading>
                    <FormProduct setImages={setImages} images={images} onFinish={onFinish} initialValues={product} />
                </section>
            )}
        </>
    );
};

export default UpdateProduct;
