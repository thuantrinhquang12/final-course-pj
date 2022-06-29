import React from 'react'
import { Row, Col } from 'antd'
import ListItem from '../listItem/Index'
import Avatar from '../avatar/Index'
import styles from './Index.module.scss'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logoMain from './logo.svg'
import { LOCAL_STORAGE } from '../../../constant/localStorage'

const Index = () => {
  const info = JSON.parse(localStorage.getItem(LOCAL_STORAGE.INF_USER))
  return (
    <>
      <div className={styles.Navbar} id="Header_TimeSheet">
        <div className={styles.contentNav}>
          <Row style={{ height: '100%', width: '100%' }}>
            <Col xs={12} md={8} xl={11} style={{ height: '100%' }}>
              <div className={styles.containerLogo}>
                <Link to="/">
                  <img src={logoMain} className={styles.logo} />
                </Link>
              </div>
            </Col>
            <Col xs={0} md={12} xl={10} style={{ height: '100%' }}>
              <ListItem />
            </Col>
            <Col xs={12} md={4} xl={1} style={{ height: '100%' }}>
              <Avatar />
            </Col>
            <Col
              xs={12}
              md={4}
              xl={2}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                color: '#23466d',
              }}
            >
              <Row style={{ marginTop: '10px' }}>
                Hi, {info?.name.split(' ').pop()}!
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Index
