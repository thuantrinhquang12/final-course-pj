import React from 'react'
import { useSelector } from 'react-redux'
import ChangePassword from '../ChangePassword/ChangePassword'

const UserHome = () => {
  const data = useSelector((state) => state.userInfo?.currentUser?.role)
  console.log(data)
  return (
    <>
      <ChangePassword />
    </>
  )
}

export default UserHome
