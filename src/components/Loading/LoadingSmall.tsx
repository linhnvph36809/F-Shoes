import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSmall = ({ color = "text-white" }: { color?: string }) => {
    return (
        <Spin indicator={<LoadingOutlined spin className={color} />} size="default" />
    )
}

export default LoadingSmall