import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/page/Login/Login'
import PrivateRoute from './PrivateRoute'
import Manager from '../components/page/Manager/Manager'
import Home from '../components/page/Home/index/index'
import SearchField from '../components/page/timesheet'
import Unauthorized from '../components/page/Unauthorized/Unauthorized'
import Admin from '../components/page/Admin/Admin'
import ErrorPage from '../components/page/ErrorPage/ErrorPage'
import { LOCAL_STORAGE } from '../components/constant/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { loginAccess } from '../components/page/Login/Slice/sliceLogin'

const AppRoutesComponent = () => {
  const dispatch = useDispatch()

  const ROLES = {
    User: 1,
    Manager: 2,
    Admin: 3,
  }

  const tokenAccess = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  const data = useSelector((state) => state.userInfo?.currentUser?.role)

  if (tokenAccess && !data) {
    const data = {
      role: localStorage.getItem(LOCAL_STORAGE.ROLE),
    }
    dispatch(loginAccess({ role: data.role }))
  }

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/timesheet" element={<SearchField />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<ErrorPage />} />

        {/* User routes */}
        <Route element={<PrivateRoute allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Manager routes */}
        <Route element={<PrivateRoute allowedRoles={[ROLES.Manager]} />}>
          <Route path="/manager" element={<Manager />} />
        </Route>

        {/* Admin routes */}
        <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutesComponent
