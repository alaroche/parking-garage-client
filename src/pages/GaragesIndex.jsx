// REACT
import React, { useEffect, useState } from 'react'
// HELPERS
import { garagesApi } from '../helpers/garagesApi'
// COMPONENTS
import { MinorPieChart } from './MainCharts'
// STYLES
import '../stylesheets/GaragesIndex.scss'

export const GaragesIndex = () => {
  const [garages, setGarages] = useState([])

  if (!localStorage.getItem('jwt')) { window.location.pathname = '/' }

  useEffect(() => {
    localStorage.getItem('jwt') ? '' : window.location.href = '/'

    garagesApi.get('/garages').then(response => { setGarages(response.data) })
  }, [])

  if (garages.length > 0) {
    const { city, state } = garages[0]['place']

    return (
      <div id='garages-index'>
        <h1>Open Garages</h1>
        <h2>Downtown {city + ', ' + state}</h2>
        <div className='minor-charts'>
          {garages.map((garage) =>
            <div key={garage.id} onClick={() => window.location.pathname = '/garages/' + garage.id}>
              <MinorPieChart
                chartTitle={garage.place.name}
                subTitle={garage.place.address1}
                numSpotsFree={garage.spots_free}
                numSpotsTotal={garage.total_spots}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}