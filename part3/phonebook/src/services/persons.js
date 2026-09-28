import axios from 'axios'

const PORT = import.meta.env.VITE_PHONEBOOK_PORT  || 3001
const baseUrl = `http://localhost:${PORT}/api/persons`

console.log('Server url: ', baseUrl)

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
