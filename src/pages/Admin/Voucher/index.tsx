import { Link } from 'react-router-dom';
import { Search, SquarePen, Trash2 } from 'lucide-react';
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
import { formatPrice } from '../../../utils';
import { FormattedMessage, useIntl } from 'react-intl';
import PermissionElement from '../../../components/Permissions/PermissionElement';
import { ACTIONS, PERMISSION } from '../../../constants';

export const KEY = 'list-voucher';

const ListVoucher = () => {
    const intl = useIntl();
    const { data, isFetching, refetch } = useQueryConfig(KEY, API_VOUCHER);
    const { softVocher } = useVoucher();
    const [searchTerm, setSearchTerm] = useState('');

    const handleDeleteVoucher = (id?: string | number) => {
        if (id) {
            showMessageActive('Are you sure you want to delete the voucher?', '', 'warning', () => {
                softVocher(id);
                refetch();
            });
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: '1',
        },
        {
            title: <FormattedMessage id="voucher.table.code" />,
            dataIndex: 'code',
            key: '2',
            render: (_: any, { code }: any) => {
                return <>{<p className="font-medium">{code}</p>}</>;
            },
        },
        {
            title: <FormattedMessage id="voucher.table.discount" />,
            dataIndex: 'discount',
            key: '3',
            render: (_: any, discount: any) => {
                return (
                    <>
                        {discount.type == 'fixed' ? (
                            <p className="font-medium">{formatPrice(discount.discount)}đ</p>
                        ) : (
                            <p className="font-medium">{discount.discount}%</p>
                        )}
                    </>
                );
            },
        },
        {
            title: <FormattedMessage id="voucher.table.quantity" />,
            dataIndex: 'quantity',
            key: '4',
        },
        {
            title: <FormattedMessage id="voucher.table.min_total_amount" />,
            dataIndex: 'min_total_amount',
            key: '5',
        },
        {
            title: <FormattedMessage id="voucher.table.date_start" />,
            dataIndex: 'date_start',
            key: '6',
        },
        {
            title: <FormattedMessage id="voucher.table.date_end" />,
            dataIndex: 'date_end',
            key: '7',
        },
        {
            title: <FormattedMessage id="voucher.table.action" />,
            dataIndex: 'id',
            key: '8',
            render: (_: any, voucher: any) => (
                <div className="flex gap-2">
                    <PermissionElement keyName={PERMISSION.PERMISSION_VOUCHER} action={ACTIONS.ACTIONS_EDIT}>
                        <Link to={`/admin/voucher/${voucher.id}`}>
                            <ButtonEdit>
                                <SquarePen />
                            </ButtonEdit>
                        </Link>
                    </PermissionElement>
                    <PermissionElement keyName={PERMISSION.PERMISSION_VOUCHER} action={ACTIONS.ACTIONS_DELETE}>
                        <ButtonEdit onClick={() => handleDeleteVoucher(voucher.id)}>{<Trash2 />}</ButtonEdit>
                    </PermissionElement>
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
                    <Heading>
                        <FormattedMessage id="voucher.List_voucheroucher" />
                    </Heading>
                    <div className="mb-4 text-end flex justify-between">
                        <div>
                            <PermissionElement keyName={PERMISSION.PERMISSION_VOUCHER} action={ACTIONS.ACTIONS_ADD}>
                                <Link to={PATH_ADMIN.ADD_VOUCHER}>
                                    <ButtonPrimary width="w-[150px]" height="h-[50px]">
                                        <FormattedMessage id="voucher.add" />
                                    </ButtonPrimary>
                                </Link>
                            </PermissionElement>
                        </div>
                        <div className="relative text-end">
                            <input
                                placeholder={intl.formatMessage({ id: 'voucher.search' })}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-[300px] h-[50px] border font-medium text-[16px] border-gray-300 rounded-[10px] px-5 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                            />
                            <Search className="absolute top-1/2 right-5 -translate-y-1/2 w-8 text-gray-500 hover:cursor-pointer hover:opacity-50 transition-global" />
                        </div>
                    </div>
                    <TableAdmin scroll={{ x: 'max-content' }} rowKey="id" columns={columns} datas={filteredData} />
                </div>
            )}
        </>
    );
};

export default ListVoucher;
