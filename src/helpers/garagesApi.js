import axios from 'axios'

export const jwt = localStorage.getItem('jwt')

export const garagesApi = axios.create({
  baseURL: 'http://localhost:8000',
})

if (jwt) {
  garagesApi.defaults.headers = {
    'Authorization': 'Bearer ' + jwt,
  }
}
