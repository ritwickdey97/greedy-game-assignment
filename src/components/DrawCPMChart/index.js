//@ts-check
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

/**
 *
 * @param { {stats: import('../../model/GameStat').GameStat[]} } props
 */
export const DrawCPMChart = props => {
  const { stats } = props;

  const data = useMemo(() => {
    if (!stats) return null;

    const labels = stats.map(stat => stat.timestamp);
    const data = stats.map(stat => stat.getECPM());

    /**
     * @type {import('react-chartjs-2').ChartData<Chart.ChartData>}
     */
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Game Stats',
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          data
        }
      ]
    };

    return chartData;
  }, [stats]);

  if (!data) return null;
  if (!stats.length) return 'No matched data';

  return (
    <div style={{ marginLeft: '-20px' }}>
      <Line
        options={{
          maintainAspectRatio: false,
          legend: null
        }}
        height={350}
        data={data}
      />
    </div>
  );
};
