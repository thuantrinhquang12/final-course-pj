import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import ReactPortal from './createPortal'
import styles from './modal.module.scss'

const Modal = ({ children, isOpen, handleClose }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const closeModalEscapeKey = (e) => {
      return e.key === 'Escape' ? handleClose() : null
    }
    const handleCloseModal = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleClose()
      }
    }
    document.addEventListener('keydown', closeModalEscapeKey)
    document.addEventListener('click', handleCloseModal)
    return () => {
      document.removeEventListener('keydown', closeModalEscapeKey)
      document.removeEventListener('click', handleCloseModal)
    }
  }, [modalRef.current])
  if (!isOpen) return null
  return (
    <ReactPortal wrapperId={styles.modalContainer}>
      <div ref={modalRef} className={styles.modalContent}>
        <div className={styles.modalTitle}>README</div>
        {children}
        <span onClick={handleClose} className={styles.closeModal}></span>
      </div>
    </ReactPortal>
  )
}
Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
}
export default Modal
