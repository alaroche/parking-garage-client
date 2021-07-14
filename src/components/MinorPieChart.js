import { Pie } from 'react-chartjs-2';
import { chartColors, pgBlue } from "../helpers/colors";
import React from 'react';

const style = {
  width: '6rem',
  height: '6rem'
}

// TODO: Pass down width/height size dimensions from the parent
class MinorPieChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      options: null,
    }
  }

  componentDidMount() {
    var { name, total_spots, spots_free } = this.props;

    var spots_taken = total_spots - spots_free;
    var data = {
      maintainAspectRatio: false,
      responsive: false,
      datasets: [
        {
          data: [spots_taken, spots_free],
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors
        }
      ]
    };

    var options = {
      plugins: {
        title: {
          display: true,
          text: name,
          color: pgBlue,
          padding: {
            top: '1rem',
          }
        }
      },
      elements: {
        arc: {
          borderWidth: 2,
          borderColor: pgBlue,
        }
      }
    };

    this.setState({
      data: data,
      options: options,
    })
  }

  render() {
    var {data, options} = this.state;

    return (
      <div style={style}>
        <Pie
          data={data}
          options={options}
        />
      </div>
    );
  }
}

export default MinorPieChart;
