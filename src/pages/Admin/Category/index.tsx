import { CopyPlus, SquarePen, Trash2 } from 'lucide-react';
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
import { showMessageActive } from '../../../utils/messages';
import { ACTIONS, PERMISSION } from '../../../constants';
import PermissionElement from '../../../components/Permissions/PermissionElement';

const ListCategory = () => {
    const { loading, deleteCategory, categories, mainCategories, postCategory, getAllCategory, putCategory } =
        useCategory();

    const [cateUpdate, setCateUpdate] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredCategories, setFilteredCategories] = useState<ICategory[]>(categories);

    console.log(cateUpdate);

    const handleUpdate = (value: ICategory) => {
        setIsModalVisible(true);
        setCateUpdate(value);
    };

    useEffect(() => {
        const filtered = categories.filter((category) =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredCategories(filtered);
    }, [searchTerm, categories]);

    // DELETE CATEGORY
    const handleDeleteCategory = (id?: string | number) => {
        if (id) {
            showMessageActive('Are you sure you want to delete the Category?', '', 'warning', () => {
                deleteCategory(id);
                getAllCategory();
            });
        }
    };

    const handleSubmit = useCallback(
        async (newCategory: ICategory) => {
            if (cateUpdate) {
                await putCategory(cateUpdate.id, newCategory);
            } else {
                await postCategory(newCategory);
            }
        },
        [cateUpdate],
    );

    const columMain = {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (text: any, _: any, index: any) => {
            if (index === 0) {
                return {
                    props: {
                        colSpan: 4,
                    },
                };
            }
            return text;
        },
    };

    // Cột xóa danh mục
    const columnDelete = {
        title: 'Action',
        dataIndex: 'id',
        key: '8',
        render: (_: any, values: ICategory, index: number) => {
            if (index !== 0) {
                return (
                    <div className="flex-row-center gap-x-5">
                        <PermissionElement keyName={PERMISSION.PERMISSION_CATEGORY} action={ACTIONS.ACTIONS_EDIT}>
                            <ButtonEdit onClick={() => handleUpdate(values)}>
                                <SquarePen />
                            </ButtonEdit>
                        </PermissionElement>
                        <Link to={`/admin/update-category/${values.id}`}>
                            <ButtonEdit>
                                <CopyPlus />
                            </ButtonEdit>
                        </Link>
                        <PermissionElement keyName={PERMISSION.PERMISSION_CATEGORY} action={ACTIONS.ACTIONS_DELETE}>
                            <ButtonEdit onClick={() => handleDeleteCategory(values?.id)}>
                                <Trash2 />
                            </ButtonEdit>
                        </PermissionElement>
                    </div>
                );
            } else {
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

                    {/* Thanh công cụ chứa Form và ô tìm kiếm */}
                    <div className="flex justify-between items-center mb-6">
                        {/* Form thêm danh mục */}
                        <FormCategory
                            onFinish={handleSubmit}
                            mainCategories={mainCategories}
                            isModalVisible={isModalVisible}
                            setIsModalVisible={setIsModalVisible}
                            className="flex-1"
                            initialValues={cateUpdate}
                            setCateUpdate={setCateUpdate}
                        />

                        {/* Ô tìm kiếm */}
                        <div className="relative w-full max-w-[300px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>

                            {/* Input tìm kiếm */}
                            <input
                                type="text"
                                placeholder="    Search by category name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-[48px] border border-gray-300 rounded-lg pl-10 pr-4 shadow-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-400 transition duration-200"
                            />
                        </div>
                    </div>

                    {/* Bảng dữ liệu */}
                    <div className="w-full">
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
