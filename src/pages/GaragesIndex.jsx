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

  useEffect(() => {
    // Should require creds
    garagesApi.get('/garages')
      .then((response) => {
        console.log(response)
        console.log(garages)
        setGarages(response.data)
      })
  }, [])

  return (
    <div id='garages-index'>
      <h1>Open Garages</h1>
      <h2>Downtown Denver, CO</h2>
      <div className='minor-charts'>
        {garages.map((garage) =>
          <div key={garage.id} onClick={() => window.location.pathname = '/garages/'+garage.id}>
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