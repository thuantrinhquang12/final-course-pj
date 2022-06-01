import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'
import 'antd/dist/antd.min.css'
import { Row, Col } from 'antd'
import Cat from './CrazyCat.jpg'

const UserListBar = ({ open, onClick }) => {
  const refChildren = useRef(null)
  const remove = useRef(null)

  useEffect(() => {
    const children = refChildren.current
    const removeX = remove.current

    const handleClick = (e) => {
      e.stopPropagation()
    }

    const handleRemove = (e) => {
      e.stopPropagation()
      onClick()
    }

    if (children && removeX) {
      children.addEventListener('click', handleClick)
      removeX.addEventListener('click', handleRemove)
    }

    return () => {
      if (children && removeX) {
        children.removeEventListener('click', handleClick)
        removeX.removeEventListener('click', handleRemove)
      }
    }
  }, [open])

  if (!open) return null

  return (
    <div className={styles.UserListBar} onClick={onClick}>
      <Row style={{ width: '100%', height: '100%' }}>
        <Col xs={20} className={styles.UserCol} ref={refChildren}>
          <div className={styles.UserListColumn}>
            <div className={styles.NavHeader}>
              <div className={styles.NavImage}>
                <img src={Cat} alt="CatCrazy" />
                <h3>Crazy Cat</h3>
              </div>
              <i
                className="fa-solid fa-xmark"
                style={{ position: 'absolute', top: 0, right: 0 }}
                ref={remove}
              ></i>
            </div>
            <div className={styles.NavBody}>
              <a href="#" className={styles.formGroup}>
                <h3>HOME</h3>
                <i className="fa-solid fa-house-chimney"></i>
              </a>
              <a href="#" className={styles.formGroup}>
                <h3>TIMESHEET</h3>
                <i className="fa-solid fa-business-time"></i>
              </a>
              <a href="#" className={styles.formGroup}>
                <h3>MANAGER</h3>
                <i className="fa-solid fa-bars-progress"></i>
              </a>
            </div>
            <div className={styles.NavBody}>
              <a href="#" className={styles.formGroup}>
                <h3>Edit Profile</h3>
                <i className="fa-solid fa-hammer"></i>
              </a>
              <a href="#" className={styles.formGroup}>
                <h3>Change Password</h3>
                <i className="fa-solid fa-key"></i>
              </a>
              <a href="#" className={styles.formGroup}>
                <h3>LogOut</h3>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

UserListBar.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
}

export default UserListBar
