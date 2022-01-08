import { Pie } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { chartConfigGeneration } from './helpers/chartBuilder.js';

export function MainPieChart(props) {
  var [chartDataAndDisplayOptions, chartDesignOptions] = chartConfigGeneration(useTheme(), props);

  chartDataAndDisplayOptions.labels = ['Taken', 'Available'];

  return (
    <Pie
      data={chartDataAndDisplayOptions}
      options={chartDesignOptions}
    />
  );
}

export function MinorPieChart(props) {
  var [chartDataAndDisplayOptions, chartDesignOptions] = chartConfigGeneration(useTheme(), props);

  chartDesignOptions.plugins.legend = {};
  chartDesignOptions.plugins.title.padding = { top: '1rem' };

  return (
    <Pie
      data={chartDataAndDisplayOptions}
      options={chartDesignOptions}
    />
  );
}