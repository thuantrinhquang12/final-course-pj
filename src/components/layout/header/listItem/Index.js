import React from 'react'
import styles from './Index.module.scss'
import 'antd/dist/antd.min.css'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Index = () => {
  const data = useSelector((state) => state.userInfo?.currentUser?.role)
  return (
    <div className={styles.ListItem}>
      <Row style={{ width: '100%', height: '100%' }}>
        <Col xs={24} md={8} xl={8} className={styles.column}>
          <Link to="/" className={styles.formGroup}>
            <i className="fa-solid fa-house-chimney"></i>
            <h3>HOME</h3>
          </Link>
        </Col>
        <Col xs={24} md={8} xl={8} className={styles.column}>
          <Link to="/timesheet" className={styles.formGroup}>
            <i className="fa-solid fa-business-time"></i>
            <h3>TIMESHEET</h3>
          </Link>
        </Col>
        <Col xs={24} md={8} xl={8} className={styles.column}>
          <Link to={data} className={styles.formGroup}>
            <i className="fa-solid fa-bars-progress"></i>
            <h3>MANAGER</h3>
          </Link>
        </Col>
      </Row>
    </div>
  )
}

export default Index
