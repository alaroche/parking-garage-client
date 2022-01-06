import { chartConfigGeneration } from '../helpers/chartBuilder.js';
import { Pie } from 'react-chartjs-2';
import React from 'react';
import { useTheme } from '@mui/material/styles';

export default function MainPieChart(props) {
  var [chartDataAndDisplayOptions, chartDesignOptions] = chartConfigGeneration(useTheme(), props);

  chartDataAndDisplayOptions.labels = ["Taken", "Available"];

  return (
    <Pie
      data={chartDataAndDisplayOptions}
      options={chartDesignOptions}
    />
  );
}