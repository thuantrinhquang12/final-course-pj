import { Descriptions, Row, Col, Skeleton } from 'antd'
import React from 'react'
import { useState, useEffect } from 'react'

import { get } from '../../service/requestApi'
import styles from './UserEditForm.module.scss'

const API = '/members'

const UserDescription = () => {
  const [profileInfo, setProfileInfo] = useState({})

  useEffect(() => {
    get(API + '/edit').then((res) => {
      setProfileInfo(res.data)
    })
  }, [])

  return (
    <>
      {(Object.keys(profileInfo) || []).length === 0 ? (
        <Descriptions>
          <Row>
            <Skeleton active paragraph={{ rows: 4 }}></Skeleton>
          </Row>
        </Descriptions>
      ) : (
        <Descriptions>
          <Row>
            <Col span={24}>
              <Row className={styles.descriptionRow}>
                <Col span={6}>Member Code:</Col>
                <Col className={styles.descriptionCol} span={12}>
                  <Descriptions.Item>
                    {profileInfo.member_code}
                  </Descriptions.Item>
                </Col>
              </Row>
              <Row className={styles.descriptionRow}>
                <Col span={6}>Email:</Col>
                <Col className={styles.descriptionCol} span={12}>
                  <Descriptions.Item>{profileInfo.email}</Descriptions.Item>
                </Col>
              </Row>
              <Row className={styles.descriptionRow}>
                <Col span={6}>Name:</Col>
                <Col className={styles.descriptionCol} span={12}>
                  <Descriptions.Item>{profileInfo.full_name}</Descriptions.Item>
                </Col>
              </Row>
              <Row className={styles.descriptionRow}>
                <Col span={6}>Phone Number:</Col>
                <Col className={styles.descriptionCol} span={12}>
                  <Descriptions.Item>{profileInfo.phone}</Descriptions.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Descriptions>
      )}
    </>
  )
}

export default UserDescription
