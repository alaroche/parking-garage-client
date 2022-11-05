export const generateChartOptions = (colors, props) => {
  const { chartTitle, numSpotsFree, numSpotsTotal } = props
  const [chartColors, chartTextAndOutlineColors] = [[colors.chartPrimary, colors.chartSecondary], colors.font]

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