import { ConfigProvider, Table } from 'antd';

const TableAdmin = ({ columns, datas, ...props }: any) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                    },
                },
            }}
        >
            <Table<any> columns={columns} dataSource={datas} className="mt-10" {...props}></Table>
        </ConfigProvider>
    );
};

export default TableAdmin;
