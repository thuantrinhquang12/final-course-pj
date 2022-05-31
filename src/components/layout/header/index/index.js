import React from 'react'
import 'antd/dist/antd.min.css'
import { Row, Col } from 'antd'
import Logo from '../Logo/Logo'
import ListItem from '../ListItem/index'
import Avatar from '../Avatar/index'
import styles from './index.module.scss'
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <>
      <div className={styles.Navbar}>
        <Row style={{ height: '100%' }}>
          <Col xs={12} md={4} xl={4} style={{ height: '100%' }}>
            <Logo />
          </Col>
          <Col xs={0} md={16} xl={16} style={{ height: '100%' }}>
            <ListItem />
          </Col>
          <Col xs={12} md={4} xl={4} style={{ height: '100%' }}>
            <Avatar />
          </Col>
        </Row>
      </div>
      <Outlet />
    </>
  )
}

export default Index
