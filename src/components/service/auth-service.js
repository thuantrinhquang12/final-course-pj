import axios from 'axios'

export const login = async (params) => {
  const res = await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/login',
    data: params,
  }).then((response) => response)
  return res.data
}
