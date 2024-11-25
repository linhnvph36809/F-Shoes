import { useLocation, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { IImage } from '../../../interfaces/IImage';
import Heading from '../components/Heading';
import FormProduct from './components/FormProduct';
import useProduct, { API_PRODUCT } from '../../../hooks/useProduct';
import SkeletonComponent from '../components/Skeleton';
import useQueryConfig from '../../../hooks/useQueryConfig';
import ButtonBack from '../components/ButtonBack';

const KEY = 'product-detail-admin';

const UpdateProduct = () => {
    const { slug } = useParams();

    let id: string | number | undefined;
    if (slug) {
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }

    const location = useLocation();

    const prevUrl = location.state?.prevUrl;

    let page = null;
    if (prevUrl) {
        const url = new URL(prevUrl);
        const searchParams = new URLSearchParams(url.search);
        page = searchParams.get('page') || 1;
    }

    const { refetch } = useQueryConfig(
        `all-product-admin-${page}`,
        API_PRODUCT + `?per_page=8&page=${page}&include=categories,sale_price,variations`,
    );

    const [images, setImages] = useState<{
        isShow: boolean;
        images: IImage[];
    }>({
        isShow: false,
        images: [],
    });

    const { putProduct, loading } = useProduct();
    const { data: product, isFetching } = useQueryConfig(KEY + id, `${API_PRODUCT}/${id}?include=categories,images`);

    const onFinish = useCallback(
        async (values: any) => {
            putProduct(values);
            refetch();
        },
        [images],
    );

    useEffect(() => {
        setImages((preImage) => ({
            ...preImage,
            isShow: true,
            images: product?.data ? product.data.images : [],
        }));
    }, [product]);

    return (
        <>
            {isFetching ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <ButtonBack to={prevUrl} />
                    <Heading>Update Product</Heading>
                    <FormProduct
                        setImages={setImages}
                        images={images}
                        onFinish={onFinish}
                        initialValues={product?.data}
                        loading={loading}
                    />
                </section>
            )}
        </>
    );
};

export default UpdateProduct;
