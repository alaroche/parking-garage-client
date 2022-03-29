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

var DEFAULT_GARAGE_ID = 1

class Charts extends React.Component {
  constructor(props) {
    super(props);
    
    var garageId
    let garageIdFromParam = window.location.pathname.substring(1)

    if (garageIdFromParam) {
      let re = new RegExp(/\d+/g)

      garageId = garageIdFromParam.match(re)[0]
    } else if (localStorage.getItem('jwt')) {
      garageId = localStorage.getItem('garage_id')
    } else {
      garageId = DEFAULT_GARAGE_ID
    }

    this.state = {
      data: [],
      garageId: garageId,
      info: {},
      networkError: false,
    }

    defaults.transitions = true;
  }

  componentDidMount() {
    var { garageId } = this.state

    this.getInfo(garageId);

    setInterval(this.getData(garageId), 30000);
  }

  getData = (garageId) => {
    fetch(`http://aaronhost:8000/garage/${garageId}/availability`)
      .then(response => response.json())
      .then(
        (api_result) => {
          this.setState({ data: api_result })
        })
      .catch(
        (e) => {
          this.setState({ networkError: true });
        })
  }

  getInfo = (garageId) => {
    fetch(`http://aaronhost:8000/garage/${garageId}/profile`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(
        (response) => {
          this.setState({
            info: response.result,
          })
        }
    )
  }

  renderLoadingMsg() {
    var { data, networkError } = this.state;
    var msg = '(' + i18n.t('Loading...') + ')'

    if (networkError) {
      msg = '(' + i18n.t('Service unavailable') + ')'
    } else if (data.detail === 'Not Found') {
      msg = i18n.t('Not Found')
    }

    return msg
  }

  render() {
    var { data, info, networkError } = this.state;
    var { currentTheme } = this.props;

    var { total_spots, total_spots_free, parking_levels } = data;

    if (!networkError && data.success) {
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
              <br />{info['city'] + ', ' + info['state'] + ' ' + info['zip']}
            </address>
            :
            ''}
        </div>
      );
    } else {
      return (
        <div>
          <div className='rendering-msg'>
            {this.renderLoadingMsg()}
          </div>
          <hr className={themeableClassName('main-divider', currentTheme)} />
        </div>
      );
    }
  }
}

export default Charts;