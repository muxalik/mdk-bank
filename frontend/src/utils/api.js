import axios from 'axios'

const api = axios.create()

export const baseURL = 'http://localhost:8000/api'

;(async function () {
  try {
    const response = await axios.get('/sanctum/csrf-cookie', {
      baseURL: 'http://localhost:8000',
    })

    api.defaults.baseURL = baseURL
    api.defaults.headers.common['X-CSRF-TOKEN'] = response.data.csrf_token
  } catch (error) {
    console.error('Error fetching CSRF token:', error)
  }
})()

export default api
