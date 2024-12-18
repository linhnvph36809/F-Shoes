import { ConfigProvider, Table } from 'antd';
import "./table.scss";

const TableAdmin = ({ columns, datas, ...props }: any) => {

    return (
        <ConfigProvider
            theme={{
                components: {
                    Table: {
                        headerColor: '#202224',
                        headerBorderRadius: 20,
                        fontSize: 14,
                        padding: 20
                    },
                },
            }}
        >
            <Table<any> columns={columns} dataSource={datas} className="mt-10 font-medium" {...props}></Table>
        </ConfigProvider>
    );
};

export default TableAdmin;
