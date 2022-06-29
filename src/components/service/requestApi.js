import { LOCAL_STORAGE } from '../constant/localStorage'
import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 10000,
})

instance.interceptors.request.use(
  (configs) => {
    const tokenAccess = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
    if (tokenAccess) {
      configs.headers['Authorization'] = `Bearer ${tokenAccess}`
    }
    return configs
  },
  async (error) => {
    await Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (configs) => {
    return configs
  },
  async (error) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
    if (error.response.status === 401 && accessToken) {
      localStorage.clear()
    }
    return await Promise.reject(error)
  },
)

const get = async (url, params = {}) => {
  const config = { params }
  const response = await instance.get(url, config)
  return response.data
}

const post = async (url, data = {}, headers) => {
  const response = await instance.post(url, data, headers)
  return response.data
}

const put = async (url, data = {}, headers) => {
  const response = await instance.put(url, data, headers)
  return response.data
}

const patch = async (url, data = {}) => {
  const response = await instance.patch(url, data)
  return response.data
}

const del = async (url, data = {}) => {
  const response = await instance.delete(url, data)
  return response.data
}

export { get, post, put, patch, del }
