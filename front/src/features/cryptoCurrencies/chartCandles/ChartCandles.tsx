import { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import usecCartCandlesStore from './chartCandles.store';

const ChartCandles = () => {
  const { chartData, fetchData, isLoading, error } = usecCartCandlesStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const options = {
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
      selected: 2,
      inputStyle: {
        color: '#2549a3',
      },
      buttonText: null,
      buttonSpacing: 5,
    },
    title: {
      text: 'HLC data crypto price',
    },
    series: [
      {
        name: 'HLC data',
        data: chartData,
        type: 'candlestick',
        color: '#ea3943',
        upColor: '#16c784',
      },
    ],
    accessibility: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartCandles;
