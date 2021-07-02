import logo from './logo.svg';
import './App.css';
import MainPieChart from "./components/MainPieChart"
import MinorPieChart from './components/MinorPieChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <div>Available Parking</div>
        </div>
      </header>
      <div className="main-pie-graph">
        <MainPieChart />
      </div>
      <hr />
      <div className="minor-pie-graphs">
        <MinorPieChart />
        <MinorPieChart />
        <MinorPieChart />
        <MinorPieChart />
        <MinorPieChart />
      </div>
    </div>
  );
}

export default App;
