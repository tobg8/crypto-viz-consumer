import { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import StoreCrypto from '../../listingCurrencies/listingCurrencies.store';
import {
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { IChart } from 'core/chartCandles';
import ChartCandles from '../chartCandles/ChartCandles';

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

const sortChartData = (data: never[]) => {
  return data.slice().sort((a, b) => a[0] - b[0]);
};

const ChartLine = () => {
  const { id } = useParams<{ id: string }>();
  const { merged } = StoreCrypto.useStore();
  const [error, setError] = useState<string | null>(null);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const filterItems = merged.find((e) => e.currency_id === id)

  const [chartOptions, setChartOptions] = useState({
    rangeSelector: {
      buttons: [
        {
          type: 'weekth',
          count: 1,
          text: '1d',
          events: {
            click: function () {
              console.log('ONCLICK 1D')
              if (filterItems && filterItems.symbol) {
                const count = 1;
                if (eventSource) {
                  eventSource.close();
                }
                const newEventSource = new EventSource(
                  `http://localhost:3001/prices/${filterItems.symbol}/chart/${count}`
                );
                console.log('<=:: newEventSource INSIDE RANGE::=>', newEventSource)
                newEventSource.onmessage = (event) => {
                  const data = JSON.parse(event.data);
                  const transformedData = data.map((item: IChart) => [
                    parseInt(item.timestamp),
                    parseFloat(item.value),
                  ]);
                  console.log('transformedData INSIDE RANGE 1D::=>', transformedData)
                  setChartOptions((prevOptions) => ({
                    ...prevOptions,
                    rangeSelector: {
                      ...prevOptions.rangeSelector,
                      selected: 4,
                    },
                    series: [
                      {
                        ...prevOptions.series[0],
                        data: sortChartData(transformedData as never[]),
                        name: `Price (${filterItems?.symbol?.toLocaleUpperCase()})`,
                      },
                    ],
                  }));
                };
                newEventSource.onerror = (error) => {
                  console.error('EventSource failed:', error);
                  newEventSource.close();
                  setError('Failed to fetch data');
                };
                setEventSource(newEventSource);
              }
            }
          },
        },
        {
          type: 'weekth',
          count: 7,
          text: '7d',
          events: {
            click: function () {
              console.log('ONCLICK 7D')
              // if (filterItems && filterItems.symbol) {
              const count = 7;
              console.log('INSIDE ONCLICK 7D')
              if (eventSource) {
                eventSource.close();
              }
              const newEventSource = new EventSource(
                `http://localhost:3001/prices/${filterItems?.symbol}/chart/${count}`
              );
              console.log('<=:: newEventSource INSIDE RANGE::=>', newEventSource)
              newEventSource.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const transformedData = data.map((item: IChart) => [
                  parseInt(item.timestamp),
                  parseFloat(item.value),
                ]);
                console.log('transformedData INSIDE RANGE 7D::=>', transformedData)
                setChartOptions((prevOptions) => ({
                  ...prevOptions,
                  rangeSelector: {
                    ...prevOptions.rangeSelector,
                    selected: 4,
                  },
                  series: [
                    {
                      ...prevOptions.series[0],
                      data: sortChartData(transformedData as never[]),
                      name: `Price (${filterItems?.symbol?.toLocaleUpperCase()})`,
                    },
                  ],
                }));
              };
              newEventSource.onerror = (error) => {
                console.error('EventSource failed:', error);
                newEventSource.close();
                setError('Failed to fetch data');
              };
              setEventSource(newEventSource);
            }
            // }
          },
        },
        {
          type: 'month',
          count: 1,
          text: '1m',
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
    series: [
      {
        type: 'spline',
        tooltip: {
          valueDecimals: 2,
        },
        color: '#3861fb',
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


  useEffect(() => {
    if (filterItems && filterItems.symbol) {
      if (eventSource) {
        eventSource.close();
      }
      const newEventSource = new EventSource(
        `http://localhost:3001/prices/${filterItems.symbol}/chart/1`
      );

      console.log('newEventSource::=>', newEventSource)

      newEventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const transformedData = data.map((item: IChart) => [
          parseInt(item.timestamp),
          parseFloat(item.value),
        ]);

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          rangeSelector: {
            ...prevOptions.rangeSelector,
            selected: 4,
          },
          series: [
            {
              ...prevOptions.series[0],
              data: sortChartData(transformedData as never[]),
              name: `Price (${filterItems?.symbol?.toLocaleUpperCase()})`,
            },
          ],
        }));
      };

      newEventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        newEventSource.close();
        setError('Failed to fetch data');
      };

      setEventSource(newEventSource);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterItems]);

  if (error) return <Typography>{error}</Typography>

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={chartOptions}
      />
      <ChartCandles />
    </>
  );
};

export default ChartLine;
