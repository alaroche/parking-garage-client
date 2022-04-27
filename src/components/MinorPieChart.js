// REACT
import { PropTypes } from 'prop-types'
// PACKAGES
import { Pie } from 'react-chartjs-2'
import { useTheme } from '@mui/material/styles'
// HELPERS
import { generateChartConfig } from '../helpers/chartBuilder.js'

export default function MinorPieChart(props) {
  var [chartDataAndDisplayOptions, chartDesignOptions] = generateChartConfig(useTheme(), props)

  chartDesignOptions.plugins.legend = {}
  chartDesignOptions.plugins.title.padding = { top: '1rem' }

  return (
    <Pie
      data={chartDataAndDisplayOptions}
      options={chartDesignOptions}
    />
  )
}

MinorPieChart.propTypes = {
  chartTitle: PropTypes.string.isRequired,
  numSpotsFree: PropTypes.number.isRequired,
  numSpotsTotal: PropTypes.number.isRequired,
}