import { pieChartColors, pieChartColorsDark, chartTextAndOutlineColor, chartTextAndOutlineColorDark } from "./colors";

export function getColorsFromMode(theme) {
  var chartColors, chartTextAndOutlineColors;

  if (theme.className !== 'dark-mode') {
    [chartColors, chartTextAndOutlineColors] = [pieChartColors, chartTextAndOutlineColor]
  }
  else {
    [chartColors, chartTextAndOutlineColors] = [pieChartColorsDark, chartTextAndOutlineColorDark]
  }

  return [chartColors, chartTextAndOutlineColors];
}

export function chartConfigGeneration(theme, props) {
    var { chartTitle, total_spots, spots_free } = props;
    var [chartColors, chartTextAndOutlineColors] = getColorsFromMode(theme);
  
    var chartDataAndDisplayOptions = {
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          data: [total_spots - spots_free, spots_free],
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors
        }
      ]
    };
  
    var chartDesignOptions = {
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
  
    return [chartDataAndDisplayOptions, chartDesignOptions];
  }