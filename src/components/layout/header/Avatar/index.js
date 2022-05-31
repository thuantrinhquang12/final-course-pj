import React, { useRef, useEffect, useState } from 'react'
import Cat from './CrazyCat.jpg'
import styles from './index.module.scss'
import UserList from './UserList'
import UserBar from './Userbar'
import 'antd/dist/antd.min.css'
import { Row, Col } from 'antd'

const Index = () => {
  const [isOpen, setIsOpen] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const handleClick = () => {
      setIsOpen(false)
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  useEffect(() => {
    const image = imgRef.current

    const handleClick = (e) => {
      e.stopPropagation()
      setIsOpen((prev) => !prev)
    }

    image.addEventListener('click', handleClick)

    return () => {
      image.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className={styles.Avatar}>
      <Row>
        <Col xs={0} md={4} xl={4}>
          <div className={styles.formImg} ref={imgRef}>
            <div className={styles.Image}>
              <img src={Cat} alt="CrazyCat" />
            </div>
            <UserList open={isOpen} />
          </div>
        </Col>
        <Col xs={12} md={0} xl={0}>
          <UserBar />
        </Col>
      </Row>
    </div>
  )
}

export default Index
