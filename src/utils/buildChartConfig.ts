const buildScales = (axes: any) => {
  const scales = {
    y: {
      beginAtZero: true,
      fontFamily: 'Inter',
      fontSize: 12,
    },
    x: {
      fontFamily: 'Inter',
      fontSize: 12,
    },
  };

  return axes ? scales : null;
};

const buildLegend = (legend: any) => {
  const legendConfig = {
    display: true,
    position: 'bottom',
    labels: {
      fontFamily: 'Inter',
      fontSize: 12,
      boxWidth: 15,
      padding: 15,
    },
  };

  return legend ? legendConfig : null;
};

export const buildChartConfig = (config: any) => {
  const { chartType, labels, data, backgroundColor, borderColor, axes, legend } = config;

  const configuration = {
    type: chartType,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      scales: buildScales(axes),
      plugins: {
        legend: buildLegend(legend),
      },
    },
  };

  return configuration;
};

