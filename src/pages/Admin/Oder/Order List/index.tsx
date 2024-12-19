import { useEffect, useState } from 'react';
import { ConfigProvider, Input, Select } from 'antd';
import Heading from '../../components/Heading';
import { columns } from './datas';
import { API_ORDER, QUERY_KEY } from '../../../../hooks/useOrder';
import ModalOrder from './ModalOrder';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import TableAdmin from '../../components/Table';
import { statusArr } from '../../../../interfaces/IOrder';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import ButtonAdd from '../../components/Button/ButtonAdd';
import { FormattedMessage, useIntl } from 'react-intl';
import LoadingPage from '../../../../components/Loading/LoadingPage';

const { Option } = Select;

const OrderList = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const urlQuery = new URLSearchParams(useLocation().search);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState<any>([]);
    const [orderDetail, setOrderDetail] = useState<any>({
        isModalOpen: false,
        orderDetail: null,
    });

    const { data: orders,isFetching } = useQueryConfig([QUERY_KEY,'order-admin'], API_ORDER);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        if (value.trim() === '') {
            setFilteredData(orders?.data);
        } else {
            const filtered = orders?.data.filter((order: any) => {
                return (
                    order?.user?.name.toLowerCase().includes(value.toLowerCase()) ||
                    order.id.toString().includes(value.toLowerCase())
                );
            });
            setFilteredData(filtered);
        }
    };
    const handleSort = (value: number) => {
        if (value === 1) {
            setFilteredData((preData: any) => {
                const sortedDesc = preData
                    .slice()
                    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                return sortedDesc;
            });
        } else if (value === 2) {
            setFilteredData((preData: any) => {
                const sortedAsc = preData
                    .slice()
                    .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                return sortedAsc;
            });
        }
    };

    const searchStatus = urlQuery.get('status') || '';
    const onChangeStatus = (e: any) => {
        urlQuery.set('status', e);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };

    useEffect(() => {
        const originData = orders?.data ? JSON.parse(JSON.stringify([...orders.data])) : [];
        if (searchStatus !== '' && searchStatus !== 'all') {
            const filtered = originData.filter((order: any) => {
                return statusArr[order?.status] === searchStatus;
            });
            setFilteredData([...filtered]);
        } else {
            setFilteredData([...originData]);
        }
    }, [searchStatus, orders]);

    const handleRowClick = (record: any) => {
        setOrderDetail((preData: any) => ({ ...preData, isModalOpen: true, orderDetail: record }));
    };

    const handleCancel = () => {
        setOrderDetail((preData: any) => ({ ...preData, isModalOpen: false }));
    };
    if(isFetching){
        return <LoadingPage/>
    }
    return (
        <div>
            <Heading>
                <FormattedMessage id="admin.orderList" />
            </Heading>
            <div className="flex justify-between">
                <ButtonAdd title={<FormattedMessage id="admin.addOrder" />} to="/admin/orderadd" />
                <div className="flex justify-end items-center gap-x-5">
                    <div className="relative">
                        <Input
                            placeholder={intl.formatMessage({ id: 'order.Search_Order' })}
                            className={`w-[250px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            value={searchText}
                            onChange={handleSearch}
                        />
                        <Search className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global" />
                    </div>
                    <div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        multipleSelectorBgDisabled: '#fff',
                                        optionFontSize: 16,
                                    },
                                },
                            }}
                        >
                            <Select
                                className="font-medium"
                                style={{ width: 250, height: '52px' }}
                                placeholder={intl.formatMessage({ id: 'order.Please_select' })}
                                onChange={handleSort}
                            >
                                <Option value={1}>
                                    <FormattedMessage id="order.Sort_ascending_by_date" />
                                </Option>
                                <Option value={2}>
                                    <FormattedMessage id="order.Sort descending by date" />
                                </Option>
                            </Select>
                        </ConfigProvider>
                    </div>
                    <div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        multipleSelectorBgDisabled: '#fff',
                                        optionFontSize: 16,
                                    },
                                },
                            }}
                        >
                            <Select
                                className="font-medium"
                                defaultValue={searchStatus ? searchStatus : 'all'}
                                style={{ width: 250, height: '52px' }}
                                placeholder="Select a status"
                                onChange={onChangeStatus}
                            >
                                <Option value="all">
                                    <FormattedMessage id="body.category.All" />
                                </Option>
                                <Option value={statusArr[0]}>
                                    <FormattedMessage id="status.cancelled" />
                                </Option>
                                <Option value={statusArr[1]}>
                                    <FormattedMessage id="status.waiting_confirm" />
                                </Option>
                                <Option value={statusArr[2]}>
                                    <FormattedMessage id="status.confirmed" />
                                </Option>
                                <Option value={statusArr[3]}>
                                    <FormattedMessage id="status.delivering" />
                                </Option>
                                <Option value={statusArr[4]}>
                                    <FormattedMessage id="status.delivered" />
                                </Option>
                            </Select>
                        </ConfigProvider>
                    </div>
                </div>
            </div>

            {/* Bảng hiển thị đơn hàng */}
            <TableAdmin
                columns={columns}
                rowKey="id"
                dataSource={filteredData}
                onRow={(record: any) => ({
                    onClick: () => handleRowClick(record),
                })}
            />
            <ModalOrder orderDetail={orderDetail} handleCancel={handleCancel} />
        </div>
    );
};

export default OrderList;
