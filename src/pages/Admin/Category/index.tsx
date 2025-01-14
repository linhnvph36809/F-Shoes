import { CopyPlus, Search, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';

import useCategory, { API_CATEGORY, QUERY_KEY } from '../../../hooks/useCategory';
import { ICategory } from '../../../interfaces/ICategory';
import ButtonEdit from '../components/Button/ButtonEdit';
import Heading from '../components/Heading';
import FormCategory from './components/Form';
import { columns } from './datas';
import { showMessageActive } from '../../../utils/messages';
import { ACTIONS, ACTIONS_CATEGORY, PERMISSION } from '../../../constants';
import PermissionElement from '../../../components/Permissions/PermissionElement';
import TableAdmin from '../components/Table';
import ButtonUpdate from '../components/Button/ButtonUpdate';
import { FormattedMessage, useIntl } from 'react-intl';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { ConfigProvider, Pagination } from 'antd';
import SkeletonComponent from '../components/Skeleton';
import { handleChangeMessage } from '../../../utils';
import { useContextGlobal } from '../../../contexts';

const ListCategory = () => {
    const intl = useIntl();
    const {locale} = useContextGlobal();
    const navigate = useNavigate();
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const page = params.get('page') || 1;
    const searchKey = params.get('search') || '';
    const { deleteCategory, mainCategories, postCategory, getAllCategory, putCategory } = useCategory();
    const { data: dataCachingCategory, isLoading } = useQueryConfig(
        [QUERY_KEY, `category/list/category/${page}`],
        API_CATEGORY + `?include=parents&times=category&paginate=true&per_page=5&page=${page}`,
    );

    const totalItems = dataCachingCategory?.data?.categories?.paginator.total_item || 0;
    const pageSize = dataCachingCategory?.data?.categories?.paginator.per_page || 10;

    const [data, setData] = useState<ICategory[]>([]);
    useEffect(() => {
        if (dataCachingCategory?.data?.categories?.data) {
            const originData = JSON.parse(JSON.stringify([...dataCachingCategory?.data?.categories?.data]));

            if (searchKey !== '') {
                const filtered = originData.filter((item: ICategory) => {
                    return (
                        item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
                        item.id.toString().includes(searchKey.toLowerCase())
                    );
                });
                setData([...filtered]);
            } else {
                setData([...originData]);
            }
        }
    }, [dataCachingCategory, searchKey]);

    const handlePageChange = (page: number) => {
        params.set('page', `${page}`);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const handleSearch = (e: any) => {
        params.set('search', e.target.value);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const [cateUpdate, setCateUpdate] = useState<any>();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleUpdate = (value: ICategory) => {
        setIsModalVisible(true);
        setCateUpdate(value);
    };

    // DELETE CATEGORY
    const handleDeleteCategory = (id?: string | number) => {
        if (id) {
            showMessageActive(handleChangeMessage(locale,'Are you sure you want to delete the Category?','Bạn có chắc muốn xóa danh mục này?'), '', 'warning', () => {
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

                    <PermissionElement
                        keyName={PERMISSION.PERMISSION_CATEGORY}
                        action={ACTIONS_CATEGORY.ACTIONS_ADD_PRODUCT}
                    >
                        <Link to={`/admin/update-category/${values.id}`}>
                            <ButtonEdit>
                                <CopyPlus />
                            </ButtonEdit>
                        </Link>
                    </PermissionElement>
                    {/* <PermissionElement keyName={PERMISSION.PERMISSION_CATEGORY} action={ACTIONS.ACTIONS_DELETE}> */}
                    {values.is_main != 1 ? (
                        !values?.display ? (
                            <PermissionElement keyName={PERMISSION.PERMISSION_CATEGORY} action={ACTIONS.ACTIONS_DELETE}>
                                <ButtonEdit onClick={() => handleDeleteCategory(values?.id)}>
                                    <Trash2 />
                                </ButtonEdit>
                            </PermissionElement>
                        ) : (
                            ''
                        )
                    ) : (
                        ''
                    )}

                    {/* </PermissionElement> */}
                </div>
            );
        },
    };

    return (
        <>
            <section>
                <Heading>
                    <FormattedMessage id="admin.listCategory" />
                </Heading>

                {/* Thanh công cụ chứa Form và ô tìm kiếm */}
                <div className="flex justify-between items-center mb-6">
                    {/* Form thêm danh mục */}
                    <PermissionElement keyName={PERMISSION.PERMISSION_CATEGORY} action={ACTIONS.ACTIONS_ADD}>
                        <FormCategory
                            onFinish={handleSubmit}
                            mainCategories={mainCategories}
                            isModalVisible={isModalVisible}
                            setIsModalVisible={setIsModalVisible}
                            className="flex-1"
                            initialValues={cateUpdate}
                            setCateUpdate={setCateUpdate}
                        />
                    </PermissionElement>

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
                                onChange={handleSearch}
                                className={`w-full h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            />
                            <Search className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global" />
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <SkeletonComponent className="mt-10" />
                ) : (
                    <div>
                        <div className="w-full">
                            <TableAdmin
                                columns={[...columns, columnDelete]}
                                pagination={false}
                                dataSource={[...data]}
                            />
                        </div>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorPrimary: '#11111',
                                },
                            }}
                        >
                            {' '}
                            <Pagination
                                align="end"
                                current={page || (1 as any)}
                                total={totalItems}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                            />
                        </ConfigProvider>
                    </div>
                )}
            </section>
            {/* )} */}
        </>
    );
};

export default ListCategory;
