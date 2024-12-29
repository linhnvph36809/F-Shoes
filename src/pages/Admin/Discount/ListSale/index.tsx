import { useEffect, useState } from 'react';
import { Table, Button, Input, Radio, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Heading from '../../components/Heading';

import { ISale } from '../../../../interfaces/ISale.ts';
import { formatTime, handleChangeMessage } from '../../../../utils';


import { showMessageActive, showMessageClient } from '../../../../utils/messages.ts';
import LoadingSmall from '../../../../components/Loading/LoadingSmall.tsx';
import { tokenManagerInstance } from '../../../../api/index.tsx';
import { API_SALE, QUERY_KEY } from '../../../../hooks/useSale.tsx';
import { FormattedMessage, useIntl } from 'react-intl';
import { useContextGlobal } from '../../../../contexts/index.tsx';
import useQueryConfig from '../../../../hooks/useQueryConfig.tsx';

const ListSale = () => {
    const {  locale } = useContextGlobal();
    const intl = useIntl();
    const navigate = useNavigate();
    const urlQuery = new URLSearchParams(useLocation().search);
    const {data:dataCachingSale, refetch} = useQueryConfig(
        [QUERY_KEY,'list/sales'],
        'api/sale'
    );
  
    
    const [data, setData] = useState<ISale[]>([]);
    const [loadingDeleteSale, setLoadingDeleteSale] = useState<boolean>(false);
    const [deletedSaleID, setDeletedSaleID] = useState<number | string>(0);
    const keySearch = urlQuery.get('search');
    const keyStatus = urlQuery.get('status') || 'all';
    const [dataSearch, setDataSearch] = useState<ISale[]>([]);
    useEffect(() => {
        if(dataCachingSale?.data?.data?.data){
            setData(dataCachingSale?.data?.data?.data);
            
        }
    },[dataCachingSale]);
    useEffect(() => {
     

        const deleteSale = async (id: string | number) => {
            try {
                setLoadingDeleteSale(true);
               
                const { data:dataReturn } = await tokenManagerInstance('delete', `${API_SALE}/${id}`);
                if(dataReturn?.status){
                    
                setData([...data.filter((sale:any) => sale.id !== id)]);
                    refetch();
                    showMessageClient(handleChangeMessage(locale, 'Sale deleted successfully!','Xóa giảm giá thành công'),'', 'success');
                }
               
            } catch (error) {
                if ((error as any)?.response?.data?.message) {
                    showMessageClient('Error', (error as any)?.response?.data?.message, 'error');
                    return;
                }
                showMessageClient(
                    handleChangeMessage(
                        locale,
                        'Something went wrong!',
                        'Đã có lỗi gì đó xảy ra.Vui lòng thử lại sau!',
                    ),
                    '',
                    'error',
                );
            } finally {
                setLoadingDeleteSale(false);
            }
        };
        if (deletedSaleID !== 0) {
            deleteSale(deletedSaleID);
        }
    }, [deletedSaleID]);

    useEffect(() => {
        if (!loadingDeleteSale) {
            setDeletedSaleID(0);
        }
    }, [loadingDeleteSale]);
    useEffect(() => {
        const statusData = data.filter((item: ISale) => {
            const start_date = new Date(item.start_date);
            const end_date = new Date(item.end_date);
            const now = new Date();
            if (!keyStatus || keyStatus === 'all') {
                return true;
            } else if (keyStatus === 'upcoming') {
                return start_date > now;
            } else if (keyStatus === 'active') {
                return start_date < now && end_date > now;
            } else if (keyStatus === 'expired') {
                if (start_date < now && end_date < now) {
                    return true;
                }
                return false;
            } else {
                return true;
            }
        });
        if (keySearch && keySearch.length > 0) {
            setDataSearch(
                statusData.filter((item: ISale) => {
                    if (item.name) {
                        return (
                            item.name.toLowerCase().includes(keySearch.toLowerCase()) ||
                            item.id.toString().includes(keySearch.toLowerCase())
                        );
                    }
                    return item.id.toString().includes(keySearch.toLowerCase());
                }),
            );
        } else {
            setDataSearch([...statusData]);
        }
    }, [keySearch, keyStatus, data]);
    const handleDelete = async (id: string | number) => {
        await showMessageActive(handleChangeMessage(locale, 'Are you sure you want to delete?','Bạn có chắc chắn muốn xóa không?'),'', 'warning', () => {
            setDeletedSaleID(id);
        });
    };

    // Search
    const searchSale = (e: any) => {
        urlQuery.set('search', e.target.value);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };
    const handleStatusChange = (e: any) => {
        urlQuery.set('status', e.target.value);
        navigate(`?${urlQuery.toString()}`, { replace: true });
    };
    const dataSource = [...dataSearch];
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
            render: (type: string) => (
                <Tag
                    className="p-3 rounded-[30px] w-[90%] flex items-center justify-center"
                    color={type === 'percent' ? 'blue' : 'red'}
                >
                    {type}
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
                    <Tag color="red">
                        <FormattedMessage id="sale.inactive" />
                    </Tag>
                );
            },
        },
        {
            title: <FormattedMessage id="category.table.action" />,
            key: 'actions',
            render: (_: any, record: ISale) => {
                let buttonDelete = (
                    <Button
                        onClick={() => handleDelete(record.id)}
                        style={{ color: 'black' }}
                        danger
                        icon={<DeleteOutlined />}
                    />
                );
                if (loadingDeleteSale && deletedSaleID == record.id) {
                    buttonDelete = (
                        <Button style={{ color: 'black' }} className="bg-black" danger icon={<LoadingSmall />} />
                    );
                } else if (loadingDeleteSale && deletedSaleID != record.id) {
                    buttonDelete = (
                        <Button
                            style={{ color: 'black' }}
                            className="bg-gray-400 border-none hover:bg-gray-300"
                            danger
                            icon={<DeleteOutlined />}
                        />
                    );
                }
                return (
                    <div className="flex gap-2">
                        {buttonDelete}
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

    return (
        <div>
            <Heading>
                <FormattedMessage id="admin.listSale" />
            </Heading>
            <div
                style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
                <Input
                    onChange={searchSale}
                    placeholder={intl.formatMessage({ id: 'Search_for' })}
                    style={{ width: 300 }}
                />
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
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
        </div>
    );
};

export default ListSale;
