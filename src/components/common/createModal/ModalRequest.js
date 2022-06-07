import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button, Skeleton } from 'antd'
import { typeStatusRequest } from '../../index'

const Dialog = ({
  children,
  isOpen,
  title,
  handleModal,
  listButton,
  statusRequest,
  requestExists,
  statusGetRequest,
}) => {
  const confirm = () => {
    Modal.confirm({
      title: 'CLOSE MODAL',
      content: 'Are you sure ?',
      cancelText: 'Cancel',
      okText: 'Ok',
      onOk() {
        handleModal()
      },
    })
  }

  if (!isOpen) return null

  return (
    <>
      <Modal
        title={title}
        visible={isOpen}
        onCancel={
          statusRequest === typeStatusRequest.CONFIRMED ||
          statusRequest === typeStatusRequest.APPROVED
            ? handleModal
            : confirm
        }
        style={{ fontWeight: '500' }}
        footer={
          statusGetRequest === 'loading' ? (
            <>
              <Skeleton.Button />
              <Skeleton.Button />
              <Skeleton.Button />
            </>
          ) : (
            <>
              {listButton.map(
                ({ key, name, htmlType, type, idForm, text, loading }) => {
                  const visibleRegister =
                    name === 'register' && requestExists
                      ? { display: 'none' }
                      : {}
                  const visibleUpdate =
                    (name === 'update' || name === 'delete') &&
                    (!requestExists ||
                      statusRequest === typeStatusRequest.CONFIRMED ||
                      statusRequest === typeStatusRequest.APPROVED)
                      ? { display: 'none' }
                      : {}
                  return (
                    <Button
                      style={{ ...visibleRegister, ...visibleUpdate }}
                      loading={statusGetRequest === loading}
                      key={key}
                      name={name}
                      htmlType={htmlType}
                      type={type}
                      form={idForm}
                      onClick={
                        statusRequest === typeStatusRequest.CONFIRMED ||
                        statusRequest === typeStatusRequest.APPROVED
                          ? handleModal
                          : key === 'cancel'
                          ? confirm
                          : () => {}
                      }
                    >
                      {text}
                    </Button>
                  )
                },
              )}
            </>
          )
        }
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
