import ReactApexChart from 'react-apexcharts';
import { formatPrice } from '../../../../../utils';

interface Props {
    year1?: number | string;
    year2?: number | string;
    data1?: Array<any>;
    data2?: Array<any>;
}
const ColumnChart = ({ data1, data2, year1, year2 }: Props) => {
    const series = [
        {
            name: year1,
            data: data1,
        },
        {
            name: year2,
            data: data2,
        },
    ];
    if (year1 === year2) {
        series.splice(1);
    }
    const chartState = {
        series: series,
        options: {
            chart: {
                type: 'bar',
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded',
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            },
            yaxis: {
                title: {
                    text: '$ (vnd)',
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: function (val: any) {
                        return '$ ' + formatPrice(val) + ' vnd';
                    },
                },
            },
        },
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={chartState.options as any}
                    series={chartState.series as any}
                    type="bar"
                    height={350}
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};
export default ColumnChart;
