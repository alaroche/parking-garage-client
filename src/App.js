import MainPieChart from "./components/MainPieChart";
import MinorPieChart from './components/MinorPieChart';
import logo from './images/logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availability: [],
      error: null,
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/availability")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            availability: result,
            isLoaded: true
          })
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {
    var { availability, error, isLoaded } = this.state;
    var { total_spots, total_spots_free, levels } = availability;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <header className="header">
            <img src={logo} className="header__logo" alt="logo" />
            <div className="header__title">Available Parking</div>
          </header>
          <div className="main-pie-chart">
            <MainPieChart spots_free={total_spots_free} total_spots={total_spots} />
          </div>
          <hr />
          <div className="minor-pie-charts">
            {Object.keys(levels).map((i) =>
              <MinorPieChart
                name={levels[i].name}
                spots_free={levels[i].spots_free}
                total_spots={levels[i].total_spots}
              />
            )}
          </div>
        </div>
      );
    }
  }
}

export default App;
