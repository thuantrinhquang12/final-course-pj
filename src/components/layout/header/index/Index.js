import React from 'react'
import { Row, Col } from 'antd'
import Logo from '../logo/Logo'
import ListItem from '../listItem/Index'
import Avatar from '../avatar/Index'
import styles from './Index.module.scss'
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
