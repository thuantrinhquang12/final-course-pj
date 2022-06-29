import React from 'react'
import { Avatar } from 'antd'
import { useState, useEffect } from 'react'
import { get } from '../../service/requestApi'

import emitter from '../../utils/emitter'
import styles from './UserEditForm.module.scss'
import defaultImage from './avatarDefault.png'

const UserAvatar = () => {
  const [avatarFile, setAvatarFile] = useState(null)
  const [smallAvatarFile, setSmallAvatarFile] = useState(null)
  const [profileInfo, setProfileInfo] = useState([])

  useEffect(() => {
    get('/members/edit').then((res) => {
      setProfileInfo(res?.data)
    })
  }, [])

  const handleChange = (event) => {
    if (event.target.files.length > 0) {
      const targetImg = event.target.files[0]
      emitter.emit('EVENT_GET_AVATAR', { data: targetImg })
      const idxDot = targetImg.name.lastIndexOf('.') + 1
      const extFile = targetImg.name
        .substr(idxDot, targetImg.name.length)
        .toLowerCase()
      if (extFile != 'jpg' && extFile != 'jpeg' && extFile != 'png') {
        alert('Only jpg/jpeg and png files are allowed!')
      }

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

  const handleChangeForSmall = (event) => {
    if (event.target.files.length > 0) {
      const targetImg = event.target.files[0]
      emitter.emit('EVENT_GET_SMALL_AVATAR', { data: targetImg })
      const idxDot = targetImg.name.lastIndexOf('.') + 1
      const extFile = targetImg.name
        .substr(idxDot, targetImg.name.length)
        .toLowerCase()
      if (extFile != 'jpg' && extFile != 'jpeg' && extFile != 'png') {
        alert('Only jpg/jpeg and png files are allowed!')
      }

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
          <Avatar
            shape="square"
            className={styles.avatar}
            src={avatarFile ?? profileInfo.avatar_official ?? defaultImage}
          />
          <label htmlFor="upload-avatar" className={styles.uploadLabel}>
            Choose File
            <input
              type="file"
              onChange={handleChange}
              style={{ display: 'none' }}
              id="upload-avatar"
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
        </div>
        <div className={styles.avatarContainer}>
          <label htmlFor="upload-small-avatar">
            <Avatar
              shape="square"
              className={styles.smallAvatar}
              src={smallAvatarFile ?? profileInfo.avatar ?? defaultImage}
            />
          </label>
          <label htmlFor="upload-small-avatar" className={styles.uploadLabel}>
            Choose File
            <input
              type="file"
              onChange={handleChangeForSmall}
              style={{ display: 'none' }}
              id="upload-small-avatar"
              accept="image/png, image/jpeg, image/jpg"
            />
          </label>
        </div>
      </div>
    </>
  )
}

export default UserAvatar
