// REACT
import React, { useEffect, useState } from 'react'
// PACKAGES
import axios from 'axios'
import 'chart.js/auto'
import i18n from '../plugins/i18n'
import { Pie } from 'react-chartjs-2'
// HELPERS
import { currentTimeToLocale } from '../helpers/currentTimeToLocale'
import { generateChartOptions } from '../helpers/chartOptions.js'
// STYLES
import '../stylesheets/MainCharts.scss'

const garageId = 1 // Default (TODO)

export const ProfileInfo = () => {
  const initData = {'name': '', 'address1': '', 'address2': '', 'city': '', 'state': '', 'zip': ''}
  const [profile, setProfile] = useState(initData)

  useEffect(() => {
    axios.get(`http://aaronhost:8000/garage/${garageId}/profile`)
      .then(response => setProfile(response.data))
  }, [])

  if (profile) {
    return (
      <address>
        <span><strong>{profile['name']}</strong></span>
        <span>{profile['address1']}</span>
        {profile['address2'] ? <span>{profile['address2']}</span> : ''}
        <span>{profile['city'] + ', ' + profile['state'] + ' ' + profile['zip']}</span>
      </address>
    )
  }
}

const MainPieChart = (props) => {
  const chartTitle = currentTimeToLocale(i18n.language)

  const [chartDataAndDisplayOptions, chartDesignOptions] = generateChartOptions({...props, chartTitle: chartTitle})
  chartDataAndDisplayOptions.labels = [i18n.t('Taken'), i18n.t('Available')]

  return <Pie data={chartDataAndDisplayOptions} options={chartDesignOptions} />
}

const MinorPieChart = (props) => {
  let [chartDataAndDisplayOptions, chartDesignOptions] = generateChartOptions(props)

  chartDesignOptions.plugins.legend = {}
  chartDesignOptions.plugins.title.padding = { top: '1rem' }

  return <Pie data={chartDataAndDisplayOptions} options={chartDesignOptions} />
}

const Charts = () => {
  const initData = { total_spots: 0, total_spots_free: 0, parking_levels: 0 }
  const [data, setData] = useState(initData)

  const [error, setError] = useState('')

  useEffect(() => {
    axios.get(`http://aaronhost:8000/garage/${garageId}/availability`)
      .then(response => setData(response.data))
      .catch(error => setError(error.code))
  }, [garageId])

  if (data.total_spots > 0) {
    return (
      <div>
        <div className='main-chart'>
          <MainPieChart numSpotsFree={data.total_spots_free} numSpotsTotal={data.total_spots} />
        </div>
        <hr className='main-divider' />
        <div className='minor-charts'>
          {Object.keys(data.parking_levels).map((i) =>
            <div className='minor-charts__chart' key={i}>
              <MinorPieChart
                chartTitle={data.parking_levels[i].name}
                numSpotsFree={data.parking_levels[i].spots_free}
                numSpotsTotal={data.parking_levels[i].total_spots}
              />
            </div>
          )}
        </div>
      </div>
    )
  } else { <div className='error-msg-charts'>{i18n.t(error)}</div> }
}

export const MainCharts = () => { return ( <> <Charts /> <ProfileInfo /> </>) }