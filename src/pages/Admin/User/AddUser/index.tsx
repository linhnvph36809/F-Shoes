import { useCallback, useState } from 'react';

import useProduct from '../../../../hooks/useProduct';
import { IImage } from '../../../../interfaces/IImage';
import Heading from '../../components/Heading';
import FormUsers from '../FormUser';

const AddUser = () => {
    const { postProduct } = useProduct();

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
                <Heading>Add User</Heading>
                <FormUsers setImages={setImages} images={images} onFinish={onFinish} />
            </section>
        </>
    );
};

export default AddUser;
