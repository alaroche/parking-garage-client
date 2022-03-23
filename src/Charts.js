// REACT
import React from 'react';
// PACKAGES
import { defaults } from 'react-chartjs-2';
import i18n from './i18n';
// HELPERS
import { currentTimeToLocale } from './helpers/currentTime';
import themeableClassName from './helpers/themeableClassName';
// COMPONENTS
import { MainPieChart, MinorPieChart } from './charts-lib';
// STYLES
import './stylesheets/Charts.scss';

class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: null,
      info: {},
      isLoaded: false,
    }

    defaults.transitions = true;
  }

  componentDidMount() {
    this.getInfo();

    setInterval(this.getData(), 30000);
  }

  getData = () => {
    fetch('http://aaronhost:8000/garage/availability')
      .then(response => response.json())
      .then(
        (api_result) => {
          this.setState({ data: api_result, isLoaded: true })
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  getInfo = () => {
    fetch(`http://aaronhost:8000/user/profile`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(
        (response) => {
          this.setState({
            info: response.result,
          })
        },
      )
  }

  render() {
    var { data, error, info, isLoaded } = this.state;
    var { currentTheme } = this.props;

    var { total_spots, total_spots_free, parking_levels } = data;

    if (!error && isLoaded) {
      return (
        <div>
          <div className={themeableClassName('main-chart', currentTheme)}>
            <MainPieChart
              chartTitle={currentTimeToLocale(i18n.language)}
              numSpotsFree={total_spots_free}
              numSpotsTotal={total_spots}
            />
          </div>
          <hr className={themeableClassName('main-divider', currentTheme)} />
          <div className='minor-charts'>
            {Object.keys(parking_levels).map((i) =>
              <div className='minor-charts__chart' key={i}>
                <MinorPieChart
                  chartTitle={parking_levels[i].name}
                  numSpotsFree={parking_levels[i].spots_free}
                  numSpotsTotal={parking_levels[i].total_spots}
                />
              </div>
            )}
          </div>
          {info ?
            <address>
              <strong>{info['name']}</strong>
              <br />{info['address1']}
              {info['address2'] ?
                <span>
                  <br />{info['address2']}
                </span>
                :
                ''
              }
              <br />{info['city'] +', ' + info['state'] + ' ' + info['zip']}
            </address>
            :
            ''}
        </div>
      );
    } else {
      return (
        <div>
          <div className='rendering-msg'>
            ({error && error.message ? i18n.t('Service unavailable') : i18n.t('Loading...')})
          </div>
          <hr className={themeableClassName('main-divider', currentTheme)}/>
        </div>
      );
    }
  }
}

export default Charts;