import React, { useState } from 'react'
import { Form, Input, Modal, Button } from 'antd'
import 'antd/dist/antd.min.css'
import popupNotice from '../../common/popupNotice/popupNotice'
import { typePopup } from '../../index'
import style from './ChangePassword.module.scss'

const ChangePassword = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const onFinish = async (values) => {
    // call API
    console.log(values)
    try {
      if (true) {
        setIsModalVisible(false)
        popupNotice(
          typePopup.SUCCESS_MESSAGE,
          'Success',
          'Change Password Successful',
        )
      }
    } catch (e) {
      popupNotice(typePopup.ERROR_MESSAGE, 'Failed', 'Change Password Failed')
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Change Password
      </Button>
      <Modal
        title="Change Password"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 14,
          }}
          initialValues={{
            email: '@vnext.com',
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Required to enter email!',
              },
              {
                type: 'email',
                message: 'Enter a valid email address!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
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
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
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

          <Form.Item className={style.button}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: 20 }} onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ChangePassword
