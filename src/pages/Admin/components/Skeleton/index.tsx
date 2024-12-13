import { Skeleton } from 'antd';

const SkeletonComponent = ({ className }: { className?: string }) => {
    return <Skeleton className={className} active />;
};

export default SkeletonComponent;
