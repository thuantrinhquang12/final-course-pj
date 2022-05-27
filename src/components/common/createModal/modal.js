import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const Dialog = ({ children, isOpen, title, handleModal }) => {
  if (!isOpen) return null
  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        onCancel={handleModal}
        footer={null}
        width={1000}
      >
        {children}
      </Modal>
    </>
  )
}
Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  handleModal: PropTypes.func,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
}
export default Dialog
