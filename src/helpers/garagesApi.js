import axios from 'axios'

export const jwt = localStorage.getItem('jwt')

export const garagesApi = axios.create({
  baseURL: process.env.REACT_APP_PG_SERVER_DOMAIN,
})

if (jwt) {
  garagesApi.defaults.headers = {
    'Authorization': 'Bearer ' + jwt,
  }
}
