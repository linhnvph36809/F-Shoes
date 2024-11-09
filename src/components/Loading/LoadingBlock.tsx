import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingBlock = () => {
    return (
        <div className="absolute top-0 left-0 right-0 h-[100vh] bg-[#ffffffe3] flex justify-center items-center transition-global">
            <Spin indicator={<LoadingOutlined spin className="text-black" />} size="large" />
        </div>
    );
};

export default LoadingBlock;
