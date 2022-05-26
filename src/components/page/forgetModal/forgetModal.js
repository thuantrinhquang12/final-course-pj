/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Form,
  TimePicker,
  Input,
  Divider,
  Button,
  Checkbox,
  Row,
  Space,
} from 'antd'
const format = 'HH:mm'

import { Dialog } from '../../index'
// import styles from './forgetModal.module.scss'

const ForgetModal = ({ isOpen, row, handleCloseForget }) => {
  let data = { check_in: '08:00', check_out: '17:00' }
  const onFinish = (values) => {
    data = { ...data, ...values }
    console.log(data)
  }
  const onChange = (values) => {
    console.log(values)
    // console.log(values)
  }
  const currentDate = new Date()
  if (!isOpen) return null
  return (
    <Dialog
      isOpen={isOpen}
      handleModal={handleCloseForget}
      title="Register Forget Check-in/Check-out"
    >
      <>
        <Form name="forget" onFinish={onFinish}>
          <Form.Item label="Resgistration: ">
            <span className="ant-form-text">
              {moment(currentDate).format('YYYY-MM-DD h:mm')}
            </span>
          </Form.Item>
          <Form.Item label="Resgister for date: ">
            <span className="ant-form-text">
              {moment.unix(row.date).format('YYYY-MM-DD')}
            </span>
          </Form.Item>
          <Form.Item label="Check-in:(*) ">
            <TimePicker
              defaultValue={moment('08:00', format)}
              name="pick"
              format={format}
              onChange={onChange}
              style={{ width: '100px', marginRight: '10px', maxWidth: '100%' }}
            />
            <span className="ant-form-text">
              ({moment(row.check_in).format(format)})
            </span>
          </Form.Item>
          <Form.Item label="Check-out:(*)">
            <TimePicker
              onChange={onChange}
              format={format}
              defaultValue={moment('17:00', format)}
              style={{ width: '100px', marginRight: '10px' }}
            />
            <span className="ant-form-text">
              ({moment(row.check_out).format(format)})
            </span>
          </Form.Item>
          <Form.Item label="Specical reason  ">
            <Checkbox.Group>
              <Row>
                <Checkbox
                  value="check-in not counted as error"
                  style={{ lineHeight: '32px' }}
                >
                  Check-in not counted as error
                </Checkbox>
                <Checkbox
                  value="check-out not counted as error"
                  style={{ lineHeight: '32px' }}
                >
                  Check-out not counted as error
                </Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Reason  " name="reason">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Divider>
            <Space>
              <Button htmlType="submit">Register</Button>
              <Button>Cancel</Button>
            </Space>
          </Divider>
        </Form>
      </>
    </Dialog>
  )
}
ForgetModal.propTypes = {
  isOpen: PropTypes.bool,
}
export default ForgetModal
