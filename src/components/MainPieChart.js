import { chartColors, pgBlue } from "../helpers/colors";
import { extended } from "../helpers/datetimeFormats.js"
import { Pie } from 'react-chartjs-2';

const currentTime = new Date().toLocaleDateString('en-US', extended);

const options = {
  plugins: {
    legend: {
      color: pgBlue,
      position: 'bottom'
    },
    title: {
      color: pgBlue,
      display: true,
      fontWeight: 'normal',
      text: currentTime,
    }
  },
  elements: {
    arc: {
      borderColor: pgBlue,
      borderWidth: 2
    }
  }
};

const data = {
  maintainAspectRatio: false,
  responsive: false,
  labels: ["Taken", "Available"],
  datasets: [
    {
      data: [100 - 37, 37],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors
    }
  ]
};

function MainPieChart() {
  return (
    <Pie
      data={data}
      options={options}
    />
  );
}

export default MainPieChart;
