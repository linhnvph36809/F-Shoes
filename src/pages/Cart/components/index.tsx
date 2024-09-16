// CartItem.js
import { Button, Select } from 'antd';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';

const { Option } = Select;

const CartItem = ({ product }: any) => {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center border-b pb-4 mb-4 max-w-[733px]">
            <img src={product.image} alt="Product" className="w-60 h-60 object-cover mb-4 lg:mb-0 lg:mr-4" />
            <div className="flex-grow mb-4 lg:mb-0">
                {/* Wrap the name and price in a flex container */}
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-[15px] font-semibold">{product.name}</h3>
                    <div className="text-[15px] font-bold">{product.price}</div>
                </div>
                <p className="color-gray text-[15px]">{product.description}</p>
                <p className="color-gray text-[15px]">{product.color}</p>
                <div className="flex items-center space-x-4 mt-2 text-[15px] color-gray">
                    <div>
                        Size: <span className="">{product.size}</span>
                    </div>
                    <div>
                        Quantity:
                        <Select defaultValue={product.quantity} className="ml-2 text-gray-600">
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                    <Button icon={<HeartOutlined />} />
                    <Button icon={<DeleteOutlined />} />
                </div>
            </div>
        </div>
    );
};

export default CartItem;
