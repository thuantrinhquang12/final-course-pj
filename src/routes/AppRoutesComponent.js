import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/page/login/Login'
import PrivateRoute from './PrivateRoute'
import Manager from '../components/page/manager/Manager'
import Home from '../components/page/home/index/Index'
import Unauthorized from '../components/page/unauthorized/Unauthorized'
import Admin from '../components/page/admin/Admin'
import { NotFound, AuthorError } from '../components'
import { LOCAL_STORAGE } from '../components/constant/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { loginAccess } from '../components/page/login/slice/sliceLogin'
import Worksheet from '../components/page/Index'
import Header from '../components/layout/header/index/Index'

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
  // check thời gian tồn tại của tokenAccess

  return (
    <>
      <Routes>
        {/* public routes no layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<AuthorError />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<Header />}>
          {/* public routes with layout */}
          <Route
            element={
              <PrivateRoute
                allowedRoles={[ROLES.User, ROLES.Manager, ROLES.Admin]}
              />
            }
          >
            <Route path="/member" element={<Unauthorized />} />
            <Route path="/timesheet" element={<Worksheet />} />
          </Route>

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
        </Route>
      </Routes>
    </>
  )
}

export default AppRoutesComponent
