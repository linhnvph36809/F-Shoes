import { ICategory } from '../../../../../interfaces/ICategory';

const BoxProducts = ({
    categories,
    imageUrl,
    productName,
    price,
    price_sale,
}: {
    categories: any;
    imageUrl: string;
    productName: string;
    price: number;
    price_sale: number;
}) => {
    return (
        <div className="product-box">
            <div className="text-center mb-4">
                <img src={imageUrl} alt={productName} className="w-full h-[390px] object-cover rounded-md mx-auto" />
            </div>
            <div className="text-left">
                <p className="text-[18px] color-brown font-medium">{productName}</p>
                <p className="text-[18px] color-gray font-medium mb-2">
                    {categories.map((category: ICategory) => category.name).join(', ')}
                </p>
                <div className="mb-4">
                    {price_sale ? (
                        <>
                            <span className="text-[18px] color-primary font-medium mr-2">{price_sale}đ</span>
                            <span className="text-[14px] color-gray font-medium line-through mr-2">{price}đ</span>
                        </>
                    ) : (
                        <span className="text-[18px] color-primary font">{price} đ</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BoxProducts;
