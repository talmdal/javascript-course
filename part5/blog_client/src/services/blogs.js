import axios from 'axios'
import { getStorageUser } from './storageUser.js'

const baseUrl = import.meta.env.VITE_BLOG_SERVER_URL

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`)
  return request.then(response => response.data)
}

const create = (newObject) => {
  const token = getStorageUser().token
  return axios
    .post(`${baseUrl}/blogs`, newObject, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('Person added:', response)
      return response.data
    })
}

const destroy = (id) => {
  const token = getStorageUser().token
  return axios
    .delete(`${baseUrl}/blogs/${id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log('Person deleted:', response)
      return response.data
    })
}

export default { getAll, create, destroy }