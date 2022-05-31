import { LOCAL_STORAGE } from '../components/constant/localStorage'
import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Header from '../components/layout/header/index/index'

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation()

  const role = useSelector((state) => state.userInfo?.currentUser?.role)

  console.log(role)
  let auth = []
  if (role === 'user') {
    auth = [1]
  }
  if (role === 'manager') {
    auth = [1, 2]
  }
  if (role === 'admin') {
    auth = [1, 3]
  } else {
    auth = []
  }

  const tokenAccess = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

  return auth?.find((role) => allowedRoles?.includes(role)) ? (
    <Header>
      <Outlet />
    </Header>
  ) : !tokenAccess ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  )
}

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.array,
}

export default PrivateRoute
