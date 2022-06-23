import React from 'react'
import styles from './Index.module.scss'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { Dropdown, Menu } from 'antd'
import {
  FormOutlined,
  ClockCircleOutlined,
  DatabaseOutlined,
} from '@ant-design/icons'

import { LOCAL_STORAGE } from '../../../constant/localStorage'
import './index.scss'

const Index = () => {
  const role = localStorage.getItem(LOCAL_STORAGE.ROLE)

  const menu = (
    <Menu
      className={styles.subMenu}
      items={[
        {
          key: '1',
          label: <Link to={'/manager'}>List requests</Link>,
          icon: (
            <DatabaseOutlined style={{ color: '#23466d', fontSize: '14px' }} />
          ),
        },
        {
          key: '2',
          label: <Link to={'/change-shift'}>Change shift</Link>,
          icon: (
            <ClockCircleOutlined
              style={{ color: '#23466d', fontSize: '14px' }}
            />
          ),
        },
        {
          key: '3',
          label: <Link to={'/notification'}>Create notice</Link>,
          icon: <FormOutlined style={{ color: '#23466d', fontSize: '14px' }} />,
        },
      ]}
    />
  )
  return (
    <div className={styles.ListItem}>
      <Row style={{ width: '100%', height: '100%' }}>
        {(role === 'Admin' || role === 'Manager') && (
          <>
            <Col xs={24} md={1} xl={3}></Col>
            <Col xs={24} md={7} xl={6} className={styles.column}>
              <NavLink to="/" className={styles.formGroup}>
                <i className="fa-solid fa-house-chimney"></i>
                <h4>HOME</h4>
                <div className={styles.progress} id="progress"></div>
              </NavLink>
            </Col>
            <Col xs={24} md={7} xl={6} className={styles.column}>
              <NavLink to="/timesheet" className={styles.formGroup}>
                <i className="fa-solid fa-business-time"></i>
                <h4>TIMESHEET</h4>
                <div className={styles.progress} id="progress"></div>
              </NavLink>
            </Col>

            <Col xs={24} md={7} xl={6} className={styles.column}>
              <Dropdown overlay={menu}>
                <NavLink
                  to={'/a'}
                  className={styles.formGroup}
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa-solid fa-bars-progress"></i>
                  <h4>MANAGER</h4>
                  <div className={styles.progress} id="progress"></div>
                </NavLink>
              </Dropdown>
            </Col>
          </>
        )}
        {role === 'Member' && (
          <>
            <Col xs={24} md={8} xl={10}></Col>
            <Col xs={24} md={8} xl={6} className={styles.column}>
              <NavLink to="/" className={styles.formGroup}>
                <i className="fa-solid fa-house-chimney"></i>
                <h4 style={{ color: 'white' }}>HOME</h4>
                <div className={styles.progress} id="progress"></div>
              </NavLink>
            </Col>
            <Col xs={24} md={8} xl={6} className={styles.column}>
              <NavLink to="/timesheet" className={styles.formGroup}>
                <i className="fa-solid fa-business-time"></i>
                <h4 style={{ color: 'white' }}>TIMESHEET</h4>
                <div className={styles.progress} id="progress"></div>
              </NavLink>
            </Col>
            <Col xs={24} md={8} xl={2}></Col>
          </>
        )}
      </Row>
    </div>
  )
}

export default Index
