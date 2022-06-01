import React from 'react'
import { Outlet } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <h1>Đây là trang lỗi</h1>
      <Outlet />
    </>
  )
}

export default ErrorPage
