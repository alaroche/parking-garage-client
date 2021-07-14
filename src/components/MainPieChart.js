import { chartColors, pgBlue } from "../helpers/colors";
import { currentTime } from "../helpers/currentTime.js"
import { Pie } from 'react-chartjs-2';
import React from 'react';

class MainPieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: null }
  }

  componentDidMount() {
    var { total_spots, spots_free } = this.props;

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

    this.setState({
      data: data
    });
  }

  render() {
    var { data } = this.state;

    return (
      <Pie
        data={data}
        options={options}
      />
    );
  }
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
