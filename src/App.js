import MainPieChart from "./components/MainPieChart";
import MinorPieChart from './components/MinorPieChart';
import logo from './images/logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <header className="header">
          <img src={logo} className="header__logo" alt="logo" />
          <div className="header__title">Available Parking</div>
        </header>
        <div className="main-pie-chart">
          <MainPieChart />
        </div>
        <hr />
        <div className="minor-pie-charts">
          <MinorPieChart />
          <MinorPieChart />
          <MinorPieChart />
          <MinorPieChart />
          <MinorPieChart />
        </div>
      </div>
    );
  }
}

export default App;
