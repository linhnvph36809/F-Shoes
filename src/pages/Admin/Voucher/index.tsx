import { Link } from 'react-router-dom';
import { CircleX, RefreshCcw, SquarePen, Trash2 } from 'lucide-react';
import { Input } from 'antd';
import { useState } from 'react';

import ButtonEdit from '../components/Button/ButtonEdit';
import TableAdmin from '../components/Table';
import LoadingBlock from '../../../components/Loading/LoadingBlock';
import useQueryConfig from '../../../hooks/useQueryConfig';
import useVoucher, { API_VOUCHER } from '../../../hooks/useVoucher';
import { showMessageActive } from '../../../utils/messages';
import Heading from '../components/Heading';
import ButtonPrimary from '../../../components/Button';
import { PATH_ADMIN } from '../../../constants/path';

export const KEY = 'list-voucher';

const ListVoucher = () => {
    const { data, isFetching, refetch } = useQueryConfig(KEY, API_VOUCHER);
    const { deleteVoucher, restoreVoucher, softVocher } = useVoucher();
    const [searchTerm, setSearchTerm] = useState('');

    const handleDeleteVoucher = (id?: string | number) => {
        if (id) {
            showMessageActive('Are you sure you want to delete the voucher?', '', 'warning', () => {
                deleteVoucher(id);
                refetch();
            });
        }
    };

    const handleRestoreVoucher = (id: string | number) => {
        restoreVoucher(id);
        refetch();
    };

    const handleSoftVoucher = (id: string | number) => {
        softVocher(id);
        refetch();
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: '2',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: '3',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: '4',
        },
        {
            title: 'Min Total Amount',
            dataIndex: 'min_total_amount',
            key: '4',
        },
        {
            title: 'Date Start',
            dataIndex: 'date_start',
            key: '5',
        },
        {
            title: 'Date End',
            dataIndex: 'date_end',
            key: '6',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: '7',
            render: (_: any, voucher: any) => (
                <div className="flex gap-2">
                    <Link to={`/admin/voucher/${voucher.id}`}>
                        <ButtonEdit>
                            <SquarePen />
                        </ButtonEdit>
                    </Link>
                    {voucher.deleted_at ? (
                        <ButtonEdit onClick={() => handleRestoreVoucher(voucher.id)}>
                            <RefreshCcw />
                        </ButtonEdit>
                    ) : (
                        <ButtonEdit onClick={() => handleSoftVoucher(voucher.id)}>
                            <CircleX />
                        </ButtonEdit>
                    )}
                    {voucher.deleted_at ? (
                        ''
                    ) : (
                        <ButtonEdit onClick={() => handleDeleteVoucher(voucher.id)}>{<Trash2 />}</ButtonEdit>
                    )}
                </div>
            ),
        },
    ];

    // Lọc dữ liệu theo searchTerm
    const filteredData = data?.data.filter(
        (voucher: any) => voucher.code.toLowerCase().includes(searchTerm.toLowerCase()), // Lọc theo 'code'
    );

    return (
        <>
            {isFetching ? (
                <LoadingBlock />
            ) : (
                <div>
                    <Heading>List Voucher</Heading>
                    <div className="mb-4 text-end flex justify-between">
                        <div>
                            <Link to={PATH_ADMIN.ADD_VOUCHER}>
                                <ButtonPrimary width="w-[150px]" height="h-[50px]">
                                    Add Voucher
                                </ButtonPrimary>
                            </Link>
                        </div>
                        <Input
                            placeholder="Search by Code"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            allowClear
                            className="w-3/12 h-[40px]
                                border-1 border-[#111111] focus:shadow
                                font-medium focus:border-[#111111] hover:border-[#111111] px-5"
                        />
                    </div>
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={filteredData} />
                </div>
            )}
        </>
    );
};

export default ListVoucher;
