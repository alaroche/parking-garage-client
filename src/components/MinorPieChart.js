import { Pie } from 'react-chartjs-2';
import { chartColors, pgBlue } from "../helpers/colors";
import './MinorPieChart.css';

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
        <div className="minor-pie-chart">
        <Pie
            data={data}
            options={options}
        />
        </div>
    );
}

export default MinorPieChart;
