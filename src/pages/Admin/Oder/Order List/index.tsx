import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Input, Select, Skeleton } from 'antd';
import Heading from '../../components/Heading';
import { columns } from './datas';
import { API_ORDER, QUERY_KEY } from '../../../../hooks/useOrder';
import ModalOrder from './ModalOrder';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import TableAdmin from '../../components/Table';
import { statusArr, statusToNumber } from '../../../../interfaces/IOrder';
import { useLocation, useNavigate } from 'react-router-dom';
import { RotateCcw, Search } from 'lucide-react';
import ButtonAdd from '../../components/Button/ButtonAdd';
import { FormattedMessage, useIntl } from 'react-intl';
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
        `${API_ORDER}?page=${page}&search=${searchKey}${status && status !== '' ? '&status=' + statusToNumber(status) : ''}`,
    );

    const totalItems = orders?.data?.paginator.total_item || 0;
    const pageSize = orders?.data?.paginator.per_page || 10;
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
    };
    const submitSearch = () => {
        urlQuery.set('search', searchText);
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
    const onChangeStatus = (e: any) => {
        navigate(`?status=${e}`, { replace: true });
    };
    const onUndoFilter = () => {
        const currentPath = location.pathname;
        navigate(`${currentPath}`, { replace: true });
    }
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

    return (
        <div>
            <Heading>
                <FormattedMessage id="admin.orderList" />
            </Heading>
            <div className="grid grid-cols-10 gap-x-5 mb-12">
                <StatusItem bgColor="bg-red-500" status={0} onChangeStatus={onChangeStatus} />
                <StatusItem bgColor="bg-gray-500" status={1} onChangeStatus={onChangeStatus} />
                <StatusItem bgColor="bg-yellow-500" status={2} onChangeStatus={onChangeStatus} />
                <StatusItem bgColor="bg-orange-500" status={3} onChangeStatus={onChangeStatus} />
                <StatusItem bgColor="bg-blue-500" status={4} onChangeStatus={onChangeStatus} />
                <StatusItem bgColor="bg-[#00f227]" status={5} onChangeStatus={onChangeStatus} />
                <StatusItem bgColor="bg-[#294781]" status={6} onChangeStatus={onChangeStatus} />
                <StatusItem bgColor="bg-[#d67309]" status={7} onChangeStatus={onChangeStatus} />
                <StatusItem bgColor="bg-[#741111]" status={8} onChangeStatus={onChangeStatus} />
                <StatusItem bgColor="bg-[#125070]" status={9} onChangeStatus={onChangeStatus} />
            </div>
            <div className="flex justify-between">
                <PermissionElement keyName={PERMISSION.PERMISSION_ORDER} action={ACTIONS.ACTIONS_ADD}>
                    <ButtonAdd title={<FormattedMessage id="admin.addOrder" />} to="/admin/orderadd" />
                </PermissionElement>

                <div className="flex justify-end items-center gap-x-5">
                    <div className="flex items-center justify-center ">
                        <button onClick={onUndoFilter} className='border hover:bg-slate-200 rounded-lg flex items-center justify-center w-[40px] h-[40px]'>
                            <RotateCcw />
                        </button>
                    </div>
                    <div className="relative">

                        <Input
                            placeholder={intl.formatMessage({ id: 'order.Search_Order' })}
                            className={`w-[250px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
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
