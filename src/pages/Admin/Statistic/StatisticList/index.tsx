import { Avatar, Badge, Card, DatePicker } from 'antd';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { UserOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';

import './style.scss';
import useQueryConfig from '../../../../hooks/useQueryConfig';
import { CircleDollarSign } from 'lucide-react';
import { useMemo, useState } from 'react';
import { formatPrice } from '../../../../utils';
import TableOrder from '../TableOrder';
import TopProduct from '../TopProduct';

const currentYear = new Date().getFullYear();

const Statistic = () => {
    const { data } = useQueryConfig('statistic', '/api/statistics/overall');
    const { data: orders } = useQueryConfig('statistic-order', '/api/statistics/order');
    const { data: users } = useQueryConfig('statistic-user', '/api/statistics/user');
    console.log(orders);
    const [selectedYear, setSelectedYear] = useState<any>(currentYear);

    const handleChange = (dateString: any) => {
        setSelectedYear(dateString['$y']);
    };

    function countOrdersByMonth(data: any, year: any) {
        const orderCountByMonth: any = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        };

        const filteredData = data?.filter((order: any) => {
            const orderYear = new Date(order.create_at).getFullYear();
            return orderYear === year;
        });

        // Cập nhật số lượng đơn hàng theo tháng cho năm đã lọc
        filteredData?.forEach((order: any) => {
            const month = new Date(order.create_at).toLocaleString('en-US', { month: 'long' });
            orderCountByMonth[month]++;
        });

        return orderCountByMonth;
    }

    const top5Spending = useMemo(() => {
        return users?.data
            ?.map((item: any) => ({
                ...item,
                spend_money: parseFloat(item.spend_money),
            }))
            .sort((a: any, b: any) => b.spend_money - a.spend_money)
            .slice(0, 5);
    }, [users]);

    // Ví dụ: Đếm đơn hàng theo tháng cho năm 2024
    const result = countOrdersByMonth(orders?.data.data, selectedYear);
    const profitData = [
        { name: 'January', quantity: result.January },
        { name: 'February', quantity: result.February },
        { name: 'March', quantity: result.March },
        { name: 'April', quantity: result.April },
        { name: 'May', quantity: result.May },
        { name: 'June', quantity: result.June },
        { name: 'July', quantity: result.July },
        { name: 'August', quantity: result.August },
        { name: 'September', quantity: result.September },
        { name: 'October', quantity: result.October },
        { name: 'November', quantity: result.November },
        { name: 'December', quantity: result.December },
    ];

    const dataDasboard = [
        {
            icon: <CircleDollarSign />,
            amount: <p>{Math.round(data?.data.total_amount / 1000)}K</p>,
            title: 'Total Amount',
            positive: null,
        },
        {
            icon: <ShoppingCartOutlined />,
            amount: <p>{data?.data.total_product}</p>,
            title: 'Total Product',
            positive: true,
        },
        {
            icon: <ShoppingOutlined />,
            amount: <p>{data?.data.total_order}</p>,
            title: 'Total Order',
            positive: true,
        },
        {
            icon: <UserOutlined />,
            amount: <p>{data?.data.total_user}</p>,
            title: 'Total Users',
            positive: false,
        },
    ];
    // Component thẻ chỉ số
    const DashboardCard = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {dataDasboard?.map((item: any, index) => (
                    <Card
                        key={index}
                        className="flex flex-col items-center p-4 shadow-md hover:shadow-lg"
                        style={{ borderRadius: '8px' }}
                    >
                        <div className="text-5xl text-black-600">{item.icon}</div>
                        <div className="text-4xl font-semibold">{item.amount}</div>
                        <div className="flex items-center ">
                            <div className="text-gray-600 mr-10 text-2xl">{item.title}</div>
                            <div className={`text-2xl ${item.positive ? 'text-black-600' : 'text-gray-600'}`}>
                                {item.positive ? '↑' : '↓'} {item.percentage}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        );
    };

    // Component biểu đồ lợi nhuận
    const ProfitChart = () => (
        <div className="revenue-chart-container bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <span className="text-black-600 font-semibold mr-2"> Order Quantity</span>
                </div>
                <DatePicker picker="year" format="YYYY" onChange={handleChange} />
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={profitData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantity" fill="#000000 " />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

    // Bảng TopChannel
    const TopChannels = () => {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md mb-4 w-full">
                <TopProduct />
            </div>
        );
    };

    const Chats = () => {
        return (
            <div className="bg-white p-4 rounded-lg shadow-md w-full">
                <span className="text-black-600 font-semibold mr-2">Top User</span>
                <div>
                    {top5Spending?.map((chat: any, index: number) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center">
                                <Badge
                                    dot
                                    color={
                                        chat.status === 'online' ? 'green' : chat.status === 'away' ? 'yellow' : 'red'
                                    }
                                >
                                    <Avatar>{chat.name.charAt(0)}</Avatar>
                                </Badge>
                                <div className="ml-3">
                                    <h4 className="font-medium">{chat.name}</h4>
                                    <p className="text-gray-500 text-[12px]">Total Order: {chat.total_orders}</p>
                                    <p className="color-primary font-medium">{formatPrice(chat.spend_money)}đ</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="">
                <DashboardCard />
            </div>
            <div className="col-span-5 md:col-span-2 lg:col-span-4 mt-4">
                <ProfitChart />
            </div>
            <div>
                <TableOrder dataSource={orders?.data?.data} />
            </div>
            <div className="grid grid-cols-3 gap-x-5 my-5">
                <>
                    <article className="rounded-lg border border-gray-100 bg-white p-6 mb-5">
                        <div>
                            <p className="text-[16px] text-gray-500">Order Success</p>
                            <p className="text-[20px] font-medium text-gray-900">{orders?.data?.order_success}</p>
                        </div>
                        <div className="mt-1 flex gap-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <p className="flex gap-2 text-xs">
                                <span className="font-medium text-[14px]"> 67.81% </span>
                                <span className="text-gray-500 text-[12px]"> Since last week </span>
                            </p>
                        </div>
                    </article>
                    <article className="rounded-lg border border-gray-100 bg-white p-6 mb-5">
                        <div>
                            <p className="text-[16px] text-gray-500">Order Fail</p>
                            <p className="text-[20px] font-medium text-gray-900">{orders?.data?.order_fails}</p>
                        </div>
                        <div className="mt-1 flex gap-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <p className="flex gap-2 text-xs">
                                <span className="font-medium text-[14px]"> 67.81% </span>
                                <span className="text-gray-500 text-[12px]"> Since last week </span>
                            </p>
                        </div>
                    </article>
                    <article className="rounded-lg border border-gray-100 bg-white p-6 mb-5">
                        <div>
                            <p className="text-[16px] text-gray-500">Order Return </p>
                            <p className="text-[20px] font-medium text-gray-900">{orders?.data.order_return}</p>
                        </div>
                        <div className="mt-1 flex gap-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <p className="flex gap-2 text-xs">
                                <span className="font-medium text-[14px]"> 67.81% </span>
                                <span className="text-gray-500 text-[12px]"> Since last week </span>
                            </p>
                        </div>
                    </article>
                    <article className="rounded-lg border border-gray-100 bg-white p-6 mb-5">
                        <div>
                            <p className="text-[16px] text-gray-500">Order In Process</p>
                            <p className="text-[20px] font-medium text-gray-900">{orders?.data.order_in_process}</p>
                        </div>
                        <div className="mt-1 flex gap-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <p className="flex gap-2 text-xs">
                                <span className="font-medium text-[14px]"> 67.81% </span>
                                <span className="text-gray-500 text-[12px]"> Since last week </span>
                            </p>
                        </div>
                    </article>
                    <article className="rounded-lg border border-gray-100 bg-white p-6 mb-5">
                        <div>
                            <p className="text-[16px] text-gray-500">Percentage Return</p>
                            <p className="text-[20px] font-medium text-gray-900">{orders?.data.percentage_return}%</p>
                        </div>
                        <div className="mt-1 flex gap-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <p className="flex gap-2 text-xs">
                                <span className="font-medium text-[14px]"> 67.81% </span>
                                <span className="text-gray-500 text-[12px]"> Since last week </span>
                            </p>
                        </div>
                    </article>
                    <article className="rounded-lg border border-gray-100 bg-white p-6 mb-5">
                        <div>
                            <p className="text-[16px] text-gray-500">Percentage Fail</p>
                            <p className="text-[20px] font-medium text-gray-900">{orders?.data.percentage_fail}%</p>
                        </div>
                        <div className="mt-1 flex gap-1 text-green-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                />
                            </svg>
                            <p className="flex gap-2 text-xs">
                                <span className="font-medium text-[14px]"> 67.81% </span>
                                <span className="text-gray-500 text-[12px]"> Since last week </span>
                            </p>
                        </div>
                    </article>
                </>
            </div>
            <div className="min-h-screen bg-gray-100 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <TopChannels />
                <Chats />
            </div>
        </div>
    );
};

export default Statistic;
