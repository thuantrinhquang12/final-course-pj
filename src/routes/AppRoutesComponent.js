import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/page/Login/Login'
import PrivateRoute from './PrivateRoute'
import Manager from '../components/page/Home/Manager'
import UserHome from '../components/page/Home/UserHome'
import Unauthorized from '../components/page/Home/Unauthorized'
import Admin from '../components/page/Home/Admin'
import ErrorPage from '../components/page/Home/ErrorPage'
import { LOCAL_STORAGE } from '../components/constant/localStorage'
import { useDispatch } from 'react-redux'
import { loginAccess } from '../components/page/Login/Slice/sliceLogin'
import { useSelector } from 'react-redux'

const AppRoutesComponent = () => {
  const ROLES = {
    User: 1,
    Manager: 2,
    Admin: 3,
  }
  const tokenAccess = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  const dispatch = useDispatch()
  const data = useSelector((state) => state.userInfo?.currentUser?.role)
  if (tokenAccess && !!data) {
    // Nếu có token trong LocalStorage nhưng
    // trên Store chưa có gì thì Call Api trả data lấy cái role

    const data = {
      role: 'admin',
    }
    dispatch(loginAccess({ role: data.role }))
  }

  console.log('app route')

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<ErrorPage />} />

        {/* User routes */}
        <Route element={<PrivateRoute allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<UserHome />} />
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
