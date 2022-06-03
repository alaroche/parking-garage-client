// REACT
import React, { useEffect, useState } from 'react'
// PLUGINS
import axios from 'axios'
// PACKAGES
import i18n from '../plugins/i18n'
// COMPONENTS
import { MainPieChart, MinorPieChart } from '../components/pie-charts'
// STYLES
import '../stylesheets/Charts.scss'

export const Charts = (props) => {
  const initData = { total_spots: 0, total_spots_free: 0, parking_levels: 0 }
  const [data, setData] = useState(initData)
  const { total_spots, total_spots_free, parking_levels } = data

  const [error, setError] = useState('')

  const [profile, setProfile] = useState()

  const garageId = 1 // Default

  useEffect(() => {
    const getProfile = async () => {
      await axios.get(`http://aaronhost:8000/garage/${garageId}/profile`)
        .then(response => setProfile(response.data))
    }

    const getData = async () => {
      await axios.get(`http://aaronhost:8000/garage/${garageId}/availability`)
        .then(response => { setData(response.data) })
        .catch(response => setError(response.code))
    }

    getData()
    getProfile()

    setInterval(async () => { await getData() }, 30000)
  }, [garageId])

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

  return (
    <div>
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
      {profile ?
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
        : ''}
    </div>
  )
}