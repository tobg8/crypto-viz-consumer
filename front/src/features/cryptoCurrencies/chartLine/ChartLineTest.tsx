import { useEffect } from 'react';
import Highcharts, { Options } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';

Highcharts.setOptions({
  licenseKey: 'YOUR_LICENSE_KEY',
});

declare module 'highcharts' {
  interface Options {
    licenseKey?: string;
  }

  interface TooltipOptions {
    crosshairs?: boolean;
  }
}

HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

const ChartLineTest = () => {
  useEffect(() => {
    const data1 = [
      [1635427800000, 152.57],
      [1635514200000, 184.31],
      [1635773400000, 148.96],
      [1635859800000, 150.02],
    ];

    const data2 = [
      [1635427800000, 149.8],
      [1635514200000, 149.8],
      [1635773400000, 148.96],
      [1635859800000, 150.02],
    ];

    const options: Options = {
      title: {
        text: 'Dual Area Charts',
        align: 'left',
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%e of %b',
        },
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      tooltip: {
        shared: true,
        crosshairs: true,
      },
      plotOptions: {
        area: {
          stacking: 'normal',
        },
      },
      series: [
        {
          type: 'area',
          name: 'Area Chart 1',
          data: data1,
        },
        {
          type: 'area',
          name: 'Area Chart 2',
          data: data2,
        },
      ],
    };

    Highcharts.chart('container', options);
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={{}} />;
};

export default ChartLineTest;
