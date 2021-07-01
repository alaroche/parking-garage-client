import logo from './logo.svg';
import { Pie } from 'react-chartjs-2';
import './App.css';
import { chartColors } from "./colors";

const currentTime = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })

const mainOptions = {
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Available Parking as of ' + currentTime,
    }
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: '#233e94',
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
      borderColor: '#233e94',
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
        <img src={logo} className="App-logo" alt="logo" />
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
