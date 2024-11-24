import { Col, Row, Skeleton } from 'antd';
import BoxProducts from '../components/BoxProduct';
import { IProduct } from '../../../../interfaces/IProduct';
import {Link} from "react-router-dom";


interface ProductListProps {
    products: IProduct[]|[];
    loading: boolean;
    sortOption: string|null;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading, sortOption }) => {
    const sortedProducts = [...products].sort((a: any, b: any) => {
        if (sortOption === 'lowToHigh') return a.price - b.price;
        if (sortOption === 'highToLow') return b.price - a.price;
        if(sortOption === 'bestSelling') return a.qty_sold - b.qty_sold;
        if (sortOption === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

        return 0;
    });

    return (
        <Row gutter={[16, 16]}>
            {loading ? (
                <Skeleton className='h-screen w-full' />
            ) : (
                sortedProducts.map((product) => (
                    <Col span={8} key={product.id}>
                        <Link to={`/detail/${product.slug}`}>
                            <BoxProducts
                                imageUrl={product.image_url || 'default-image-url.png'}
                                categories={product.categories || 'Default Category'}
                                productName={product.name}
                                price={product.price}
                                price_sale={product.sale_price}
                            />
                        </Link>
                    </Col>
                ))
            )}
        </Row>
    );
};
export default ProductList;
