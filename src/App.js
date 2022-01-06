import React from 'react';
import MainPieChart from "./components/MainPieChart";
import MinorPieChart from './components/MinorPieChart';
import { currentTime } from './helpers/currentTime';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from "@mui/material/IconButton";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { defaults } from "react-chartjs-2";
import logo from './images/logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availability: [],
      currentTheme: defaultTheme,
      error: null,
      isLoaded: false,
    }

    defaults.transitions = true;
  }

  componentDidMount() {
    setInterval(this.getData(), 30000);
  }

  getData = () => {
    fetch("http://127.0.0.1:8000/availability")
      .then(r => r.json())
      .then(
        (api_result) => {
          this.setState({
            availability: api_result,
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

  renderHeader() {
    var { currentTheme } = this.state;

    return (
      <header className={"header header--" + currentTheme.className}>
        <div className='header__contents'>
          <img src={logo} className={"header__logo header__logo--" + currentTheme.className} alt="logo" />
          <div className="header__title">Available Parking</div>
        </div>
        <IconButton
          onClick={() => this.toggleTheme()}
        >
          {currentTheme.themeToggleIcon}
        </IconButton>
      </header>
    )
  }

  toggleTheme = () => {
    var { currentTheme } = this.state;
    var newTheme;

    defaults.transitions = false;

    if (currentTheme === darkTheme) {
      document.body.classList.remove(darkTheme.className);
      newTheme = defaultTheme;
    } else {
      document.body.classList.add(darkTheme.className)
      newTheme = darkTheme;
    }

    this.setState({ currentTheme: newTheme });
  }

  render() {
    var { currentTheme, availability, error, isLoaded } = this.state;
    var { total_spots, total_spots_free, levels } = availability;

    //console.log('render');

    if (!error && isLoaded) {
      return (
        <ThemeProvider theme={currentTheme}>
          {this.renderHeader(currentTheme)}
          <div className={"main-chart main-chart--" + currentTheme.className}>
            <MainPieChart
              chartTitle={currentTime}
              spots_free={total_spots_free}
              total_spots={total_spots}
            />
          </div>
          <hr className={"main-divider main-divider--" + currentTheme.className} />
          <div className="minor-charts">
            {Object.keys(levels).map((i) =>
              <div className="minor-charts__chart" key={i}>
                <MinorPieChart
                  isInDarkMode={currentTheme.className === darkTheme.className}
                  chartTitle={levels[i].name}
                  spots_free={levels[i].spots_free}
                  total_spots={levels[i].total_spots}
                />
              </div>
            )}
          </div>
        </ThemeProvider>
      );
    } else {
      return (
        <div>
          {this.renderHeader(currentTheme)}
          <div className="rendering-msg">
            {error && error.message ? '(Service unavailable)' : 'Loading...'}
          </div>
          <hr />
        </div>
      );
    }
  }
}

// TODO: Soft code color values maybe with scss
export const defaultTheme = createTheme({
  className: "default-mode",
  themeToggleIcon: <Brightness3Icon htmlColor="#233e94" />,
});

export const darkTheme = createTheme({
  className: 'dark-mode',
  themeToggleIcon: <Brightness7Icon htmlColor="#829ab1" />,
});

export default App;
