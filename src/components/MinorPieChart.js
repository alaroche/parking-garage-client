import { chartConfigGeneration } from '../helpers/chartBuilder.js';
import { Pie } from 'react-chartjs-2';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export default function MinorPieChart(props) {
  var [chartDataAndDisplayOptions, chartDesignOptions] = chartConfigGeneration(useTheme(), props);

  chartDesignOptions.plugins.legend = {};
  chartDesignOptions.plugins.title.padding = {top: '1rem'};

  return (
    <Pie
      data={chartDataAndDisplayOptions}
      options={chartDesignOptions}
    />
  );
}