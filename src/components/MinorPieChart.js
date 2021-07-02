import { Pie } from 'react-chartjs-2';
import { chartColors } from "../colors";

const options = {
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Level 1',
      color: '#233e94',
    }
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: '#233e94',
    }
  }
};

const data = {
  maintainAspectRatio: false,
  responsive: false,
  datasets: [
    {
      data: [100 - 28, 28],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors
    }
  ]
};

function MinorPieChart() {
  return (
    <Pie data={data} options={options} />
  );
}

export default MinorPieChart;
