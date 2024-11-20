import { message } from 'antd';
import { SquarePen, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
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

    // State for search input
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredCategories, setFilteredCategories] = useState<ICategory[]>(categories);

    // Effect to filter categories based on search term
    useEffect(() => {
        const filtered = categories.filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredCategories(filtered);
    }, [searchTerm, categories]); // Update when search term or categories change

    // DELETE CATEGORY
    const handleDeleteCategory = (id: string | number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            deleteCategory(id);
            message.success('Category deleted successfully!');
            getAllCategory();
        }
    };

    // ADD CATEGORY
    const handleSubmit = useCallback(async (newCategory: ICategory) => {
        await postCategory(newCategory);
        message.success('Category added successfully!');
        // getAllCategory(); // Uncomment if you want to refresh the category list after adding
    }, []);

    // Tạo một cột đầu tiên để chứa form và ô tìm kiếm
    const columMain = {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: any, _: any, index: any) => {
            if (index === 0) {
                return {
                    children: (
                        <div className="">
                            {/* Form thêm danh mục */}
                            <div className="flex">
                                <FormCategory
                                    onFinish={handleSubmit}
                                    mainCategories={mainCategories}
                                    className="w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Search by category name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-[250px] h-[50px] border-2 border-[#111111] px-2 rounded-lg"
                                />
                            </div>
                        </div>
                    ),
                    props: {
                        colSpan: 4, // Gộp các cột để form và ô tìm kiếm chiếm trọn hàng đầu tiên
                    },
                };
            }
            return text;
        },
    };

    // Cột xóa danh mục
    const columnDelete = {
        title: '',
        dataIndex: 'id',
        key: '8',
        render: (_: any, values: ICategory, index: number) => {
            // Sử dụng index để kiểm tra dòng đầu tiên
            if (index !== 0) {
                return (
                    <div className="flex-row-center gap-x-5">
                        <Link to={`/admin/update-category/${values?.id}`}>
                            <ButtonEdit>
                                <SquarePen />
                            </ButtonEdit>
                        </Link>
                        <ButtonEdit onClick={() => handleDeleteCategory(values?.id)}>
                            <Trash2 />
                        </ButtonEdit>
                    </div>
                );
            } else {
                return null; // Không hiển thị gì ở dòng đầu
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
                        {/* Bảng với form và ô tìm kiếm ở hàng đầu tiên */}
                        <TableAdmin
                            columns={[columMain, ...columns, columnDelete]}
                            datas={[{}, ...filteredCategories]}
                        />
                    </div>
                </section>
            )}
        </>
    );
};

export default ListCategory;
