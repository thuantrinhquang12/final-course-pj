import axios from 'axios'

export const login = async (params) => {
  const res = await axios({
    method: 'post',
    url: 'http://54.179.42.101/api/login',
    data: params,
  }).then((response) => response)
  return res.data
}
