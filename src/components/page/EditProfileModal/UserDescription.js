import { Descriptions } from 'antd'
import 'antd/dist/antd.min.css'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'https://6295d111810c00c1cb685f53.mockapi.io/'

const UserDescription = () => {
  const [profileInfo, setProfileInfo] = useState([])

  useEffect(() => {
    axios.get(API + 'user_info/1').then((res) => {
      setProfileInfo(res.data)
    })
  }, [])

  return (
    <Descriptions column={1}>
      <>
        <Descriptions.Item label="Member Code">
          {profileInfo.member_code}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{profileInfo.email}</Descriptions.Item>
        <Descriptions.Item label="Name">
          {profileInfo.first_name}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {profileInfo.phone_number}
        </Descriptions.Item>
      </>
    </Descriptions>
  )
}

export default UserDescription
