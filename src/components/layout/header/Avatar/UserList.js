import React from 'react'
import styles from './index.module.scss'
import Cat from './CrazyCat.jpg'
import ChangePassword from '../../../page/ChangePassword/ChangePassword'
import UserEditForm from '../../../page/EditProfileModal/UserEditForm'
import Logout from '../../../page/Logout/Logout'

const UserList = () => {
  return (
    <div className={styles.UserList}>
      <div className={styles.UserHeader}>
        <div className={styles.UserHeader__Image}>
          <img src={Cat} alt="CrazyCat" />
        </div>
        <h3>Crazy Cat</h3>
      </div>
      <div className={styles.UserBody}>
        <div className={styles.UserGroup}>
          <i className="fa-solid fa-hammer"></i>
          <UserEditForm />
        </div>
        <div className={styles.UserGroup}>
          <i className="fa-solid fa-key"></i>
          <ChangePassword />
        </div>
        <div className={styles.UserGroup}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <Logout />
        </div>
      </div>
    </div>
  )
}

export default UserList
