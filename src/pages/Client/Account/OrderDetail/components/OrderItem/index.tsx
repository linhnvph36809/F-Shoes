import {IProduct} from "../../../../../../interfaces/IProduct.ts";
import "../../../Order/style.scss";
import {IVariation} from "../../../../../../interfaces/IVariation.ts";
type Props = {
    product: IProduct,
    variation?:IVariation,
    quantity: number
}
import { formatPrice } from '../../../../../../utils';
import {Link} from "react-router-dom";
const OrderItem:React.FC<Props> = ({product,variation,quantity}) => {

    return (
        <Link to={`/detail/${product.slug}`} className="opacity-80 bg-gray-50 cursor-pointer hover:opacity-100 hover:bg-white h-[100%] py-4 flex items-center border-2 rounded-xl space-x-4 relative p-2">
            <div className="w-[100px] h-[100px] ">
                <img src={product.image_url} className="w-full h-full object-fit:cover"/>
            </div>
            <div className="flex flex-col text-2xl space-y-4  max-w-[50%]">
                <div className="text-3xl truncate-100 ">{variation ? variation.name : product.name}</div>
                {variation ? <div className="color-gray truncate-100 ">Classify: {variation.classify} </div> : ''}
                <div className="truncate-100 "><span className="color-gray">Quantity:</span>x{quantity}</div>
            </div>
            <div className="absolute right-10 box-border">
                {
                    variation ?
                        variation.sale_price ?
                            <div className="text-2xl flex items-center space-x-6">
                                <div className="line-through color-gray">{formatPrice(variation.price)}đ</div>
                                <div>{formatPrice(variation.sale_price)}đ</div>
                            </div> : <div className="text-2xl flex items-center space-x-6">
                                <div>{formatPrice(variation.price)}đ</div>
                            </div>
                        :
                        product.sale_price ? <div className="text-2xl flex items-center space-x-6">
                            <div className="line-through color-gray">{formatPrice(product.price)}đ</div>
                            <div>{formatPrice(product.sale_price)}đ</div>
                        </div> : <div className="text-2xl flex items-center space-x-6">
                            <div>{formatPrice(product.price)}đ</div>
                        </div>
                }
            </div>
        </Link>
    );
};

export default OrderItem;