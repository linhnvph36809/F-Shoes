import { useState } from 'react';
import { DatePicker, Skeleton } from 'antd';

import { Content } from 'antd/es/layout/layout';
import Heading from '../components/Heading';
import useQueryConfig from '../../../hooks/useQueryConfig';
import { formatPrice, formatTime } from '../../../utils';
import BrushChart from './components/BrushChart';
import ColumnChart from './components/ColumnChart';
import BestSellingProduct from './components/BestSellingProduct';

const { RangePicker } = DatePicker;

type Date = {
    date_start: string;
    date_end: string;
};

const AdminDashboard = () => {
    const [dates, setDates] = useState<Date>({
        date_start: '',
        date_end: '',
    });

    const { data, isFetching } = useQueryConfig(
        `statistics/overall/from=${dates.date_start}&to=$${dates.date_end}`,
        `/api/v1/statistics/overall?from=${dates.date_start}&to=$${dates.date_end}`,
    );
    const overall = data?.data.data;
    const { data: chartDataCaching } = useQueryConfig(
        `statistics/data/orders/diagram/from${dates.date_start}&to=${dates.date_end}`,
        `/api/v1/statistics/data/orders/diagram?from=${dates.date_start}&to=$${dates.date_end}`,
    );
    const chartData = chartDataCaching?.data?.data?.orders || [];
    const [yearOfRevenueChart, setYearOfRevenueChart] = useState(new Date().getFullYear());
    const { data: revenueOfYearCaching } = useQueryConfig(
        `statistics/revenue/year/${yearOfRevenueChart}`,
        `/api/v1/statistics/revenue/year?year=${yearOfRevenueChart}`,
    );
    const [yearOfRevenueChart2, setYearOfRevenueChart2] = useState<number | string>(new Date().getFullYear());
    const { data: revenueOfYearCaching2 } = useQueryConfig(
        `statistics/revenue/year/${yearOfRevenueChart2}/2`,
        `/api/v1/statistics/revenue/year?year=${yearOfRevenueChart2}`,
    );
    const { data: productBestSellingCaching } = useQueryConfig(
        `statistics/product/bestselling/${dates.date_start}/${dates.date_end}`,
        `/api/v1/statistics/product/bestselling?from=${dates.date_start}&to=${dates.date_end}`,
    );
    const productBestSellingData = productBestSellingCaching?.data?.data || [];

    const revenueOfYearData = revenueOfYearCaching?.data?.data || [];
    const revenueOfYearData2 = revenueOfYearCaching2?.data?.data || [];
    const handleChange = (value: any) => {
        if (value) {
            setDates({
                date_start: value[0]?.format('YYYY-MM-DD') || '',
                date_end: value[1]?.format('YYYY-MM-DD') || '',
            });
        } else {
            setDates({ date_start: '', date_end: '' });
        }
    };
    const onChangeYearOfRevenueStatisticsChart = (value: any) => {
        if (value && value?.$y) {
            setYearOfRevenueChart(value.$y);
        } else {
            setYearOfRevenueChart(new Date().getFullYear());
        }
    };
    const onChangeYearOfRevenueStatisticsChart2 = (value: any) => {
        if (value && value?.$y) {
            setYearOfRevenueChart2(value.$y);
        } else {
            setYearOfRevenueChart2(new Date().getFullYear());
        }
    };
    const UptoFrom = (
        <span>
            from {dates.date_start ? formatTime(dates.date_start) : 'last month'} to{' '}
            {dates.date_end ? formatTime(dates.date_end) : 'present'}
        </span>
    );

    return (
        <Content>
            <div className="flex justify-between items-center">
                <Heading>Statistics</Heading>
                <div className="flex gap-x-5 mb-10">
                    <RangePicker
                        onChange={handleChange}
                        className="active:border-[#111111] border-[#111111] hover:border-[#ccc]"
                    />
                </div>
            </div>
            {isFetching ? (
                <Skeleton />
            ) : (
                <div className="grid grid-cols-4 gap-x-10">
                    <div className="h-[180px] flex flex-col justify-between bg-[#f1f1f1] p-9 rounded-[14px]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[16px] text-[#606060] font-medium">
                                    <FormattedMessage id="admin.Total_User" />
                                </p>
                                <h3 className="text-[30px] font-bold color-primary mt-5">
                                    {overall?.users ? overall.users.total : 0}
                                </h3>
                            </div>
                            <div>
                                <svg
                                    width={60}
                                    height={60}
                                    viewBox="0 0 60 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.21"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                                        fill="#8280FF"
                                    />
                                    <path
                                        opacity="0.587821"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M20.6667 23.3333C20.6667 26.2789 23.0545 28.6667 26 28.6667C28.9455 28.6667 31.3333 26.2789 31.3333 23.3333C31.3333 20.3878 28.9455 18 26 18C23.0545 18 20.6667 20.3878 20.6667 23.3333ZM34 28.6667C34 30.8758 35.7909 32.6667 38 32.6667C40.2091 32.6667 42 30.8758 42 28.6667C42 26.4575 40.2091 24.6667 38 24.6667C35.7909 24.6667 34 26.4575 34 28.6667Z"
                                        fill="#8280FF"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M25.9778 31.3333C19.6826 31.3333 14.5177 34.5687 14.0009 40.9323C13.9727 41.2789 14.6356 42 14.97 42H36.9956C37.9972 42 38.0128 41.194 37.9972 40.9333C37.6065 34.3909 32.3616 31.3333 25.9778 31.3333ZM45.2746 42L40.1333 42C40.1333 38.9988 39.1417 36.2291 37.4683 34.0008C42.0103 34.0505 45.7189 36.3469 45.998 41.2C46.0092 41.3955 45.998 42 45.2746 42Z"
                                        fill="#8280FF"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <svg
                                width={20}
                                height={12}
                                viewBox="0 0 20 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z"
                                    fill="#00B69B"
                                />
                            </svg>
                            <p className="text-[#606060]">
                                <span className="font-medium text-[#00B69B]">
                                    {overall?.users ? Number(overall.users.percentage).toFixed(2) : 0}%
                                </span>{' '}
                                {UptoFrom}
                            </p>
                        </div>
                    </div>
                    <div className="h-[180px] flex flex-col justify-between bg-[#f1f1f1] p-9 rounded-[14px]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[16px] text-[#606060] font-medium">
                                    <FormattedMessage id="admin.Total_Order" />
                                </p>
                                <h3 className="text-[30px] font-bold color-primary mt-5">
                                    {overall?.orders ? overall.orders.total : 0}
                                </h3>
                            </div>
                            <div>
                                <svg
                                    width={60}
                                    height={60}
                                    viewBox="0 0 60 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.21"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                                        fill="#FEC53D"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15 24.3165L27.9005 31.7646C28.0394 31.8448 28.1851 31.9027 28.3333 31.9395V46.3847L15.9201 39.0385C15.3498 38.701 15 38.0876 15 37.4249V24.3165ZM45 24.1185V37.4249C45 38.0876 44.6502 38.701 44.0799 39.0385L31.6667 46.3847V31.8129C31.6969 31.7978 31.7269 31.7817 31.7566 31.7646L45 24.1185Z"
                                        fill="#FEC53D"
                                    />
                                    <path
                                        opacity="0.499209"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.4052 20.7014C15.5628 20.5024 15.7617 20.3343 15.9936 20.2108L29.1186 13.2201C29.6695 12.9266 30.3304 12.9266 30.8814 13.2201L44.0064 20.2108C44.1852 20.306 44.3443 20.4277 44.48 20.5697L30.0899 28.8778C29.9953 28.9325 29.908 28.995 29.8285 29.064C29.749 28.995 29.6618 28.9325 29.5671 28.8778L15.4052 20.7014Z"
                                        fill="#FEC53D"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <svg
                                width={20}
                                height={12}
                                viewBox="0 0 20 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z"
                                    fill="#00B69B"
                                />
                            </svg>
                            <p className="text-[#606060]">
                                <span className="font-medium text-[#00B69B]">
                                    {overall?.orders ? Number(overall.orders.percentage).toFixed(2) : 0}%
                                </span>{' '}
                                {UptoFrom}
                            </p>
                        </div>
                    </div>
                    <div className="h-[180px] flex flex-col justify-between bg-[#f1f1f1] p-9 rounded-[14px]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[16px] text-[#606060] font-medium">
                                    <FormattedMessage id="admin.Total_Product" />
                                </p>
                                <h3 className="text-[30px] font-bold color-primary mt-5">
                                    {overall?.products ? overall.products.total : 0}
                                </h3>
                            </div>
                            <div>
                                <svg
                                    width={60}
                                    height={60}
                                    viewBox="0 0 60 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.3"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                                        fill="#FF9066"
                                    />
                                    <path
                                        opacity="0.78"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M28.6312 23.8088C28.6512 23.5483 28.8684 23.3472 29.1297 23.3472H29.5475C29.8044 23.3472 30.0195 23.5418 30.045 23.7974L30.6667 30.0139L35.0814 32.5366C35.2372 32.6256 35.3333 32.7913 35.3333 32.9707V33.3592C35.3333 33.6889 35.0199 33.9284 34.7018 33.8416L28.3987 32.1226C28.1673 32.0595 28.0133 31.841 28.0317 31.6019L28.6312 23.8088Z"
                                        fill="#FF9066"
                                    />
                                    <path
                                        opacity="0.901274"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M22.7218 14.9844C22.4577 14.6696 21.9477 14.7901 21.8524 15.1898L20.2189 22.0379C20.1412 22.3636 20.3993 22.6721 20.7336 22.6531L27.7783 22.2539C28.1892 22.2306 28.3976 21.7486 28.133 21.4333L26.3316 19.2865C27.4965 18.8884 28.7317 18.6805 30 18.6805C36.2592 18.6805 41.3333 23.7546 41.3333 30.0139C41.3333 36.2731 36.2592 41.3472 30 41.3472C23.7408 41.3472 18.6667 36.2731 18.6667 30.0139C18.6667 28.9631 18.809 27.9339 19.0864 26.9448L16.5188 26.2246C16.1808 27.4298 16 28.7007 16 30.0139C16 37.7458 22.268 44.0139 30 44.0139C37.732 44.0139 44 37.7458 44 30.0139C44 22.2819 37.732 16.0139 30 16.0139C28.0551 16.0139 26.2029 16.4104 24.5197 17.1271L22.7218 14.9844Z"
                                        fill="#FF9066"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center gap-x-4">
                            <svg
                                width={20}
                                height={12}
                                viewBox="0 0 20 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14 0L16.29 2.29L11.41 7.17L7.41 3.17L0 10.59L1.41 12L7.41 6L11.41 10L17.71 3.71L20 6V0H14Z"
                                    fill="#00B69B"
                                />
                            </svg>
                            <p className="text-[#606060]">
                                <span className="font-medium text-[#00B69B]">
                                    {overall?.products ? Number(overall.products.percentage).toFixed(2) : 0}%
                                </span>{' '}
                                {UptoFrom}
                            </p>
                        </div>
                    </div>
                    <div className="h-[180px] flex flex-col justify-between bg-[#f1f1f1] p-9 rounded-[14px]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[16px] text-[#606060] font-medium">
                                    <FormattedMessage id="admin.Total_Amount_Order" />
                                </p>
                                <h3 className="text-[30px] font-bold color-primary mt-5">
                                    {formatPrice(overall?.total_amount_orders ? overall.total_amount_orders : 0)}đ
                                </h3>
                            </div>
                            <div>
                                <svg
                                    width={60}
                                    height={60}
                                    viewBox="0 0 60 60"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        opacity="0.21"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 30V37C0 49.7025 10.2975 60 23 60H30H37C49.7025 60 60 49.7025 60 37V30V23C60 10.2975 49.7025 0 37 0H30H23C10.2975 0 0 10.2975 0 23V30Z"
                                        fill="#4AD991"
                                    />
                                    <path
                                        d="M19.1111 40.8889H42.4444C43.3036 40.8889 44 41.5853 44 42.4444C44 43.3036 43.3036 44 42.4444 44H17.5556C16.6964 44 16 43.3036 16 42.4444V17.5556C16 16.6964 16.6964 16 17.5556 16C18.4147 16 19.1111 16.6964 19.1111 17.5556V40.8889Z"
                                        fill="#4AD991"
                                    />
                                    <path
                                        opacity="0.5"
                                        d="M24.9126 34.175C24.325 34.8018 23.3406 34.8335 22.7139 34.2459C22.0871 33.6584 22.0554 32.674 22.643 32.0472L28.4763 25.825C29.0445 25.2188 29.9888 25.1663 30.6209 25.7056L35.2249 29.6344L41.2235 22.0361C41.7559 21.3618 42.734 21.2467 43.4083 21.7791C44.0826 22.3114 44.1977 23.2896 43.6654 23.9639L36.6654 32.8306C36.1186 33.5231 35.1059 33.6227 34.4347 33.05L29.7306 29.0358L24.9126 34.175Z"
                                        fill="#4AD991"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <h3 className="text-[18px] font-bold m-4 border-b-[1px]">
                    <FormattedMessage id="admin.Order_Statistics_Chart" />
                </h3>
                <BrushChart orders={chartData} startDate={dates.date_start} endDate={dates.date_end} />
            </div>
            <div>
                <BestSellingProduct data={productBestSellingData} />
            </div>
            <div>
                <h3 className="text-[18px] font-bold m-4 border-b-[1px]"><FormattedMessage id="admin.Annual_Revenue_Statistics_Chart" /></h3>
                <div className="flex justify-end my-4">
                    <DatePicker
                        placeholder="Select a year"
                        picker="year"
                        className="w-[20%] focus:border-none focus:outline-none"
                        format="YYYY"
                        onChange={onChangeYearOfRevenueStatisticsChart}
                    />
                    <DatePicker
                        placeholder="Select a year"
                        picker="year"
                        className="w-[20%] focus:border-none focus:outline-none"
                        format="YYYY"
                        onChange={onChangeYearOfRevenueStatisticsChart2}
                    />
                </div>
                <ColumnChart
                    data1={revenueOfYearData}
                    year1={yearOfRevenueChart}
                    data2={revenueOfYearData2}
                    year2={yearOfRevenueChart2}
                />
            </div>
        </Content>
    );
};

export default AdminDashboard;
