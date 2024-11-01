import { Col, Row } from 'antd';
import SkeletonComponent from '../../../Admin/components/Skeleton';
import BoxProducts from '../components/BoxProduct';
import { IProduct } from '../../../../interfaces/IProduct';

interface ProductListProps {
    products: IProduct[];
    loading: boolean;
    sortOption: 'lowToHigh' | 'highToLow' | 'newest' | null;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading, sortOption }) => {
    const sortedProducts = [...products].sort((a: any, b: any) => {
        if (sortOption === 'lowToHigh') return a.price - b.price;
        if (sortOption === 'highToLow') return b.price - a.price;
        if (sortOption === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return 0;
    });

    return (
        <Row gutter={[16, 16]}>
            {loading ? (
                <SkeletonComponent />
            ) : (
                sortedProducts.map((product) => (
                    <Col span={8} key={product.id}>
                        <BoxProducts
                            imageUrl={product.image_url || 'default-image-url.png'}
                            categories={product.categories || 'Default Category'}
                            productName={product.name}
                            price={product.price}
                            price_sale={product.sale_price}
                        />
                    </Col>
                ))
            )}
        </Row>
    );
};
export default ProductList;
