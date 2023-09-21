import axios from 'axios'

// const mockUrl = 'http://127.0.0.1:4523/m1/3082882-0-default'
const prodUrl = 'http://10.251.255.79:8081/api'
const devUrl = 'http://127.0.0.1:8000/api'

const backend = axios.create({
  // baseURL: mockUrl,
  // baseURL: devUrl,
  baseURL: prodUrl,
  timeout: 10000
  // withCredentials: true
})

export { backend }
