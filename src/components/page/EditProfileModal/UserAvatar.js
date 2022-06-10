import { Avatar } from 'antd'
import 'antd/dist/antd.min.css'
import React from 'react'
import { useState } from 'react'

import styles from './UserEditForm.module.scss'
import defaultImage from './avatarDefault.png'

const UserAvatar = () => {
  const [avatarFile, setAvatarFile] = useState(null)
  const [smallAvatarFile, setSmallAvatarFile] = useState(null)

  const handleChange = function loadFile(event) {
    if (event.target.files.length > 0) {
      const targetImg = event.target.files[0]
      const img = new Image()
      img.src = URL.createObjectURL(targetImg)
      img.addEventListener('load', () => {
        if (img.width < 500 || img.height < 500) {
          alert('Minimum resolution is 500x500! Please choose another image')
        } else if (Math.round(targetImg.size / (1024 * 1024)) > 4) {
          alert('Please select image size less than 4 MB')
        } else {
          setAvatarFile(img.src)
        }
      })
    }
  }

  const handleChangeForSmall = function loadFileForSmall(event) {
    if (event.target.files.length > 0) {
      const targetImg = event.target.files[0]
      const img = new Image()
      img.src = URL.createObjectURL(targetImg)
      img.addEventListener('load', () => {
        if (img.width < 300 || img.height < 300) {
          alert('Minimum resolution is 300x300! Please choose another image')
        } else if (Math.round(targetImg.size / (1024 * 1024)) > 4) {
          alert('Please select image size less than 4 MB')
        } else {
          setSmallAvatarFile(img.src)
        }
      })
    }
  }

  return (
    <>
      <div className={styles.avatarList}>
        <div className={styles.avatarContainer}>
          <label htmlFor="upload-avatar">
            <Avatar
              shape="square"
              className={styles.avatar}
              src={avatarFile ?? defaultImage}
            />
            <div className={styles.avatarHover}>
              + <br />
              Upload
            </div>
          </label>
          <label htmlFor="upload-avatar" className={styles.uploadLabel}>
            Choose File
          </label>
          <input
            type="file"
            onChange={handleChange}
            style={{ display: 'none' }}
            id="upload-avatar"
            accept="image/png, image/jpeg"
          />
        </div>
        <div className={styles.avatarContainer}>
          <label htmlFor="upload-small-avatar">
            <Avatar
              shape="square"
              className={styles.smallAvatar}
              src={smallAvatarFile ?? defaultImage}
            />
            <div className={styles.smallAvatarHover}>
              + <br />
              Upload
            </div>
          </label>
          <label htmlFor="upload-small-avatar" className={styles.uploadLabel}>
            Choose File
          </label>
          <input
            type="file"
            onChange={handleChangeForSmall}
            style={{ display: 'none' }}
            id="upload-small-avatar"
            accept="image/png, image/jpeg"
          />
        </div>
      </div>
    </>
  )
}

export default UserAvatar
