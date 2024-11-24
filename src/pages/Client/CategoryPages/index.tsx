import { Button, Dropdown, Menu } from 'antd';
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

const sortKeysArray = [
    {
        key: 'lowToHigh',
        name: 'Low To High',
    },
    {
        key: 'highToLow',
        name: 'High To Low ',
    },
    {
        key: 'newest',
        name: 'Newest',
    },
    {
        key: 'bestSelling',
        name: 'Best Selling',
    },
];

const CategoryPage = () => {
    const [filtersVisible, setFiltersVisible] = useState(true);
    const navigator = useNavigate();
    
    const {data:dataRawProducts, isFetching: loadingProducts} = useQueryConfig(
        'category-list-raw-products',
        'api/product?include=categories'
    );    
    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const sortOption = searchParams.get('sort');
    const newQuery = new URLSearchParams(location.search);
    let listProducts: IProduct[] | [] = dataRawProducts?.data?.data || [];
    
   
    const {data:dataCachingCategories} = useQueryConfig('category-list_categories_filter','api/category');
    
    
    const listCategories: ICategory[] | [] =dataCachingCategories?.data?.categories?.data  || [];
 
    const [productsByCategory, setProductsByCategory] = useState<IProduct[] | []>([]);

    
    const [idCategory, setIdCategory] = useState<number|string|undefined>();
    useEffect(() => {
        if (slug !== undefined) {
            const index = slug.lastIndexOf('.');
            const id = slug.substring(index + 1);
            setIdCategory(id);
        }
    }, [slug])
    
    const variationsQuery = newQuery.get('attributes');
 
       
    const { data:dataAttribute, isFetching:attributeFetchingProduct } = useQueryConfig(`category-list-load-by-attributes-${idCategory ? `${idCategory}` : 'empty'}-${variationsQuery ? `${variationsQuery}` : 'empty'}`, `api/product/by/attribute-values?categoryId=${idCategory ? idCategory:''}&attributes=${variationsQuery ? variationsQuery : ''}`);
    useEffect(() => {   
        if(dataAttribute?.data?.products){
            setProductsByCategory(dataAttribute?.data?.products);
        }
       
    }, [dataAttribute?.data?.products]);
    if (productsByCategory && productsByCategory.length > 0) {
        listProducts = productsByCategory;
    }
    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    const changeSort = (key: string) => {
        newQuery.set('sort', `${key}`);
        navigator(`?${newQuery.toString()}`, { replace: true });
    };

    const sortMenu = (
        <Menu>
            {sortKeysArray.map((item, index) => (
                <Menu.Item key={index}>
                    <div onClick={() => changeSort(item.key)}> Sort by {item.name}</div>
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-5">
                
                <div className="flex items-center space-x-4">
                    <Button icon={<FilterOutlined />} onClick={toggleFilters}>
                        {filtersVisible ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                    <Dropdown overlay={sortMenu} trigger={['click']}>
                        <Button>
                            Sort By <DownOutlined />
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
                        {/* {categories.map((category, index) => (
                            <a
                                key={index}
                                href="#"
                                className="block text-16px font-bold my-2"
                                onClick={() => navigate(`/category/${category.id}`)}
                            >
                                {category.name}
                            </a>
                        ))} */}

                       
                        
                        <Heading title='List'  />
                        <FilterByCategory categories={listCategories} />
                        <div className="my-4">
                            <FilterBox />
                        </div>
                    </div>
                )}

                {/* Right Content - Product List */}
                <div className="flex-1">
                    {slug && productsByCategory.length === 0 && (
                        <div className='flex items-center justify-center w-full h-[40ppx] border mb-8'>
                            <p className="text-center text-xl my-4 font-sans text-[14px] text-gray-400">
                            There are too few products in this category! Please check out products in other categories
                            below.
                        </p>
                        </div>
                    )}
                    <ProductList products={listProducts} loading={loadingProducts || attributeFetchingProduct} sortOption={sortOption} />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
