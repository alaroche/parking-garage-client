import * as colors from '../stylesheets/colors.module.scss'

export const generateChartConfig = (theme, props) => {
  const { chartTitle, numSpotsFree, numSpotsTotal } = props

  const getColorsFromMode = (theme) => {
    let chartColors, chartTextAndOutlineColors

    if (theme.className === 'dark-mode') {
      [chartColors, chartTextAndOutlineColors] = [[colors.default.pieChartPrimaryDarkMode, colors.default.pieChartSecondaryDarkMode], colors.default.fontDarkMode]
    }
    else {
      [chartColors, chartTextAndOutlineColors] = [[colors.default.pieChartPrimaryDefault, colors.default.pieChartSecondaryDefault], colors.default.fontDefault]
    }

    return [chartColors, chartTextAndOutlineColors]
  }

  const [chartColors, chartTextAndOutlineColors] = getColorsFromMode(theme)

  const chartDataAndDisplayOptions = {
    maintainAspectRatio: false,
    responsive: false,
    datasets: [
      {
        data: [numSpotsTotal - numSpotsFree, numSpotsFree],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  }

  const chartDesignOptions = {
    plugins: {
      legend: {
        color: chartTextAndOutlineColors,
        position: 'bottom',
        labels: {
          color: chartTextAndOutlineColors,
          font: {
            size: '20rem'
          }
        }
      },
      title: {
        color: chartTextAndOutlineColors,
        display: true,
        text: chartTitle,
        font: {
          size: '20rem'
        }
      }
    },
    elements: {
      arc: {
        borderColor: chartTextAndOutlineColors,
        borderWidth: 2
      }
    }
  }

  return [chartDataAndDisplayOptions, chartDesignOptions]
}