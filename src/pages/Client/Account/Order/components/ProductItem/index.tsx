import {IProduct} from "../../../../../../interfaces/IProduct.ts";
import "../../style.scss";
type Props = {
    product?: IProduct
}

const ItemProduct:React.FC<Props> = ({product}) => {
    console.log(product);
    return (
        <div className="opacity-80 bg-gray-50 hover:opacity-100 hover:bg-white h-[100%] py-4 flex items-center border-2 rounded-xl space-x-4 relative p-2">

            <div className="w-[100px] h-[100px]">
                <img src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ly61h6g68xpd3a_tn"/>
            </div>
            <div className="flex flex-col text-2xl space-y-4  max-w-[50%]">
                <div className="text-3xl truncate-100 ">Giày chunky  dey thời  trang INICHI G1112 da lì đế chunky thời trang Giày chunky  dey thời  trang INICHI G1112 da lì đế chunky thời trang</div>
                <div className="color-gray truncate-100 ">Biến thể: Giày chunky derby da cột dây </div>
                <div className="truncate-100 "><span className="color-gray">Số lượng:</span>x2</div>
            </div>
            <div className="absolute right-10 box-border">
                <div className="text-2xl flex items-center space-x-6">
                    <div className="line-through color-gray">2811111117.0</div>
                    <div>287111111.10</div>
                </div>
            </div>
        </div>
    );
};

export default ItemProduct;