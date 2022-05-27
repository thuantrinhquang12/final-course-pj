import axios from 'axios'
import { LOCAL_STORAGE } from '../constant/localStorage'

const tokenAccess = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    Authorization: 'Bearer ' + tokenAccess,
  },
  timeout: 5000,
})

const get = async (url, params = {}) => {
  try {
    const config = { params }
    const response = await instance.get(url, config)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const post = async (url, data = {}) => {
  try {
    const response = await instance.post(url, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const put = async (url, data = {}) => {
  try {
    const response = await instance.put(url, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
const del = async (url, data = {}) => {
  try {
    const response = await instance.delete(url, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export { get, post, put, del }
