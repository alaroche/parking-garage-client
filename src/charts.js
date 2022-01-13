import { Pie } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { chartConfigGeneration } from './helpers/chartBuilder.js';
import i18n from './i18n';

export function MainPieChart(props) {
  var [chartDataAndDisplayOptions, chartDesignOptions] = chartConfigGeneration(useTheme(), props);

  chartDataAndDisplayOptions.labels = [i18n.t('Taken'), i18n.t('Available')];

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