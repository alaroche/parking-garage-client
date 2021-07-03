import MainPieChart from "./components/MainPieChart"
import MinorPieChart from './components/MinorPieChart';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <header className="header">
        <img src={logo} className="header__logo" alt="logo" />
        <div className="header__title">Available Parking</div>
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
