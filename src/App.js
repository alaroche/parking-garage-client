import React from 'react';
import { defaults } from 'react-chartjs-2';
import { withCookies } from 'react-cookie';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { MainPieChart, MinorPieChart } from './charts';
import { currentTime } from './helpers/currentTime';
import themeableClassName from './helpers/themeableClassName';
import { defaultTheme, darkTheme } from './helpers/themes';
import './stylesheets/App.scss';
import logo from './logo.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    var themeFromCookie = (this.props.cookies.get('pg-theme') !== 'dark-mode' ? this.setDefaultTheme() : this.setDarkTheme());

    this.state = {
      data: [],
      currentTheme: themeFromCookie,
      error: null,
      isLoaded: false,
    }

    defaults.transitions = true;
  }

  componentDidMount() {
    setInterval(this.getData(), 30000);
  }

  getData = () => {
    fetch('http://127.0.0.1:8000/availability')
      .then(r => r.json())
      .then(
        (api_result) => {
          this.setState({
            data: api_result,
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
      <header className={themeableClassName('header', currentTheme)}>
        <div className='header__contents'>
          <img src={logo} className={themeableClassName('header__logo', currentTheme)} alt='logo' />
          <div className='header__title'>Available Parking</div>
        </div>
        <IconButton
          onClick={() => this.toggleTheme()}
        >
          {currentTheme.themeToggleIcon}
        </IconButton>
      </header>
    )
  }

  setDefaultTheme = () => {
    const { cookies } = this.props;

    document.body.classList.remove(darkTheme.className)
    cookies.set('pg-theme', defaultTheme.className, { path: '/' });

    return defaultTheme;
  }

  setDarkTheme = () => {
    const { cookies } = this.props;

    document.body.classList.add(darkTheme.className);
    cookies.set('pg-theme', darkTheme.className, { path: '/' });

    return darkTheme;
  }

  toggleTheme = () => {
    var { currentTheme } = this.state;

    defaults.transitions = false;

    this.setState({ currentTheme: currentTheme !== darkTheme ? this.setDarkTheme() : this.setDefaultTheme() });
  }

  render() {
    var { currentTheme, data, error, isLoaded } = this.state;
    var { total_spots, total_spots_free, parking_levels } = data;

    if (!error && isLoaded) {
      return (
        <ThemeProvider theme={currentTheme}>
          {this.renderHeader(currentTheme)}
          <div className={themeableClassName('main-chart', currentTheme)}>
            <MainPieChart
              chartTitle={currentTime}
              spots_free={total_spots_free}
              total_spots={total_spots}
            />
          </div>
          <hr className={themeableClassName('main-divider', currentTheme)}/>
          <div className='minor-charts'>
            {Object.keys(parking_levels).map((i) =>
              <div className='minor-charts__chart' key={i}>
                <MinorPieChart
                  chartTitle={parking_levels[i].name}
                  spots_free={parking_levels[i].spots_free}
                  total_spots={parking_levels[i].total_spots}
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
          <div className='rendering-msg'>
            {error && error.message ? '(Service unavailable)' : 'Loading...'}
          </div>
          <hr />
        </div>
      );
    }
  }
}

export default withCookies(App);