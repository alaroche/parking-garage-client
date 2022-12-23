// REACT
import React, { useEffect, useState } from 'react'
// PACKAGES
import { Pie } from 'react-chartjs-2'
// HELPERS
import { currentTimeToLocale } from '../helpers/currentTimeToLocale'
import { garagesApi } from '../helpers/garagesApi'
import { generateChartOptions } from '../helpers/chartOptions'
// PLUGINS
import i18n from '../plugins/i18n'
// STYLES
import '../stylesheets/MainCharts.scss'

const garageId = 1 // Default (TODO)

const MainPieChart = (props) => {
  const chartTitle = currentTimeToLocale(i18n.language)

  const [chartDataAndDisplayOptions, chartDesignOptions] = generateChartOptions({...props, chartTitle: chartTitle})
  chartDataAndDisplayOptions.labels = [i18n.t('Taken'), i18n.t('Available')]

  return <Pie className='main-chart' data={chartDataAndDisplayOptions} options={chartDesignOptions} />
}

const MinorPieChart = (props) => {
  let [chartDataAndDisplayOptions, chartDesignOptions] = generateChartOptions(props)

  chartDesignOptions.plugins.legend = {}
  chartDesignOptions.plugins.title.padding = { top: '1rem' }

  return <Pie data={chartDataAndDisplayOptions} options={chartDesignOptions} />
}

export const Charts = () => {
  const initData = { total_spots: 0, total_spots_free: 0, parking_levels: 0 }
  const [data, setData] = useState(initData)

  const [error, setError] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      garagesApi.get(`/garages/${garageId}`)
        .then(response => setData(response.data))
        .catch(error => setError(error.code))
    }, [1000])

    return () => clearInterval(interval)
  }, [garageId])

  if (data.total_spots > 0) {
    return (
      <div>
        <div>
          <MainPieChart numSpotsFree={data.total_spots_free} numSpotsTotal={data.total_spots} />
          <hr className='main-divider' />
          <div className='minor-charts'>
            {Object.keys(data.parking_levels).map((i) =>
              <div key={i}>
                <MinorPieChart
                  chartTitle={data.parking_levels[i].name}
                  numSpotsFree={data.parking_levels[i].spots_free}
                  numSpotsTotal={data.parking_levels[i].total_spots}
                />
              </div>
            )}
          </div>
        </div>
        <address>
          <span><strong>{data['name']}</strong></span>
          <span>{data['address1']}</span>
          {data['address2'] ? <span>{data['address2']}</span> : ''}
          <span>{data['city'] + ', ' + data['state'] + ' ' + data['zip']}</span>
        </address>
      </div>
    )
  } else { <div className='error-msg-charts'>{i18n.t(error)}</div> }
}