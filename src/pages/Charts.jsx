// REACT
import React from 'react'
// PLUGINS
import axios from 'axios'
// PACKAGES
import { defaults } from 'react-chartjs-2'
import i18n from '../plugins/i18n'
// HELPERS
import { currentTimeToLocale } from '../helpers/currentTime'
import themeableClassName from '../helpers/themeableClassName'
// COMPONENTS
import MainPieChart from '../components/MainPieChart'
import MinorPieChart from '../components/MinorPieChart'
// STYLES
import '../stylesheets/Charts.scss'

const DEFAULT_GARAGE_ID = 1

class Charts extends React.Component {
  constructor(props) {
    super(props)
    
    var garageId = DEFAULT_GARAGE_ID
    let garageIdFromParam = window.location.pathname.substring(1)

    if (garageIdFromParam) {
      let re = new RegExp(/\d+/g)

      garageId = garageIdFromParam.match(re)[0]
    } 

    this.state = {
      data: [],
      garageId: garageId,
      info: {},
      networkError: false,
    }

    defaults.transitions = true
  }

  componentDidMount() {
    this.getInfo()
    setInterval(this.getData(), 30000)
  }

  getData = async () => {
    await axios.get(`http://aaronhost:8000/garage/${this.state.garageId}/availability`)
      .then((response) => this.setState({ data: response.data }))
      .catch((error) => {
        if (error.response) {
          this.setState({ networkError: true })
        }
      })
  }

  getInfo = async () => {
    await axios.get(`http://aaronhost:8000/garage/${this.state.garageId}/profile`)
      .then((response) => this.setState({ info: response.data }))
  }

  renderLoadingMsg() {
    var { data, networkError } = this.state
    var msg = '(' + i18n.t('Loading...') + ')'

    if (networkError) {
      msg = '(' + i18n.t('Service unavailable') + ')'
    } else if (data.detail === 'Not Found') {
      msg = i18n.t('Not Found')
    }

    return msg
  }

  render() {
    var { data, info, networkError } = this.state
    var { currentTheme } = this.props

    var { total_spots, total_spots_free, parking_levels } = data

    if (!networkError && data.parking_levels) {
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
      )
    } else {
      return (
        <div>
          <div className='rendering-msg'>
            {this.renderLoadingMsg()}
          </div>
          <hr className={themeableClassName('main-divider', currentTheme)} />
        </div>
      )
    }
  }
}

export default Charts