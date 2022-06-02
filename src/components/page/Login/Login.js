import React from 'react'
import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.min.css'
import styles from './Login.module.scss'
import { typePopup } from '../../index'
import { LOCAL_STORAGE } from '../../constant/localStorage'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { login, loginAccess } from './Slice/sliceLogin'
import { loginAccess } from './Slice/sliceLogin'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    console.log(values)
    // call APi xong trả dataTest + truy cập vào trang Home
    const dataTest = {
      role: 'admin',
      tokenAccess: 'This is Token Access',
    }
    try {
      await dispatch(
        loginAccess({ role: dataTest.role, tokenAccess: dataTest.tokenAccess }),
      )
      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, dataTest.tokenAccess)
      localStorage.setItem(LOCAL_STORAGE.ROLE, dataTest.role)
      typePopup.popupNotice(
        typePopup.SUCCESS_MESSAGE,
        'Success',
        'Login Successful',
      )
      navigate('/', { replace: true })
    } catch (e) {
      typePopup.popupNotice(typePopup.ERROR_MESSAGE, 'Failed', 'Login Failed')
    }
  }

  const validateMessages = {}
  return (
    <>
      <div className={styles.LoginContainer}>
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
          validateMessages={validateMessages}
        >
          <h2 style={{ textAlign: 'center' }}>LOGIN</h2>
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
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Login
