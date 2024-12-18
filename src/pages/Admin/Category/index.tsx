import { CopyPlus, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

import useCategory from '../../../hooks/useCategory';
import { ICategory } from '../../../interfaces/ICategory';
import ButtonEdit from '../components/Button/ButtonEdit';
import Heading from '../components/Heading';
import FormCategory from './components/Form';
import { columns } from './datas';
import { showMessageActive } from '../../../utils/messages';
import { ACTIONS, PERMISSION } from '../../../constants';
import PermissionElement from '../../../components/Permissions/PermissionElement';
import TableAdmin from '../components/Table';
import ButtonUpdate from '../components/Button/ButtonUpdate';
import { FormattedMessage, useIntl } from 'react-intl';

const ListCategory = () => {
    const intl = useIntl();
    const { deleteCategory, categories, mainCategories, postCategory, getAllCategory, putCategory } = useCategory();

    const [cateUpdate, setCateUpdate] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredCategories, setFilteredCategories] = useState<ICategory[]>(categories);

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

    // Cột xóa danh mục
    const columnDelete = {
        title: <FormattedMessage id="category.table.action" />,
        dataIndex: 'id',
        key: 'id',
        render: (_: any, values: ICategory) => {
            return (
                <div className="flex-row-center gap-x-5">
                    <PermissionElement keyName={PERMISSION.PERMISSION_CATEGORY} action={ACTIONS.ACTIONS_EDIT}>
                        <ButtonUpdate onClick={() => handleUpdate(values)}></ButtonUpdate>
                    </PermissionElement>
                    <Link to={`/admin/update-category/${values.id}`}>
                        <ButtonEdit>
                            <CopyPlus />
                        </ButtonEdit>
                    </Link>
                    {/* <PermissionElement keyName={PERMISSION.PERMISSION_CATEGORY} action={ACTIONS.ACTIONS_DELETE}> */}
                    <ButtonEdit onClick={() => handleDeleteCategory(values?.id)}>
                        <Trash2 />
                    </ButtonEdit>
                    {/* </PermissionElement> */}
                </div>
            );
        },
    };

    return (
        <>
            {/* {loading ? (
                <SkeletonComponent />
            ) : ( */}
            <section>
                <Heading>
                    <FormattedMessage id="admin.listCategory" />
                </Heading>

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
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={intl.formatMessage({ id: 'category.search' })}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            />
                            <Search className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global" />
                        </div>
                    </div>
                </div>

                {/* Bảng dữ liệu */}
                <div className="w-full">
                    <TableAdmin columns={[...columns, columnDelete]} dataSource={[...filteredCategories]} />
                </div>
            </section>
            {/* )} */}
        </>
    );
};

export default ListCategory;
