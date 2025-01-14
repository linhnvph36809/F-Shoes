import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ConfigProvider, Input, Select, Skeleton } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { PanelsLeftBottom, Search } from 'lucide-react';

import Heading from '../../components/Heading';
import { columns } from './datas';
import { API_ORDER, QUERY_KEY, QUERY_KEY_STATISTICS } from '../../../../hooks/useOrder';
import ModalOrder from './ModalOrder';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import TableAdmin from '../../components/Table';
import { statusArr, statusToNumber } from '../../../../interfaces/IOrder';
import ButtonAdd from '../../components/Button/ButtonAdd';
import PermissionElement from '../../../../components/Permissions/PermissionElement';
import { ACTIONS, PERMISSION } from '../../../../constants';
import PaginationComponent from '../../../../components/Pagination';
import StatusItem from './components/StatusItem';

const { Option } = Select;

const OrderList = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const location = useLocation();
    const urlQuery = new URLSearchParams(location.search);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState<any>([]);
    const [orderDetail, setOrderDetail] = useState<any>({
        isModalOpen: false,
        orderDetail: null,
    });
    const searchKey = urlQuery.get('search') || '';
    const page = urlQuery.get('page') || 1;
    const status = urlQuery.get('status') || '';

    const { data: orders, isLoading } = useQueryConfig(
        [QUERY_KEY, `order-admin-${page}-search=${searchKey}-status=${status}`],
        `${API_ORDER}?page=${page}&per_page=5&search=${searchKey}${
            status && status !== '' ? '&status=' + statusToNumber(status) : ''
        }`,
    );
    const { data } = useQueryConfig([QUERY_KEY_STATISTICS, 'statistics-order'], 'api/admin/statistics/order');
    const [statusActive, setStatusActive] = useState<number>(12);

    const totalItems = orders?.data?.paginator.total_item || 0;
    const pageSize = orders?.data?.paginator.per_page || 10;
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
    };
    const submitSearch = () => {
        urlQuery.set('search', searchText);
        urlQuery.delete('status');
        urlQuery.delete('page');
        navigate(`?${urlQuery.toString()}`, { replace: true });
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
    const handlePageChange = (page: number) => {
        urlQuery.set('page', `${page}`);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };

    const searchStatus = urlQuery.get('status') || '';
    const onChangeStatus = (e: any, status: number) => {
        navigate(`?status=${e}`, { replace: true });
        setStatusActive(status);
    };
    const onUndoFilter = () => {
        const currentPath = location.pathname;
        navigate(`${currentPath}`, { replace: true });
        setStatusActive(12);
    };
    useEffect(() => {
        switch (status.toLocaleLowerCase()) {
            case 'cancelled':
                setStatusActive(0);
                break;
            case 'waiting_payment':
                setStatusActive(1);
                break;
            case 'waiting_confirm':
                setStatusActive(2);
                break;
            case 'confirmed':
                setStatusActive(3);
                break;
            case 'delivering':
                setStatusActive(4);
                break;
            case 'delivered':
                setStatusActive(5);
                break;
            case 'waiting_accept_return':
                setStatusActive(6);
                break;
            case 'return_processing':
                setStatusActive(7);
                break;
            case 'denied_return':
                setStatusActive(8);
                break;
            case 'returned':
                setStatusActive(9);
                break;
            default:
                setStatusActive(12);
                break;
        }
    }, [status]);
    useEffect(() => {
        const originData = orders?.data?.data ? JSON.parse(JSON.stringify([...orders.data.data])) : [];
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

    const statisticsOrder = data?.data;

    return (
        <div>
            <Heading>
                <FormattedMessage id="admin.orderList" />
            </Heading>
            <div className="grid grid-cols-11 gap-x-5 mb-12">
                <div
                    onClick={onUndoFilter}
                    className={`flex items-center justify-center bg-primary  ${
                        statusActive === 12 ? 'border-2 border-gray-500' : 'opacity-40'
                    } text-center rounded-[12px] gap-x-3 p-3 text-white font-medium text-[16px]
                    hover:cursor-pointer transition-global hover:opacity-60 relative`}
                >
                    <div>
                        <div className="flex justify-center">
                            <PanelsLeftBottom className="w-[25px]" />
                        </div>
                        <div>
                            {statisticsOrder?.total_order} <FormattedMessage id="all_order" />
                        </div>
                    </div>
                </div>
                <StatusItem
                    bgColor="bg-red-500"
                    quantity={statisticsOrder?.total_order_cancelled}
                    status={0}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
                <StatusItem
                    bgColor="bg-gray-500"
                    quantity={statisticsOrder?.total_order_waiting_payment}
                    status={1}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
                <StatusItem
                    bgColor="bg-yellow-500"
                    quantity={statisticsOrder?.total_order_waiting_confirm}
                    status={2}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
                <StatusItem
                    bgColor="bg-orange-500"
                    quantity={statisticsOrder?.total_order_confirmed}
                    status={3}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
                <StatusItem
                    bgColor="bg-blue-500"
                    quantity={statisticsOrder?.total_order_delivering}
                    status={4}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
                <StatusItem
                    bgColor="bg-[#00f227]"
                    quantity={statisticsOrder?.total_order_delivered}
                    status={5}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
                <StatusItem
                    bgColor="bg-[#294781]"
                    quantity={statisticsOrder?.total_order_waiting_accept_return}
                    status={6}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
                <StatusItem
                    bgColor="bg-[#d67309]"
                    quantity={statisticsOrder?.total_order_return_processing}
                    status={7}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
                <StatusItem
                    bgColor="bg-[#741111]"
                    quantity={statisticsOrder?.total_order_denied_return}
                    status={8}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
                <StatusItem
                    bgColor="bg-[#125070]"
                    quantity={statisticsOrder?.total_order_returned}
                    status={9}
                    onChangeStatus={onChangeStatus}
                    statusActive={statusActive}
                />
            </div>
            <div className="flex justify-between">
                <PermissionElement keyName={PERMISSION.PERMISSION_ORDER} action={ACTIONS.ACTIONS_ADD}>
                    <ButtonAdd title={<FormattedMessage id="admin.addOrder" />} to="/admin/orderadd" />
                </PermissionElement>

                <div className="flex justify-end items-center gap-x-5">
                    <div className="relative">
                        <Input
                            placeholder={intl.formatMessage({ id: 'order.Search_Order' })}
                            className={`w-[300px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            value={searchText}
                            onChange={handleSearch}
                        />
                        <Search
                            onClick={submitSearch}
                            className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global"
                        />
                    </div>
                    <div>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Select: {
                                        multipleSelectorBgDisabled: '#fff',
                                        optionFontSize: 16,
                                        borderRadius: 10,
                                    },
                                },
                            }}
                        >
                            <Select
                                className="font-medium select-sort-order"
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
                </div>
            </div>

            {/* Bảng hiển thị đơn hàng */}
            {isLoading ? (
                <Skeleton className="mt-10" />
            ) : (
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                rowHoverBg: '#e2e0e0',
                            },
                        },
                    }}
                >
                    <TableAdmin
                        className="table-order-admin my-10"
                        columns={columns}
                        rowKey="id"
                        dataSource={filteredData}
                        onRow={(record: any) => ({
                            onClick: () => handleRowClick(record),
                        })}
                        pagination={false}
                    />
                </ConfigProvider>
            )}
            <PaginationComponent
                className="mt-4"
                page={page}
                pageSize={pageSize}
                totalItems={totalItems}
                handlePageChange={handlePageChange}
            />

            <ModalOrder orderDetail={orderDetail} handleCancel={handleCancel} />
        </div>
    );
};

export default OrderList;
