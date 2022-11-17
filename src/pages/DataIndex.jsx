// REACT
import React, { useContext, useEffect, useState } from 'react'
// PACKAGES
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import i18n from '../plugins/i18n'
// HELPERS
import { generateChartOptions } from '../helpers/chartOptions.js'
import { ThemeContext } from '../helpers/ThemeContext'
import axios from 'axios'
// STYLES
import '../stylesheets/DataIndex.scss'

const garageId = 1 // Default

export const ProfileInfo = (props) => {
  const [profile, setProfile] = useState()
  const { garageId } = props

  useEffect(() => {
    axios.get(`http://aaronhost:8000/garage/${garageId}/profile`)
      .then(response => setProfile(response.data))
  }, [])

  if (profile) {
    return (
      <address>
        <strong>{profile['name']}</strong>
        <br />{profile['address1']}
        {profile['address2'] ?
          <span>
            <br />{profile['address2']}
          </span>
          :
          ''
        }
        <br />{profile['city'] + ', ' + profile['state'] + ' ' + profile['zip']}
      </address>
    )
  }
}

const Charts = () => {
  const initData = { total_spots: 0, total_spots_free: 0, parking_levels: 0 }
  const [data, setData] = useState(initData)
  const { total_spots, total_spots_free, parking_levels } = data

  const [error, setError] = useState('')

  const getData = () => {
    axios.get(`http://aaronhost:8000/garage/${garageId}/availability`)
      .then(response => setData(response.data))
      .catch(error => setError(error.code))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getData()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (data.total_spots === initData.total_spots) {
    getData()
  }

  const currentTimeToLocale = (lng) => {
    return new Date().toLocaleDateString(lng, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    })
  }

  const MainPieChart = (props) => {
    const { theme } = useContext(ThemeContext)

    const [chartDataAndDisplayOptions, chartDesignOptions] = generateChartOptions(theme.chartColors, props)
    chartDataAndDisplayOptions.labels = [i18n.t('Taken'), i18n.t('Available')]

    return (
      <Pie
        data={chartDataAndDisplayOptions}
        options={chartDesignOptions}
      />
    )
  }

  const MinorPieChart = (props) => {
    const { theme } = useContext(ThemeContext)

    let [chartDataAndDisplayOptions, chartDesignOptions] = generateChartOptions(theme.chartColors, props)

    chartDesignOptions.plugins.legend = {}
    chartDesignOptions.plugins.title.padding = { top: '1rem' }

    return (
      <Pie
        data={chartDataAndDisplayOptions}
        options={chartDesignOptions}
      />
    )
  }

  return (
    <>
      {data.total_spots > 0 ?
        <div>
          <div className='main-chart'>
            <MainPieChart
              chartTitle={currentTimeToLocale(i18n.language)}
              numSpotsFree={total_spots_free}
              numSpotsTotal={total_spots}
            />
          </div>
          <hr className='main-divider' />
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
        </div>
        : <div className='error-msg-charts'>{i18n.t(error)}</div>
      }
    </>
  )
}

export const DataIndex = () => {
  return (
    <>
      <Charts />
      <ProfileInfo garageId={garageId} />
    </>
  )
}