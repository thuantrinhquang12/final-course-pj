import React from 'react'
import styles from './index.module.scss'
import Cat from './CrazyCat.jpg'

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
          <h3>Edit Profile</h3>
        </div>
        <div className={styles.UserGroup}>
          <i className="fa-solid fa-key"></i>
          <h3>Change Password</h3>
        </div>
        <div className={styles.UserGroup}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  )
}

export default UserList
