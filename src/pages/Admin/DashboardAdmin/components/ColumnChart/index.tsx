import ReactApexChart from 'react-apexcharts';
import { formatPrice } from '../../../../../utils';

interface Props {
    data: Array<any>;
}
const ColumnChart = ({ data }: Props) => {
    const chartState = {
        series: [
            {
                name: 'Avenue per month',
                data: data,
            },
        ],
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
