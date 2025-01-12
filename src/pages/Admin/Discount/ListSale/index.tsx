import { useEffect, useState } from 'react';
import { Table, Button, Radio, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Heading from '../../components/Heading';

import { ISale } from '../../../../interfaces/ISale.ts';
import { formatTime, handleChangeMessage } from '../../../../utils';

import { QUERY_KEY } from '../../../../hooks/useSale.tsx';
import { FormattedMessage, useIntl } from 'react-intl';
import { useContextGlobal } from '../../../../contexts/index.tsx';
import useQueryConfig from '../../../../hooks/useQueryConfig.tsx';
import InputSearch from '../../components/Forms/InputSearch.tsx';
import PaginationComponent from '../../../../components/Pagination/index.tsx';
import LoadingPage from '../../../../components/Loading/LoadingPage.tsx';
import { CircleX } from 'lucide-react';

const ListSale = () => {
    const { locale } = useContextGlobal();
    const intl = useIntl();
    const navigate = useNavigate();
    const urlQuery = new URLSearchParams(useLocation().search);
    const keySearch = urlQuery.get('search') || '';
    const keyStatus = urlQuery.get('status') || 'all';
    const page = urlQuery.get('page') || 1;
    const { data: dataCachingSale,isLoading } = useQueryConfig(
        [QUERY_KEY, `list/sales?page=${page}&search=${keySearch}&status=${keyStatus}`],
        `api/sale?paginate=true&per_page=10&page=${page}&search=${keySearch}&status=${keyStatus}`,
    );
    const [data, setData] = useState<ISale[]>([]);

    useEffect(() => {
        if (dataCachingSale?.data?.data?.data) {
            setData(dataCachingSale?.data?.data?.data);
        }
    }, [dataCachingSale]);
    // Search

    const totalItems = dataCachingSale?.data?.data?.paginator?.total_item || 0;
    const pageSize = dataCachingSale?.data?.data?.paginator?.per_page || 10;
  
    
    const handleSearch = (searchValue: string) => {
        urlQuery.set('search', searchValue);
        urlQuery.delete('page');
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };
    const handlePageChange = (page: number) => {
        urlQuery.set('page', `${page}`);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };
    const handleStatusChange = (e: any) => {
        
        urlQuery.set('status', e.target.value);
        urlQuery.delete('page');
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };

    const columns = [
        {
            title: <FormattedMessage id="admin.id" />,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: <FormattedMessage id="admin.name" />,
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (
                <span className={text ? 'text-gray-500' : 'text-amber-500'}>
                    {text ? text : 'This sale name is empty'}
                </span>
            ),
        },
        {
            title: <FormattedMessage id="admin.type" />,
            dataIndex: 'type',
            key: 'type',
            render: (type: string) =>
                type === 'percent' ? (
                    <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color="blue">
                        {handleChangeMessage(locale, 'Percent', 'Phần trăm')}
                    </Tag>
                ) : (
                    <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color="red">
                        {handleChangeMessage(locale, 'Fixed', 'Cố định')}
                    </Tag>
                ),
        },
        {
            title: <FormattedMessage id="admin.value" />,
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: <FormattedMessage id="admin.startDate" />,
            dataIndex: 'start_date',
            key: 'start_date',
            render: (start_date: string) => <>{formatTime(start_date)}</>,
        },
        {
            title: <FormattedMessage id="admin.endDate" />,
            dataIndex: 'end_date',
            key: 'end_date',
            render: (end_date: string) => <>{formatTime(end_date)}</>,
        },
        {
            title: <FormattedMessage id="status" />,
            dataIndex: 'status',
            key: 'status',
            render: (_: any, record: ISale) => {
                const start_date = new Date(record.start_date);
                const end_date = new Date(record.end_date);
                const now = new Date();
                if (start_date < now && end_date < now) {
                    return (
                        <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color="red">
                            <FormattedMessage id="sale.status.ended" />
                        </Tag>
                    );
                } else if (start_date < now && end_date > now) {
                    return (
                        <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color="green">
                            <FormattedMessage id="sale.status.ongoing" />
                        </Tag>
                    );
                } else if (start_date > now) {
                    return (
                        <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color="gold">
                            <FormattedMessage id="sale.status.upcoming" />
                        </Tag>
                    );
                }
            },
        },
        {
            title: <FormattedMessage id="admin.active" />,
            key: 'is_active',
            dataIndex: 'is_active',
            render: (is_active: boolean) => {
                return is_active ? (
                    <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color="geekblue">
                        <FormattedMessage id="sale.active" />
                    </Tag>
                ) : (
                    <Tag className="p-3 rounded-[30px] w-[90%] flex items-center justify-center" color="red">
                        <FormattedMessage id="sale.inactive" />
                    </Tag>
                );
            },
        },
        {
            title: <FormattedMessage id="category.table.action" />,
            key: 'actions',
            render: (_: any, record: ISale) => {
                return (
                    <div className="flex gap-2 items-center justify-center">
                        <Button
                            onClick={() => navigate(`/admin/sale/update/${record.id}`)}
                            style={{ color: 'black' }}
                            icon={<EditOutlined />}
                        />
                    </div>
                );
            },
        },
    ];
    if(isLoading){
        return <LoadingPage/>
    }
    return (
        <div>
            <Heading>
                <FormattedMessage id="admin.listSale" />
            </Heading>
            <div
                style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <InputSearch
                    style={{ width: 300 }}
                    placeholder={intl.formatMessage({ id: 'Search_for' })}
                    onSearch={handleSearch}
                />
                <Link to="/admin/listsale" className='border rounded-md hover:bg-slate-200'><CircleX /></Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 10 }}>
                        <FormattedMessage id="status" />:
                    </span>
                    <Radio.Group value={keyStatus} onChange={handleStatusChange} style={{ marginRight: '10px' }}>
                        <Radio value="all">
                            <FormattedMessage id="body.category.All" />
                        </Radio>
                        <Radio value="upcoming">
                            <FormattedMessage id="status.upcoming" />
                        </Radio>
                        <Radio value="active">
                            <FormattedMessage id="status.active" />
                        </Radio>
                        <Radio value="expired">
                            <FormattedMessage id="status.expired" />
                        </Radio>
                    </Radio.Group>
                    <Button type="primary" style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}>
                        <Link
                            to="/admin/addsale"
                            style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}
                        >
                            <FormattedMessage id="button.addDiscount" />
                        </Link>
                    </Button>
                </div>
            </div>
            <Table dataSource={data} columns={columns} pagination={false} />
            <div className="mt-8">
                <PaginationComponent
                    page={page || (1 as any)}
                    totalItems={totalItems}
                    pageSize={pageSize}
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default ListSale;
