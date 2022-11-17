// REACT
import React, { useContext } from 'react'
// PACKAGES
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import i18n from '../plugins/i18n'
// HELPERS
import { generateChartOptions } from '../helpers/chartOptions.js'
import { ThemeContext } from '../helpers/ThemeContext'

export const MainPieChart = (props) => {
  const { theme } = useContext(ThemeContext)

  const [chartDataAndDisplayOptions, chartDesignOptions] = generateChartOptions(theme.chartColors, props)
  chartDataAndDisplayOptions.labels = [i18n.t('Taken'), i18n.t('Available')]

  return (
    <Pie
      data={chartDataAndDisplayOptions}
      options={chartDesignOptions}
    />
  )
}

export const MinorPieChart = (props) => {
  const { theme } = useContext(ThemeContext)

  let [chartDataAndDisplayOptions, chartDesignOptions] = generateChartOptions(theme.chartColors, props)

  chartDesignOptions.plugins.legend = {}
  chartDesignOptions.plugins.title.padding = { top: '1rem' }

  return (
    <Pie
      data={chartDataAndDisplayOptions}
      options={chartDesignOptions}
    />
  )
}