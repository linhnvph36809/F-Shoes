import { Button, Dropdown, Menu } from 'antd';
import {useEffect, useState} from 'react';
import { DownOutlined, FilterOutlined } from '@ant-design/icons';

import BoxFilter from './components/Fiter';
import Heading from './components/Heading';
import useProduct from '../../../hooks/useProduct';
import ProductList from './Productslist';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {IProduct} from "../../../interfaces/IProduct.ts";
import FilterByCategory from "./components/Fiter/FilterByCategory.tsx";
import {tokenManagerInstance} from "../../../api";
import {ICategory} from "../../../interfaces/ICategory.ts";
import useCategory from "../../../hooks/useCategory.tsx";

const sortKeysArray = [
    {
        key: "lowToHigh",
        name: "Low To High",
    },
    {
        key: "highToLow",
        name: "High To Low ",
    },
    {
        key: "newest",
        name: "Newest",
    }
];

const CategoryPage = () => {
    const [filtersVisible, setFiltersVisible] = useState(true);

    const { products: rawProducts, loading: loadingProducts } = useProduct();
    const { slug } = useParams();
    const [searchParams] = useSearchParams();
    const sortOption = searchParams.get("sort");
    let listProducts:IProduct[]|[] = rawProducts;

    const {categories } = useCategory();


    const listCategories:ICategory[]|[] = categories;
    const [productsByCategory, setProductsByCategory] = useState<IProduct[] | []>([]);

    let id = '';
    if (slug !== undefined){
        const index = slug.lastIndexOf('.');
        id = slug.substring(index + 1);
    }
    useEffect(() => {
        const getProductByCategoryById = async (id: number | string) => {
            try {
                const { data } = await tokenManagerInstance('get', `api/products/category/${id}`);
                setProductsByCategory(data.products);
                console.log(data.products);
            } catch (error) {
                console.log(error);
                return [];

            }
        };
        getProductByCategoryById(id);
    }, [id]);
    if(productsByCategory && productsByCategory.length > 0){
        listProducts = productsByCategory;
    }
    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };



    const sortMenu = (
        <Menu>
            {
                sortKeysArray.map((item,index) => (
                    <Menu.Item key={index} >
                        <Link to={`?sort=${item.key}`}> Price: {item.name}</Link>
                    </Menu.Item>
                ))
            }


        </Menu>
    );




    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-5">
                <Heading title="New" />
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

                        <FilterByCategory categories={listCategories}/>
                        <div className="mt-4">
                            {/*<BoxFilter />*/}
                        </div>
                    </div>
                )}

                {/* Right Content - Product List */}
                <div className="flex-1">
                    {
                        (slug && productsByCategory.length === 0) &&
                        <p className="text-center text-xl my-4 font-bold text-gray-400">There are too few products in this
                            category! Please check out products in other categories below.</p>
                    }
                    <ProductList products={listProducts} loading={loadingProducts} sortOption={sortOption}/>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
