import { message } from 'antd';
import { SquarePen, Trash2 } from 'lucide-react';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import useCategory from '../../../hooks/useCategory';
import { ICategory } from '../../../interfaces/ICategory';
import ButtonEdit from '../components/Button/ButtonEdit';
import Heading from '../components/Heading';
import SkeletonComponent from '../components/Skeleton';
import TableAdmin from '../components/Table';
import FormCategory from './components/Form';
import { columns } from './datas';

const ListCategory = () => {
    const { loading, deleteCategory, categories, mainCategories, postCategory, getAllCategory } = useCategory();

    // DELETE CATEGORY
    const handleDeleteCategory = (id: string | number) => {
        if (confirm('Are you sure you want to delete this category?')) deleteCategory(id);
        message.success('Category delete successfully!');
        getAllCategory();
    };

    // ADD CATEGORY
    const handleSubmit = useCallback(async (newCategory: ICategory) => {
        await postCategory(newCategory);
        message.success('Category add successfully!');
        // getAllCategory();
    }, []);

    const columMain = {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: any, _: any, index: any) => {
            if (index === 0) {
                return {
                    children: (
                        <div className="text-center">
                            <FormCategory onFinish={handleSubmit} mainCategories={mainCategories} />
                        </div>
                    ),
                    props: {
                        colSpan: 8,
                    },
                };
            }
            return text;
        },
    };

    const columnDelete = {
        title: '',
        dataIndex: 'slug',
        key: '8',

        render: (slug: string | number, values: ICategory, index: number) => {
            // Kiểm tra nếu không phải hàng đầu tiên thì hiển thị các nút
            if (index !== 0) {
                return (
                    <div className="flex-row-center gap-x-5">
                        <Link to={`/admin/update-category/${slug}`}>
                            <ButtonEdit>
                                <SquarePen />
                            </ButtonEdit>
                        </Link>
                        <ButtonEdit onClick={() => handleDeleteCategory(values.id)}>
                            <Trash2 />
                        </ButtonEdit>
                    </div>
                );
            } else {
                // Nếu là hàng đầu tiên, không hiển thị gì
                return null;
            }
        },
    };

    return (
        <>
            {loading ? (
                <SkeletonComponent />
            ) : (
                <section>
                    <Heading>List Category</Heading>
                    <div>
                        <TableAdmin columns={[columMain, ...columns, columnDelete]} datas={categories} />
                    </div>
                </section>
            )}
        </>
    );
};

export default ListCategory;
