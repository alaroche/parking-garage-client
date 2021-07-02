import { Pie } from 'react-chartjs-2';
import { chartColors, pgBlue } from "../helpers/colors";

const options = {
  plugins: {
    title: {
      display: true,
      text: 'Level 1',
      color: pgBlue,
    }
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: pgBlue,
    }
  }
};

const data = {
  maintainAspectRatio: false,
  responsive: false,
  datasets: [
    {
      data: [100 - 37, 37],
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
