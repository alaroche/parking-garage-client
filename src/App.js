import MainPieChart from "./components/MainPieChart"
import MinorPieChart from './components/MinorPieChart';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <div>
          <img src={logo} className="App__header__logo" alt="logo" />
          <div>Available Parking</div>
        </div>
      </header>
      <div className="App__main-pie-graph">
        <MainPieChart />
      </div>
      <hr />
      <div className="App__minor-pie-graphs">
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
