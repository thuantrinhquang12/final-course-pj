import React, { useRef, useEffect } from 'react'
import styles from './index.module.scss'
import Cat from './CrazyCat.jpg'
import PropTypes from 'prop-types'

const UserList = ({ open }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const modal = modalRef.current

    const handleClick = (e) => {
      e.stopPropagation()
    }

    if (modal) {
      modal.addEventListener('click', handleClick)
    }

    return () => {
      if (modal) {
        modal.removeEventListener('click', handleClick)
      }
    }
  }, [open])

  if (!open) return null
  return (
    <div className={styles.UserList} ref={modalRef}>
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

UserList.propTypes = {
  open: PropTypes.bool,
}

export default UserList
