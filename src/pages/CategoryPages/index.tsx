import { DownOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Menu, Row, Typography } from 'antd';
import { useState } from 'react';
import BoxProducts from './components/BoxProduct';
import BoxFilter from './components/Fiter';
import Heading from './components/Heading';

const { Title } = Typography;

const CategoryPage = () => {
    // Toggle visibility of the filter section
    const [filtersVisible, setFiltersVisible] = useState(true);

    const toggleFilters = () => {
        setFiltersVisible(!filtersVisible);
    };

    // Sorting options menu
    const sortMenu = (
        <Menu>
            <Menu.Item key="1">Price: Low to High</Menu.Item>
            <Menu.Item key="2">Price: High to Low</Menu.Item>
            <Menu.Item key="3">Newest</Menu.Item>
        </Menu>
    );

    return (
        <div className="container">
            {/* Page Heading */}
            <div
                className="sticky-heading"
                style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Heading title="New (500)" />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button icon={<FilterOutlined />} onClick={toggleFilters}>
                        {filtersVisible ? 'Hide Filters' : 'Show Filters'}
                    </Button>
                    <Dropdown overlay={sortMenu} trigger={['click']}>
                        <Button style={{ marginLeft: '8px' }}>
                            Sort By <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </div>

            <div style={{ display: 'flex' }}>
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
                        {[
                            'Shoes',
                            'Sports Bras',
                            'Tops & T-Shirts',
                            'Hoodies & Sweatshirts',
                            'Jackets',
                            'Trousers & Tights',
                            'Shorts',
                            'Jumpsuits & Rompers',
                            'Skirts & Dresses',
                            'Socks',
                            'Accessories & Equipment',
                        ].map((category, index) => (
                            <a
                                key={index}
                                href="#"
                                style={{
                                    display: 'block',
                                    fontSize: '16px',
                                    margin: '10px 0',
                                    fontWeight: 'bold',
                                }}
                            >
                                {category}
                            </a>
                        ))}
                        <div style={{ display: 'block', fontSize: '16px', marginRight: '20px' }}>
                            <BoxFilter />
                        </div>
                        <div style={{ display: 'block', fontSize: '16px', marginRight: '20px' }}>
                            <BoxFilter />
                        </div>
                    </div>
                )}

                {/* Right Content - Product Boxes */}
                <div style={{ flex: 1, width: '1092px' }}>
                    <Row gutter={[16, 16]}>
                        {Array(100)
                            .fill(0)
                            .map((_, index) => (
                                <Col span={8} key={index}>
                                    <BoxProducts
                                        imageUrl="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7d93a817-f6c4-4df1-b596-f0498c3d24e8/NIKE+CORTEZ+TXT.png"
                                        category="Just In"
                                        productName="Nike Dunk Low Premium"
                                        shoeType="Women's Shoes"
                                        colorCount={1}
                                        price="3,898,000"
                                    />
                                </Col>
                            ))}
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
