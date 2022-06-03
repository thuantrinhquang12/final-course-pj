import React from 'react'
import { Outlet } from 'react-router-dom'
import RegisterLE from '../RgLateEarly/index/index'

const ErrorPage = () => {
  return (
    <>
      <h1>Đây là trang lỗi</h1>
      <Outlet />

      <RegisterLE />
    </>
  )
}

export default ErrorPage
