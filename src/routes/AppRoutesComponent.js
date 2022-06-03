import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/page/Login/Login'
import PrivateRoute from './PrivateRoute'
import Manager from '../components/page/Manager/Manager'
import Home from '../components/page/Home/index/index'
import Unauthorized from '../components/page/Unauthorized/Unauthorized'
import Admin from '../components/page/Admin/Admin'
import ErrorPage from '../components/page/ErrorPage/ErrorPage'
import { LOCAL_STORAGE } from '../components/constant/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { loginAccess } from '../components/page/Login/Slice/sliceLogin'
import Worksheet from '../components/page'

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
    const datatype = {
      tokenAccess: localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN),
      role: localStorage.getItem(LOCAL_STORAGE.ROLE),
    }
    dispatch(
      loginAccess({ role: datatype.role, tokenAccess: datatype.tokenAccess }),
    )
  }

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="Member" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />

        {/* User routes */}
        <Route element={<PrivateRoute allowedRoles={[ROLES.User]} />}>
          <Route path="/timesheet" element={<Worksheet />} />
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
