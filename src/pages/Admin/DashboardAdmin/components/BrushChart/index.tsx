import ReactApexChart from 'react-apexcharts';
import { IOrder } from '../../../../../interfaces/IOrder';
import { handleChangeMessage, oneMonthAgo } from '../../../../../utils';
import { useContextGlobal } from '../../../../../contexts';


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
    const { locale } = useContextGlobal();
   
    const chartData = generateOrdersData(orders || []);
    const minDate = startDate ? new Date(`${startDate}`).getTime() : oneMonthAgo().getTime();
    const maxDate = endDate ? new Date(`${endDate}`).getTime() : new Date().getTime();
    const localeChart = [
        {
            name: 'en',
            options: {
                months: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
                shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                toolbar: {
                    exportToSVG: 'Download SVG',
                    exportToPNG: 'Download PNG',
                    menu: 'Menu',
                    selection: 'Selection',
                    selectionZoom: 'Selection Zoom',
                    zoomIn: 'Zoom In',
                    zoomOut: 'Zoom Out',
                    pan: 'Panning',
                    reset: 'Reset Zoom',
                },
            },
        },
        {
            name: 'vi',
            options: {
                months: [
                    'Tháng một',
                    'Tháng hai',
                    'Tháng ba',
                    'Tháng tư',
                    'Tháng năm',
                    'Tháng sáu',
                    'Tháng bảy',
                    'Tháng tám',
                    'Tháng chín',
                    'Tháng mười',
                    'Tháng 11',
                    'Tháng 12',
                ],
                shortMonths: [
                    'Tháng một',
                    'Tháng hai',
                    'Tháng ba',
                    'Tháng tư',
                    'Tháng năm',
                    'Tháng sáu',
                    'Tháng bảy',
                    'Tháng tám',
                    'Tháng chín',
                    'Tháng mười',
                    'Tháng mười một',
                    'Tháng mười hai',
                ],
                days: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
                shortDays: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
                toolbar: {
                    exportToSVG: 'Tải xuống SVG',
                    exportToPNG: 'tải xuống PNG',
                    menu: 'Danh sách',
                    selection: 'Lựa chọn',
                    selectionZoom: 'Thu phóng lựa chọn',
                    zoomIn: 'Phóng to',
                    zoomOut: 'Phóng nhỏ',
                    pan: 'Xoay',
                    reset: 'Làm mới thu phóng',
                },
            },
        },
    ];
    
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
            defaultLocale: locale,
            locales: [...localeChart],
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
                name: handleChangeMessage(locale,'Number of Orders','Số lượng đơn hàng'),
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
            defaultLocale: locale,
            locales: [...localeChart],
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
                <ReactApexChart key={locale} options={options1 as any} series={options1.series as any} type="area" height={230} />
            </div>
            <div id="chart-bar">
                <ReactApexChart key={locale} options={options2 as any} series={options2.series as any} type="bar" height={130} />
            </div>
        </div>
    );
};

export default BrushChart;
