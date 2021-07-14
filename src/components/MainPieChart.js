import { chartColors, pgBlue } from "../helpers/colors";
import { extended } from "../helpers/datetimeFormats.js"
import { Pie } from 'react-chartjs-2';

const currentTime = new Date().toLocaleDateString('en-US', extended);

function buildData(spots_free, total_spots) {
  var spots_taken = total_spots - spots_free;

  var data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ["Taken", "Available"],
    datasets: [
      {
        data: [spots_taken, spots_free],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  };
  return data;
}

function MainPieChart(props) {
  var { spots_free, total_spots } = props;

  return (
    <Pie
      data={buildData(spots_free, total_spots)}
      options={options}
    />
  );
}

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

export default MainPieChart;
