import { Spin } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { del } from '../../service/requestApi'

const Logout = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    setLoading(true)
    await del('/logout')
    setLoading(false)
    localStorage.clear()
    navigate('/login', { replace: true })
  }

  return (
    <Spin spinning={loading}>
      <h3 onClick={onClick}>Sign Out</h3>
    </Spin>
  )
}

export default Logout
