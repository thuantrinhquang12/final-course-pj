import React, { useState } from 'react'
import { Form, Input, Modal, Button } from 'antd'
import { typePopup } from '../../index'
import './ChangePassword.scss'
import { patch } from '../../service/requestApi'

const ChangePassword = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [error, setError] = useState(false)
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    const {
      old_password: oldPassword,
      new_password: newPass,
      new_password_confirmation: passConfirm,
    } = values
    const res = await patch('/change-password', {
      old_password: oldPassword,
      new_password: newPass,
      new_password_confirmation: passConfirm,
    })
    try {
      if (res.status === 'success') {
        setIsModalVisible(false)
        form.resetFields()
        typePopup.popupNotice(
          typePopup.SUCCESS_MESSAGE,
          'Success',
          'Change Password Successful',
        )
      } else return false
    } catch (e) {
      setError(true)
      typePopup.popupNotice(
        typePopup.ERROR_MESSAGE,
        'Failed',
        'Change Password Failed',
      )
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
    setError(false)
  }

  return (
    <div>
      <h3 onClick={showModal}>Change Password</h3>
      <Modal
        title={<h3 style={{ color: 'white', margin: '0' }}>Change Password</h3>}
        className="ChangePassword"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          form={form}
          name="basic"
          labelAlign="left"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 15,
          }}
          initialValues={{
            email: 'tuanda@vnext.com',
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Email" name="email" rules={[]}>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item
            label="Old Password:"
            name="old_password"
            rules={[
              {
                required: true,
                message: 'Required to enter password!!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Password:"
            name="new_password"
            rules={[
              {
                required: true,
                message: 'Required to enter password!!',
              },
              {
                min: 6,
                message: 'Min length 6!!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="new_password_confirmation"
            label="Confirm Password:"
            dependencies={['new_password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  )
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="buttonConfirmpass">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: 20 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
          {error && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              Wrong old password !!!
            </p>
          )}
        </Form>
      </Modal>
    </div>
  )
}

export default ChangePassword
