import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSmall = () => {
    return (
        <Spin indicator={<LoadingOutlined spin className="text-white" />} size="default" />
    )
}

export default LoadingSmall