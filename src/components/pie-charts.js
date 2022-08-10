// REACT
import React, { useContext } from 'react'
// PACKAGES
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import i18n from '../plugins/i18n'
// HELPERS
import { generateChartConfig } from '../helpers/chartBuilder.js'
import { ThemeContext } from '../helpers/ThemeContext'

export const MainPieChart = (props) => {
  const { colors } = useContext(ThemeContext)

  const [chartDataAndDisplayOptions, chartDesignOptions] = generateChartConfig(colors, props)
  chartDataAndDisplayOptions.labels = [i18n.t('Taken'), i18n.t('Available')]

  return (
    <Pie
      data={chartDataAndDisplayOptions}
      options={chartDesignOptions}
    />
  )
}

export const MinorPieChart = (props) => {
  const { colors } = useContext(ThemeContext)

  let [chartDataAndDisplayOptions, chartDesignOptions] = generateChartConfig(colors, props)

  chartDesignOptions.plugins.legend = {}
  chartDesignOptions.plugins.title.padding = { top: '1rem' }

  return (
    <Pie
      data={chartDataAndDisplayOptions}
      options={chartDesignOptions}
    />
  )
}