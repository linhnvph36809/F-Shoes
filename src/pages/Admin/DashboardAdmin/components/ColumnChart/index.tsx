import ReactApexChart from 'react-apexcharts';
import { formatPrice } from '../../../../../utils';
import { useContextGlobal } from '../../../../../contexts';

interface Props {
    year1?: number | string;
    year2?: number | string;
    data1?: Array<any>;
    data2?: Array<any>;
}
const ColumnChart = ({ data1, data2, year1, year2 }: Props) => {
    const {  locale } = useContextGlobal();
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
    const categoriesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const categoriesVi = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
    
    if (year1 === year2) {
        series.splice(1);
    }
    const chartState = {
        series: series,
        locale: locale,
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
                categories: locale === 'vi' ? categoriesVi : categoriesEn,
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
