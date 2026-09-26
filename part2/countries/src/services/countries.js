import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

export const getAll = () => {
  return axios.get(`${baseUrl}api/all`)
    .then(response => {
      console.log('Fetched countries:', response)
      return response.data
    })
}

export const get = (name) => {
  return axios.get(`${baseUrl}/api/name/${name}`)
    .then(response => response.data)
}
