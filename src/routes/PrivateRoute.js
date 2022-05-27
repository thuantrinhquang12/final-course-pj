import { LOCAL_STORAGE } from '../components/constant/localStorage'
import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

const PrivateRoute = ({ allowedRoles }) => {
  const location = useLocation()
  // get role from Store and get Token from LOCAL_STORAGE
  const role = 'manager'
  const auth = role === 'user' ? [1] : role === 'manager' ? [1, 2] : [3]
  const tokenAccess = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  return auth?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
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
