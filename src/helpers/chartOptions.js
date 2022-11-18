import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export const generateChartOptions = (props) => {
  const { theme } = useContext(ThemeContext)
  const { chartTitle, numSpotsFree, numSpotsTotal } = props
  const [chartColors, chartTextAndOutlineColors] = [[theme.chartColors.chartPrimary, theme.chartColors.chartSecondary], theme.chartColors.font]

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