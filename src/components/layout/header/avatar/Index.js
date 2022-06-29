import React from 'react'
import Cat from './crazyCat.jpg'
import styles from './Index.module.scss'
import UserList from './UserList'
import { Row, Col } from 'antd'

const Index = () => {
  return (
    <div className={styles.Avatar}>
      <Row>
        <Col xs={4} md={4} xl={4}>
          <div className={styles.formImg}>
            <div className={styles.Image}>
              <img src={Cat} alt="CrazyCat" />
            </div>
            <UserList />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Index
