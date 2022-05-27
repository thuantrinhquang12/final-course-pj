import React from 'react'
import { Form, Input, Button } from 'antd'
import 'antd/dist/antd.min.css'
import styles from './Login.module.scss'
import popupNotice from '../../common/popupNotice/popupNotice'
import { typePopup } from '../../index'
import { LOCAL_STORAGE } from '../../constant/localStorage'
import { useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { login, loginAccess } from './Slice/sliceLogin'

const Login = () => {
  const navigate = useNavigate()
  // const dispatch = useDispatch()

  const onFinish = async (values) => {
    console.log(values)

    try {
      // useEffect(() => {
      //   const dataUser = login(values)
      //   const { values } = dataUser
      //   dispatch(loginAccess(dataUser))
      // }, [dispatch])
      if (true) {
        localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, true)
        popupNotice(typePopup.SUCCESS_MESSAGE, 'Success', 'Login Successful')
        navigate('/homepage', { replace: true })
      }
    } catch (e) {
      popupNotice(typePopup.ERROR_MESSAGE, 'Failed', 'Login Failed')
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
