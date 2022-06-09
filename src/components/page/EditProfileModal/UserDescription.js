import { Descriptions, Row, Col } from 'antd'
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
    <Descriptions>
      <Row>
        <Col span={24}>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={6}>Member Code:</Col>
            <Col span={12}>
              <Descriptions.Item>{profileInfo.member_code}</Descriptions.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={6}>Email:</Col>
            <Col span={12}>
              <Descriptions.Item>{profileInfo.email}</Descriptions.Item>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={6}>Name:</Col>
            <Col span={12}>
              <Descriptions.Item>{profileInfo.first_name}</Descriptions.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>Phone Number:</Col>
            <Col span={12}>
              <Descriptions.Item>{profileInfo.phone_number}</Descriptions.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Descriptions>
  )
}

export default UserDescription
