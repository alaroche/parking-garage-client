import { Pie } from 'react-chartjs-2';
import './App.css';
import { chartColors } from "./colors";

const mainOptions = {
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Free Parking',
    }
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: 'darkblue',
    }
  }
};

const options = {
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Level 1',
    }
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: 'darkblue',
    }
  }
};

const mainData = {
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span>Welcome to Parking Garage</span>
      </header>
      <div className="main-pie-graph">
        <Pie data={mainData} options={mainOptions} />
      </div>
      <hr />
      <div className="minor-pie-graphs">
        <Pie data={data} options={options} />
        <Pie data={data} options={options} />
        <Pie data={data} options={options} />
        <Pie data={data} options={options} />
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default App;
