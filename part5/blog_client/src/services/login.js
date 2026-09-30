import axios from 'axios'
const baseUrl = import.meta.env.VITE_BLOG_SERVER_URL

const login = (username, password) => {
  const request = axios
    .post(`${baseUrl}/login`, { username, password })
  return request.then(response => response.data)
}

export default { login }