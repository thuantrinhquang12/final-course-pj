import React from 'react'
import styles from './Index.module.scss'
import UserList from './UserList'
import { Row, Col } from 'antd'
import { LOCAL_STORAGE } from '../../../constant/localStorage'
const Index = () => {
  const info = JSON.parse(localStorage.getItem(LOCAL_STORAGE.INF_USER))
  return (
    <div className={styles.Avatar}>
      <Row>
        <Col xs={4} md={4} xl={4}>
          <div className={styles.formImg}>
            <div className={styles.Image}>
              <img src={info?.avatar} alt="CrazyCat" />
            </div>
            <UserList />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Index
