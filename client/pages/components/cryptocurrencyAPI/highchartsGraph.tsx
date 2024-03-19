import React, { FC, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';

interface HighchartsGraphProps {
  data: Highcharts.SeriesLineOptions[];
}

const HighchartsGraph: FC<HighchartsGraphProps> = ({ data }) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.update({
        series: [{
          type: 'candlestick',
          data: data as Highcharts.PointOptionsObject[],
        }]
      });
    }
  }, [data]);

  useEffect(() => {
    HighchartsMore(Highcharts);
  }, []);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          title: {
            text: 'Sample Graph',
          },
          xAxis: {
            title: {
              text: 'X-axis',
            },
          },
          yAxis: {
            title: {
              text: 'Y-axis',
            },
          },
          series: [{
            type: 'candlestick',
            data: data,
          }],
        }}
        ref={chartRef}
      />
    </div>
  );
};

export default HighchartsGraph;