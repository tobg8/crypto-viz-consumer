import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import Store from './chartLine.store';
import StoreCrypto from '../../listingCurrencies/listingCurrencies.store';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  ToggleButton,
  Paper,
  Divider,
  Stack,
  Button,
  Box,
} from '@mui/material';
import { sortValues } from 'core/enum/cryptoSymbolEnum';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import WaterfallChartRoundedIcon from '@mui/icons-material/WaterfallChartRounded';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';
import { BootstrapInput, StyledToggleButton } from './chartLineStyle';
import PopUpTrandingView from '../popUpTrandingView/PopUpTrandingView';
import { useParams } from 'react-router-dom';
import { IChart } from 'core/chartCandles';
import ChartCandles from '../chartCandles/ChartCandles';

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

const sortChartData = (data: never[]) => {
  return data.slice().sort((a, b) => a[0] - b[0]);
};

interface IFetchData {
  symbol: string | any;
  chartType: string;
  range: number;
}

const ChartLine = () => {
  const { id } = useParams<{ id: string }>();
  const { merged } = StoreCrypto.useStore();
  const [error, setError] = useState<string | null>(null);
  const [sortValue, setSortValue] = useState<string>('');
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const { setOpenTrandingView } = Store.useStore((state) => state);
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const handleCryptoChange = (event: SelectChangeEvent) => {
    const selectedCryptoValue = event.target.value;
    setSortValue(selectedCryptoValue);
    fetchData({ symbol: selectedCryptoValue, chartType: 'chart', range: 1 })
  };

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

  const fetchData = async ({ symbol, chartType, range }: IFetchData): Promise<void> => {
    // try {
    // if (eventSource) {
    //   eventSource.close();
    // }

    const newEventSource = new EventSource(
      `http://localhost:3001/prices/${symbol}/${chartType}/${range}`
    );

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
    // } catch (error) {
    //   console.error('Error fetching data:', error);
    //   setError('Failed to fetch data');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const filterItems = merged.find((e) => e.currency_id === id)

  useEffect(() => {
    if (filterItems && filterItems.symbol) fetchData({ symbol: filterItems?.symbol, chartType: 'chart', range: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack flexDirection={'row'} gap={2} justifyContent={'space-between'}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl variant="standard">
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={sortValue}
              onChange={handleCryptoChange}
              input={<BootstrapInput />}
            >
              {sortValues.map((crypto) => (
                <MenuItem
                  key={crypto.label}
                  value={crypto.label}
                >
                  {crypto.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              backgroundColor: '#eff2f5',
              borderRadius: 2
            }}
          >
            <StyledToggleButton
              size="small"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="right" aria-label="right">
                <ShowChartRoundedIcon sx={{ fontSize: 24 }} />
              </ToggleButton>
              <Divider flexItem orientation="vertical" sx={{ width: '2px' }} />
              <ToggleButton value="right" aria-label="right">
                <WaterfallChartRoundedIcon sx={{ fontSize: 24 }} />
              </ToggleButton>
            </StyledToggleButton>
          </Paper>
        </Box>
      </Stack >
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
