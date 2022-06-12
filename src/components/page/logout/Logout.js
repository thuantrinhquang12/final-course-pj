import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE } from '../../constant/localStorage'
import { del } from '../../service/requestApi'

const Logout = () => {
  const navigate = useNavigate()

  const OnClick = async () => {
    await del('/logout')
    localStorage.removeItem(LOCAL_STORAGE.ROLE)
    localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN)
    navigate('/login', { replace: true })
  }

  return (
    <>
      <h3 onClick={OnClick}>Logout</h3>
    </>
  )
}

export default Logout
