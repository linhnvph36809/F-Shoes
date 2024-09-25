import { ConfigProvider, Form, Select, Table } from 'antd';
import InputPrimary from '../../../components/Input';
import Heading from '../components/Heading';
import ButtonPrimary from '../../../components/Button';
import { columns, data, DataType } from './datas';
import FormCategory from './components/Form';

const ListCategory = () => {
    return (
        <>
            <section>
                <Heading>List Category</Heading>
                <div>
                    <FormCategory />
                </div>
                <div>
                    <ConfigProvider
                        theme={{
                            components: {
                                Table: {
                                    cellFontSize: 18,
                                    headerBg: "#111111",
                                    headerColor: "#fff"
                                },

                            },
                        }}
                    >
                        <Table<DataType> columns={columns} dataSource={data} className='mt-10' />
                    </ConfigProvider>
                </div>
            </section>
        </>
    );
};

export default ListCategory;
