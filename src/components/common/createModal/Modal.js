import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

const Dialog = ({ children, isOpen, title, handleModal }) => {
  const confirm = () => {
    Modal.confirm({
      title: 'CLOSE MODAL',
      content: 'Are you sure ?',
      cancelText: 'Cancel',
      okText: 'Ok',
      onOk() {
        handleModal()
      },
      onCancel() {},
    })
  }

  if (!isOpen) return null

  return (
    <>
      <Modal
        title={title}
        onCancel={confirm}
        footer={null}
        visible={isOpen}
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
