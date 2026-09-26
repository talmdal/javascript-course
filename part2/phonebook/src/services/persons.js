
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
    .then(response => response.data)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
    .then(response => {
      console.log('Person added:', response)
      return response.data
    })
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
    .then(response => {
      console.log('Person update response:', response)
      response.data
    })
}

const destroy = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => {
      console.log('Person deleted:', response)
      return response.data
    })
}

export default { getAll, create, update, destroy }