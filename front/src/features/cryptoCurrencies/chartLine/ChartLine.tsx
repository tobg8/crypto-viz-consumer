import { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import usecChartLineStore from './ChartLine.store';

Highcharts.setOptions({
  licenseKey: 'YOUR_LICENSE_KEY',
});

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

const ChartLine = () => {
  const [chartOptions, setChartOptions] = useState({
    rangeSelector: {
      buttons: [
        {
          type: 'month',
          count: 1,
          text: '1m',
        },
        {
          type: 'month',
          count: 3,
          text: '3m',
        },
        {
          type: 'month',
          count: 6,
          text: '6m',
        },
        {
          type: 'ytd',
          text: 'YTD',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
      selected: 1,
      inputStyle: {
        color: '#2549a3',
      },
      buttonText: null,
      buttonSpacing: 5,
    },
    title: {
      text: 'Cryptocurrency Prices',
    },
    series: [
      {
        name: 'Cryptocurrency Prices',
        data: [],
        type: 'area',
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
    navigator: {
      enabled: true,
      xAxis: {
        dateTimeLabelFormats: {
          month: '%b %Y',
        },
      },
    },
    plotBands: [
      {
        from: Date.UTC(2023, 5, 1),
        to: Date.UTC(2023, 5, 15),
        color: 'rgba(68, 170, 213, 0.2)',
        label: {
          text: 'Événement important',
          style: {
            color: '#606060',
          },
        },
      },
    ],
    annotations: [
      {
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: Date.UTC(2023, 5, 5),
              y: 150,
            },
            text: 'Annotation',
          },
        ],
      },
    ],
    xAxis: {
      crosshair: {
        color: 'rgba(0, 0, 0, 0.8)',
        dashStyle: 'longdashdot',
        snap: false,
        label: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          format: '{value:%Y-%m-%d %H:%M:%S}',
        },
      },
    },
    exporting: {
      enabled: true,
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadCSV'],
        },
      },
    },
    accessibility: {
      enabled: false,
    },
  });

  const { chartData, fetchData } = usecChartLineStore();

  console.log('chartData:=>', chartData)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          'https://demo-live-data.highcharts.com/aapl-c.json'
        );
        const data = await response.json();

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          rangeSelector: {
            ...prevOptions.rangeSelector,
            selected: 4,
          },
          series: [
            {
              ...prevOptions.series[0],
              data: data,
              color: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, '#3861fb'],
                  [1, '#FFFFFF'],
                ],
              },
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      options={chartOptions}
    />
  );
};

export default ChartLine;
