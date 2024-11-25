import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const generateDayWiseTimeSeries = (baseval: any, count: any, yrange: any) => {
    let i = 0;
    const series = [];
    while (i < count) {
        const x = baseval;
        const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push([x, y]);
        baseval += 86400000;
        i++;
    }
    return series;
};

const BrushChart = () => {
    const data = generateDayWiseTimeSeries(new Date('22 Apr 2017').getTime(), 115, {
        min: 30,
        max: 90,
    });

    const [options1] = useState({
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
                data: data,
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
    });

    const [options2] = useState({
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
                    min: new Date('27 Jul 2017 10:00:00').getTime(),
                    max: new Date('14 Aug 2017 10:00:00').getTime(),
                },
            },
        },
        colors: ['#FF0080'],
        series: [
            {
                data: data,
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
    });

    return (
        <div>
            <div id="chart-area">
                <ReactApexChart options={options1 as any} series={options1.series} type="area" height={230} />
            </div>
            <div id="chart-bar">
                <ReactApexChart options={options2 as any} series={options2.series} type="bar" height={130} />
            </div>
        </div>
    );
};

export default BrushChart;
