import { ConfigProvider, Pagination } from 'antd';

const PaginationComponent = ({ page, totalItems, pageSize, handlePageChange, ...props }: any) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#11111',
                },
            }}
        >
            {' '}
            <Pagination
                {...props}
                align="end"
                current={page || (1 as any)}
                total={totalItems}
                pageSize={pageSize}
                onChange={handlePageChange}
            />
        </ConfigProvider>
    );
};

export default PaginationComponent;
