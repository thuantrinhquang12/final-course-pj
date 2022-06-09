import React from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

const ErrorPage = () => {
  const getData = async () => {
    await axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/login',
      data: {
        email: 'test100@gmail.com',
        password: '123456',
      },
    }).then((respon) => {})
  }

  getData()

  return (
    <>
      <h1>Đây là trang lỗi</h1>
      <Outlet />
    </>
  )
}

export default ErrorPage
