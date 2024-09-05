import React from 'react';

const BoxProducts = ({
    category,
    path,
    imageUrl,
    productName,
    shoeType,
    colorCount,
    price,
}: {
    category: string;
    path?: string;
    imageUrl: string;
    productName: string;
    shoeType: string;
    colorCount: number;
    price: string;
}) => {
    return (
        <div className="product-box  ">
            <div className="text-center mb-4">
                <img src={imageUrl} alt={productName} className="w-full h-auto object-cover rounded-md mx-auto" />
            </div>
            <div className="text-left">
                <p className="text-[18px] color-brown font-medium">{category}</p>
                <p className="text-[18px] color-primary font-medium mb-2">{productName}</p>
                <p className="text-[18px] color-gray font-medium mb-2">{shoeType}</p>
                <p className="text-[18px] color-gray font-medium mb-2">{colorCount} Colors</p>
                <p className="text-[18px] color-primary font-bold mb-4">{price} đ</p>
            </div>
            {/* <a
                href={path}
                className="block px-8 py-2 bg-primary text-white font-medium text-[15px] rounded-[30px] hover:opacity-60 mt-4"
            >
                Shop Now
            </a> */}
        </div>
    );
};

export default BoxProducts;
