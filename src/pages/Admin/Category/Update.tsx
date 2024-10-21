import { message } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useCategory from '../../../hooks/useCategory';
import { ICategory } from '../../../interfaces/ICategory';
import Heading from '../components/Heading';
import SkeletonComponent from '../components/Skeleton';
import FormCategory from './components/Form';

const UpdateCategory = () => {
    const { slug } = useParams(); // Lấy slug từ URL
    const { categories, mainCategories, loading, putCategory } = useCategory();
    const [initialValues, setInitialValues] = useState<ICategory | null>(null);
    const [categoryId, setCategoryId] = useState<string | number | null>(null);

    useEffect(() => {
        const categoryToUpdate = categories.find((category) => category.slug === slug);
        if (categoryToUpdate) {
            setInitialValues(categoryToUpdate);
            setCategoryId(categoryToUpdate.id);
        } else {
            console.error('Category not found for slug:', slug);
        }
    }, [slug, categories]);

    const handleFinish = useCallback(
        async (updatedCategory: ICategory) => {
            try {
                if (categoryId) {
                    await putCategory({ ...updatedCategory, id: categoryId });
                }
                message.success('Category updated successfully!');
            } catch (error) {
                message.error('Failed to update category. Please try again.');
                console.error('Error updating category:', error);
            }
        },
        [categoryId],
    );

    return (
        <>
            {loading ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <Heading>Update Category</Heading>
                    <FormCategory
                        mainCategories={mainCategories}
                        onFinish={handleFinish}
                        initialValues={initialValues}
                    />
                </section>
            )}
        </>
    );
};

export default UpdateCategory;
