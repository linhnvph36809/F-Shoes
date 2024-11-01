import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingPage = () => {
    return (
        <div className="fixed inset-0 bg-[#ffffffe3] flex justify-center items-center transition-global">
            <Spin indicator={<LoadingOutlined spin className="text-black" />} size="large" />
        </div>
    );
};

export default LoadingPage;
