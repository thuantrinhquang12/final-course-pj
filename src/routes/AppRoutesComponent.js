import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/page/Login/Login'
import PrivateRoute from './PrivateRoute'
import Homepage from '../components/page/Home/Homepage'
import HomeUser from '../components/page/Home/HomeUser'
import Unauthorized from '../components/page/Home/Unauthorized'
import Admin from '../components/page/Home/Admin'

const AppRoutesComponent = () => {
  const ROLES = {
    User: 1,
    Manager: 2,
    Admin: 3,
  }

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* User routes */}
        <Route element={<PrivateRoute allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<HomeUser />} />
        </Route>

        {/* Manager routes */}
        <Route
          element={<PrivateRoute allowedRoles={[ROLES.User, ROLES.Manager]} />}
        >
          <Route path="/homepage" element={<Homepage />} />
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
