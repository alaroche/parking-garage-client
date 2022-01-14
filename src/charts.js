// REACT
import { PropTypes } from 'prop-types';
// PACKAGES
import { Pie } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import i18n from './i18n';
// HELPERS
import { chartConfigGeneration } from './helpers/chartBuilder.js';

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