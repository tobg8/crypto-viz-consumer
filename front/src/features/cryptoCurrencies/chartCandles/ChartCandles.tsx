import { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useParams } from 'react-router-dom';
import StoreCrypto from '../../listingCurrencies/listingCurrencies.store';

const initialData = {
  yAxis: {
    plotBands: [{
      color: 'rgba(169, 255, 101, 0.4)',
      from: 182.94,
      to: 177.57,
      zIndex: 3,
      label: {
        text: 'Resistance Zone'
      }
    }]
  },
  annotations: [{
    type: 'fibonacci',
    langKey: 'Fibonacci',
    typeOptions: {
      points: [{
        x: 1631021400000,
        y: 157.26
      }, {
        x: 1633354200000,
        y: 157.26
      }],
      height: 138.27 - 157.26,
      xAxis: 0,
      yAxis: 0
    }
  }, {
    type: 'crookedLine',
    langKey: 'Trendline',
    typeOptions: {
      points: [{
        x: 1636727400000,
        y: 147.48
      }, {
        x: 1642516200000,
        y: 182.5
      }]
    },
    shapeOptions: {
      stroke: 'orange',
      strokeWidth: 2
    }
  }],
  title: {
    text: 'OHLC'
  },
  series: [{
    type: 'candlestick',
    color: '#ea3943',
    upColor: '#16C784',
    pointWidth: 10
  }],
}

const ChartCandles = () => {
  const [ohlcOptions, setOhlcOptions] = useState(initialData);
  const { id } = useParams<{ id: string }>();
  const { merged } = StoreCrypto.useStore();
  const filterItems = merged.find((e) => e.currency_id === id)

  useEffect(() => {
    if (!filterItems) return;
    const newEventSource = new EventSource(
      `http://localhost:3001/ohlc/${filterItems?.symbol}/ohlc/1`
    );
    console.log('newEventSource OHLC', newEventSource)
    newEventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const transformedData = data.map((item: any) => [
        parseInt(item.timestamp),
        parseFloat(item.high),
        parseFloat(item.low),
        parseFloat(item.open),
        parseFloat(item.close),
      ]);

      setOhlcOptions((prevOptions) => ({
        ...prevOptions,
        series: [{
          ...prevOptions.series[0],
          data: transformedData,
          name: `Price (${filterItems?.symbol?.toLocaleUpperCase()})`,
        }],
      }));
    };

    return () => {
      newEventSource.close();
    };

  }, [filterItems])

  return <HighchartsReact highcharts={Highcharts} options={ohlcOptions} />
};

export default ChartCandles;
