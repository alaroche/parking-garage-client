import { chartColors } from "../helpers/colors";
import { extended } from "../helpers/datetimeFormats.js"
import { Pie } from 'react-chartjs-2';

const currentTime = new Date().toLocaleDateString('en-US', extended);

const options = {
  plugins: {
    legend: {
      color: '#233e94',
      position: 'bottom'
    },
    title: {
      color: '#233e94',
      display: true,
      fontWeight: 'normal',
      text: currentTime,
    }
  },
  elements: {
    arc: {
      borderColor: '#233e94',
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
    <Pie data={data} options={options} />
  );
}

export default MainPieChart;
