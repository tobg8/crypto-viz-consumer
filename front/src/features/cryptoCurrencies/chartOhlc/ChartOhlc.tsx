import { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

const ChartOhlc = () => {
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
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
      buttonSpacing: 5,
    },
    title: {
      text: 'Cryptocurrency Prices',
    },
    series: [
      {
        name: 'AAPL Stock Price',
        type: 'ohlc',
        id: 'aapl-ohlc',
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
      {
        labels: [
          {
            point: {
              xAxis: 0,
              yAxis: 0,
              x: Date.UTC(2023, 5, 5),
              y: 150,
            },
            text: 'Flag Title',
            align: 'center',
            style: {
              color: 'black',
            },
          },
        ],
        zIndex: 5,
      },
    ],
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
    plotOptions: {
      series: {
        showInLegend: true,
      },
      ohlc: {
        // Vos options spécifiques pour le type 'ohlc'
      },
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://demo-live-data.highcharts.com/aapl-ohlcv.json');
        const data = await response.json();

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          rangeSelector: {
            ...prevOptions.rangeSelector,
            selected: 4,
          },
          series: prevOptions.series?.map((s, index) => {
            if (index === 0) {
              return {
                ...s,
                data: data,
                color: {
                  linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                  stops: [
                    [0, '#3861fb'],
                    [1, '#FFFFFF'],
                  ],
                },
                flags: [
                  {
                    x: Date.UTC(2023, 5, 5),
                    title: 'Flag Title',
                    text: 'Flag Description',
                    shape: 'squarepin',
                  },
                ],
              };
            }
            return s;
          }) || [],
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, []);

  const changeSeriesType = (type: string) => {
    console.log(type)
  }

  return (
    <div>
      <div>
        <button onClick={() => changeSeriesType('ohlc')}>OHLC</button>
        <button onClick={() => changeSeriesType('line')}>Line</button>
        <button onClick={() => changeSeriesType('candlestick')}>Candlestick</button>
      </div>
      <div>
        <button onClick={() => changeSeriesType('candlestick')}>Compare</button>
      </div>
      {chartOptions && (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="stockChart"
          options={chartOptions}
        />
      )}
    </div>
  );
};

export default ChartOhlc;
