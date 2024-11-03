import { Button, Dropdown, Menu } from 'antd';
import { useState } from 'react';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';

import BoxFilter from './components/Fiter';
import Heading from './components/Heading';
import useProduct from '../../../hooks/useProduct';
import ProductList from './Productslist';
import ProductFilter from './ProductsFilters';
import { useParams } from 'react-router-dom';

type SortOption = 'lowToHigh' | 'highToLow' | 'newest';

const CategoryPage = () => {
    const [filtersVisible, setFiltersVisible] = useState(true);
    const [filters, setFilters] = useState([]);
    const [sortOption, setSortOption] = useState<SortOption | null>(null);
    // const { categories, getAllCategory } = useCategory();
    const { products: rawProducts, loading: loadingProducts } = useProduct();
    const { slug } = useParams();
    if (slug) console.log(slug, 'slug');
    else console.log(1, 'k co slug');
    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    const applySorting = (option: SortOption) => {
        setSortOption(option);
    };

    const sortMenu = (
        <Menu>
            <Menu.Item key="1" onClick={() => applySorting('lowToHigh')}>
                Price: Low to High
            </Menu.Item>
            <Menu.Item key="2" onClick={() => applySorting('highToLow')}>
                Price: High to Low
            </Menu.Item>
            <Menu.Item key="3" onClick={() => applySorting('newest')}>
                Newest
            </Menu.Item>
        </Menu>
    );
    // useEffect(() => {
    //     getAllCategory();
    // }, []);

    const handlerFilterChange = (newFilters: any) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
        }));
    };

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-5">
                <Heading title="New (500)" />
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
                        <ProductFilter filters={filters} onChange={handlerFilterChange} />

                        <div className="mt-4">
                            <BoxFilter />
                        </div>
                    </div>
                )}

                {/* Right Content - Product List */}
                <div className="flex-1">
                    <ProductList products={rawProducts} loading={loadingProducts} sortOption={sortOption} />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
