import { ConfigProvider, Table } from 'antd';

const TableAdmin = ({ columns, datas, ...props }: any) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        cellFontSize: 18,
                        headerBg: '#111111',
                        headerColor: '#fff',
                    },
                },
            }}
        >
            <Table<any> columns={columns} dataSource={datas} className="mt-10"  {...props}>
            </Table>
        </ConfigProvider>
    );
};

export default TableAdmin;
