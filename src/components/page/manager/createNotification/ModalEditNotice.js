import React, { useState } from 'react'
import Dialog from '../../../common/createModal/Modal'
import { Button, Modal } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import CreateNotification from './CreateNotification'
import PropTypes from 'prop-types'
import './CreateNotification.scss'

const ModalEditNotice = (props) => {
  const { isOpen, handleModal, data } = props
  const [loading, setLoading] = useState(false)

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
  return (
    <Dialog
      isOpen={isOpen}
      handleModal={handleModal}
      confirmDisable={data?.status === 1}
      footer={
        !data
          ? [
              <Button
                key="submit"
                form="formNotice"
                htmlType="submit"
                type="primary"
                loading={loading}
              >
                Submit
              </Button>,
              <Button key="cancel" onClick={confirm}>
                Cancel
              </Button>,
            ]
          : [
              <Button
                key="cancel"
                onClick={data.status === 1 ? handleModal : () => {}}
              >
                Cancel
              </Button>,
            ]
      }
      title="Create Notifications"
      widthModal={700}
    >
      <CreateNotification
        data={data}
        handleModal={handleModal}
        setLoading={setLoading}
      />
    </Dialog>
  )
}

ModalEditNotice.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  data: PropTypes.object,
}

export default ModalEditNotice
