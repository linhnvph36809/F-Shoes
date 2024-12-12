import { Button, Dropdown, Menu, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';
import Heading from './components/Heading';
import ProductList from './Productslist';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { IProduct } from '../../../interfaces/IProduct.ts';
import FilterByCategory from './components/Fiter/FilterByCategory.tsx';
import { ICategory } from '../../../interfaces/ICategory.ts';
import FilterBox from './components/Fiter';
import useQueryConfig from '../../../hooks/useQueryConfig.tsx';
import { FormattedMessage } from 'react-intl';

const sortKeysArray = [
    {
        key: 'lowToHigh',
        name: <FormattedMessage id="filter.category.lowToHigh" />,
    },
    {
        key: 'highToLow',
        name: <FormattedMessage id="filter.category.High To Low" />,
    },
    {
        key: 'newest',
        name: <FormattedMessage id="filter.category.Newest" />,
    },
    {
        key: 'bestSelling',
        name: <FormattedMessage id="filter.category.Best Selling" />,
    },
];

const CategoryPage = () => {
    const newQuery = new URLSearchParams(location.search);
    const [filtersVisible, setFiltersVisible] = useState(true);
    const navigator = useNavigate();
    const page = newQuery.get('page') || 1;
    const [totalItemPage, setTotalItemPage] = useState<number | undefined>();

    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const sortOption = searchParams.get('sort');

    const { data: dataCachingCategories } = useQueryConfig('category-list_categories_filter', 'api/category');

    const listCategories: ICategory[] | [] = dataCachingCategories?.data?.categories?.data || [];

    const [listProducts, setListProduct] = useState<IProduct[] | []>([]);

    const [idCategory, setIdCategory] = useState<number | string | undefined>();
    useEffect(() => {
        if (slug !== undefined) {
            const index = slug.lastIndexOf('.');
            const id = slug.substring(index + 1);
            setIdCategory(id);
        } else {
            setIdCategory('');
        }
    }, [slug]);

    const variationsQuery = newQuery.get('attributes');
    const searchKey = newQuery.get('search');
    const { data: dataProduct, isFetching: productFetching } = useQueryConfig(
        [
            'products',
            `category-list-products-search-${searchKey ? searchKey : 'empty'}-${idCategory ? `${slug}` : 'empty'}-${
                variationsQuery ? `${variationsQuery}` : 'empty'
            }-page-${page}-total-${totalItemPage ? totalItemPage : 'all'}`,
        ],
        `api/product/by/attribute-values?categoryId=${idCategory ? idCategory : ''}&attributes=${
            variationsQuery ? variationsQuery : ''
        }&per_page=12&page=${page}&search=${searchKey ? searchKey : ''}`,
    );

    useEffect(() => {
        if (dataProduct?.data?.products?.data) {
            setListProduct(dataProduct?.data?.products?.data);
            setTotalItemPage(dataProduct?.data?.products?.paginator?.total_item);
        }
    }, [dataProduct?.data?.products?.data, slug, newQuery]);
   

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    const changeSort = (key: string) => {
        newQuery.set('sort', `${key}`);
        navigator(`?${newQuery.toString()}`, { replace: true });
    };

    const handlePageChange = (page: number) => {
        newQuery.set('page', `${page}`);
        navigator(`?${newQuery.toString()}`, { replace: true });
    };
    const sortMenu = (
        <Menu>
            {sortKeysArray.map((item, index) => (
                <Menu.Item key={index}>
                    <div onClick={() => changeSort(item.key)}> {item.name}</div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-5">
                <div className="flex items-center space-x-4">
                    <Button icon={<FilterOutlined />} onClick={toggleFilters}>
                        {filtersVisible ? (
                            <FormattedMessage id="filters.hide" />
                        ) : (
                            <FormattedMessage id="filters.show" />
                        )}
                    </Button>
                    <Dropdown overlay={sortMenu} trigger={['click']}>
                        <Button>
                            {<FormattedMessage id="body.category.Sort By" />} <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </div>

            <div className="flex">
                {/* Left Sidebar - Filter Section */}
                {filtersVisible && (
                    <div
                        className="filter-container"
                        style={{
                            width: '260px',
                            maxWidth: '100%',
                            marginRight: '20px',
                            position: 'sticky',
                            top: '0',
                            height: '100vh',
                            overflowY: 'auto',
                        }}
                    >
                        <Heading title={<FormattedMessage id="body.category.List" />} />
                        <FilterByCategory categories={listCategories} />
                        <div className="my-4">
                            <FilterBox />
                        </div>
                    </div>
                )}

                {/* Right Content - Product List */}
                <div className="flex-1">
                    {slug && listProducts.length === 0 && (
                        <div className="flex items-center justify-center w-full h-[40ppx] border mb-8">
                            <p className="text-center text-xl my-4 font-sans text-[14px] text-gray-400">
                                {
                                    <FormattedMessage id="body.category.There are too few products in this category! Please check out products in other categories below." />
                                }
                            </p>
                        </div>
                    )}
                    <ProductList products={listProducts} loading={productFetching} sortOption={sortOption} />
                    <Pagination
                        align="end"
                        current={page || (1 as any)}
                        total={totalItemPage}
                        pageSize={10}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
