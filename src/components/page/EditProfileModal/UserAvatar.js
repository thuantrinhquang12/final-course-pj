import { Avatar, Input } from 'antd'
import 'antd/dist/antd.min.css'
import React from 'react'
import { useState } from 'react'
import styles from './UserEditForm.module.scss'
import defaultImage from './avatar-default.png'

const UserAvatar = () => {
  const [file, setFile] = useState(null)

  const handleChange = function loadFile(event) {
    if (event.target.files.length > 0) {
      const file = URL.createObjectURL(event.target.files[0])
      setFile(file)
    }
  }
  return (
    <>
      <Input type="file" onChange={handleChange} style={{ display: 'none' }} />
      <label htmlFor="upload">
        <div className={styles.avatarList}>
          <div className={styles.avatarContainer}>
            <Avatar
              shape="square"
              className={styles.avatar}
              src={file ?? defaultImage}
            />
            <div className={styles.avatarHover}>Change Image</div>
          </div>
          <Avatar
            shape="square"
            className={styles.smallAvatar}
            src={file ?? defaultImage}
          />
        </div>
      </label>
    </>
  )
}

export default UserAvatar
