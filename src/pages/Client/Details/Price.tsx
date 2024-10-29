import {formatPrice} from "../../../utils";

interface Price {
    price: number,
    sale_price: number
}
export default function Price({product, variation}: {product: Price, variation: Price|undefined}) {

    if(variation){
        return (
            variation?.sale_price && variation?.sale_price != variation?.price ? (<div className="flex items-center space-x-4 my-10">
                <h3 className="color-primary font-medium text-20px  ">
                    {formatPrice(variation?.sale_price)} ₫
                </h3>
                <h3 className="color-primary font-thin text-16px "><p
                    className="m-0 p-0 inline line-through text-gray-400">{formatPrice(variation?.price)} ₫</p>
                </h3>
            </div>) : (<h3 className="color-primary font-medium text-20px my-10 ">{formatPrice(variation?.price)} ₫</h3>)
        )
    }else{
        return (
            product?.sale_price && product?.sale_price != product?.price ? (<div className="flex items-center space-x-4 my-10">
                <h3 className="color-primary font-medium text-20px  ">
                    {formatPrice(product?.sale_price)} ₫
                </h3>
                <h3 className="color-primary font-thin text-16px "><p
                    className="m-0 p-0 inline line-through text-gray-400">{formatPrice(product?.price)} ₫</p>
                </h3>
            </div>) : (<h3 className="color-primary font-medium text-20px my-10 ">{formatPrice(product?.price)} ₫</h3>)
        )
    }


}