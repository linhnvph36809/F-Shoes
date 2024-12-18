import ReactApexChart from 'react-apexcharts';
import { IOrder } from '../../../../../interfaces/IOrder';
import { oneMonthAgo } from '../../../../../utils';

interface Props {
    orders?: IOrder[] | [];
    startDate?: number | string;
    endDate?: number | string;
}

const generateOrdersData = (records: IOrder[]) => {
    const grouped: { [key: string]: number } = {};
    records.forEach((e: IOrder) => {
        const date = e?.created_at.split('T')[0];
        if (!grouped[date]) {
            grouped[date] = 0;
        }
        grouped[date]++;
    });
    return Object.entries(grouped).map(([date, count]) => [date, count]);
};

const BrushChart = ({ orders, startDate, endDate }: Props) => {
    const chartData = generateOrdersData(orders || []);
    const minDate = startDate ? new Date(`${startDate}`).getTime() : oneMonthAgo().getTime();
    const maxDate = endDate ? new Date(`${endDate}`).getTime() : new Date().getTime();

    const options1 = {
        chart: {
            id: 'chart2',
            type: 'area',
            height: 230,
            foreColor: '#ccc',
            toolbar: {
                autoSelected: 'pan',
                show: false,
            },
        },
        colors: ['#00BAEC'],
        stroke: {
            width: 3,
        },
        grid: {
            borderColor: '#555',
            clipMarkers: false,
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.55,
                opacityTo: 0,
            },
        },
        markers: {
            size: 5,
            colors: ['#000524'],
            strokeColor: '#00BAEC',
            strokeWidth: 3,
        },
        series: [
            {
                data: chartData,
            },
        ],
        tooltip: {
            theme: 'dark',
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            min: 0,
            tickAmount: 4,
        },
    };

    const options2 = {
        chart: {
            id: 'chart1',
            height: 130,
            type: 'bar',
            foreColor: '#ccc',
            brush: {
                target: 'chart2',
                enabled: true,
            },
            selection: {
                enabled: true,
                fill: {
                    color: '#fff',
                    opacity: 0.4,
                },
                xaxis: {
                    min: new Date(minDate).getTime(),
                    max: new Date(maxDate).getTime(),
                },
            },
        },
        colors: ['#FF0080'],
        series: [
            {
                data: chartData,
            },
        ],
        stroke: {
            width: 2,
        },
        grid: {
            borderColor: '#444',
        },
        markers: {
            size: 0,
        },
        xaxis: {
            type: 'datetime',
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            tickAmount: 2,
        },
    };

    return (
        <div>
            <div id="chart-area">
                <ReactApexChart options={options1 as any} series={options1.series as any} type="area" height={230} />
            </div>
            <div id="chart-bar">
                <ReactApexChart options={options2 as any} series={options2.series as any} type="bar" height={130} />
            </div>
        </div>
    );
};

export default BrushChart;
