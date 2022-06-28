import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import './Modal.scss'

const Dialog = ({
  children,
  isOpen,
  title,
  handleModal,
  confirmDisable,
  className,
  widthModal,
  footer,
}) => {
  const confirm = () => {
    Modal.confirm({
      title: 'Modal',
      icon: <CloseCircleOutlined />,
      content: 'Do you want close modal ?',
      okText: 'Cancel',
      cancelText: 'OK',
      okButtonProps: {
        type: 'default',
      },
      cancelButtonProps: {
        style: { padding: '0 28px' },
        type: 'primary',
      },
      onCancel() {
        handleModal()
      },
    })
  }

  if (!isOpen) return null

  return (
    <>
      <Modal
        title={title}
        onCancel={confirmDisable ? handleModal : confirm}
        className={
          className ? `${className} modalContainer ` : 'modalContainer'
        }
        footer={footer ?? null}
        visible={isOpen}
        width={widthModal || 1000}
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
  confirmDisable: PropTypes.bool,
  className: PropTypes.string,
  widthModal: PropTypes.number,
  footer: PropTypes.array,
}

export default Dialog
