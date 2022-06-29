import React from 'react'
import { Row, Col } from 'antd'
import { NavLink } from 'react-router-dom'
import { Dropdown, Menu } from 'antd'
import { ProfileOutlined, KeyOutlined, LogoutOutlined } from '@ant-design/icons'

import { LOCAL_STORAGE } from '../../../constant/localStorage'
import UserEditForm from '../../../page/editProfileModal/UserEditForm'
import ChangePassword from '../../../page/changePassword/ChangePassword'
import Logout from '../../../page/logout/Logout'
import styles from './Index.module.scss'

const Index = () => {
  const info = JSON.parse(localStorage.getItem(LOCAL_STORAGE.INF_USER))

  const menu = (
    <Menu
      className={styles.subMenu}
      items={[
        {
          key: '1',
          label: <UserEditForm>Edit Profile</UserEditForm>,
          icon: (
            <ProfileOutlined style={{ color: '#23466d', fontSize: '14px' }} />
          ),
        },
        {
          key: '2',
          label: <ChangePassword>Change Password</ChangePassword>,
          icon: <KeyOutlined style={{ color: '#23466d', fontSize: '14px' }} />,
        },
        {
          key: '3',
          label: <Logout>Logout</Logout>,
          icon: (
            <LogoutOutlined style={{ color: '#23466d', fontSize: '14px' }} />
          ),
        },
      ]}
    />
  )

  return (
    <div className={styles.Avatar}>
      <Row>
        <Col xs={4} md={4} xl={4}>
          <Dropdown overlay={menu}>
            <NavLink
              to={'/admin'}
              className={styles.formGroup}
              onClick={(e) => e.preventDefault()}
            >
              <div className={styles.formImg}>
                <div className={styles.Image}>
                  <img src={info?.avatar} alt="CrazyCat" />
                </div>
              </div>
            </NavLink>
          </Dropdown>
        </Col>
      </Row>
    </div>
  )
}

export default Index
