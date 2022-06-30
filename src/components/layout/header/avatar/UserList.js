import React from 'react'
import styles from './Index.module.scss'
import ChangePassword from '../../../page/changePassword/ChangePassword'
import Logout from '../../../page/logout/Logout'
import UserEditForm from '../../../page/editProfileModal/UserEditForm'
import { ProfileOutlined, KeyOutlined, LogoutOutlined } from '@ant-design/icons'
import { LOCAL_STORAGE } from '../../../constant/localStorage'

const UserList = () => {
  const info = JSON.parse(localStorage.getItem(LOCAL_STORAGE.INF_USER))
  const role = localStorage.getItem(LOCAL_STORAGE.ROLE)
  return (
    <div className={styles.UserList}>
      <div className={styles.UserHeader}>
        <h3>{info?.name}</h3>
        <h4>{role}</h4>
      </div>
      <div className={styles.UserBody}>
        <div className={styles.UserGroup}>
          <ProfileOutlined />
          <UserEditForm />
        </div>
        <div className={styles.UserGroup}>
          <KeyOutlined />
          <ChangePassword />
        </div>
        <div className={styles.UserGroup}>
          <LogoutOutlined />
          <Logout />
        </div>
      </div>
    </div>
  )
}

export default UserList
