/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Form,
  Input,
  Divider,
  Button,
  TimePicker,
  Space,
  Radio,
  Row,
  Col,
} from 'antd'
import { Dialog } from '../../index'
// import styles from './leaveModal.module.scss'

const format = 'HH:mm'
const LeaveModal = ({ isOpen, row, handleCloseLeave }) => {
  const currentDate = new Date()
  if (!isOpen) return null
  return (
    <Dialog
      isOpen={isOpen}
      handleModal={handleCloseLeave}
      title="Register Leave"
    >
      <>
        <Form
          name="leave"
          initialValues={
            {
              // 'input-number': 3,
            }
          }
        >
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
          <Row>
            <Col span={12}>
              <Form.Item label="Check-in">
                <span className="ant-form-text">
                  {moment(row.check_in).format('hh:mm')}
                </span>
              </Form.Item>
              <Form.Item label="Check-out" className>
                <span className="ant-form-text">
                  {moment(row.check_out).format('hh:mm')}
                </span>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Work time:">
                <span className="ant-form-text">
                  {moment(row.check_in).format('hh:mm')}
                </span>
              </Form.Item>
              <Form.Item label="Lack time: ">
                <span className="ant-form-text">
                  {moment(row.check_out).format('hh:mm')}
                </span>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Ranger">
            <Space style={{ flexWrap: 'wrap' }}>
              <TimePicker
                defaultValue={moment('08:00', format)}
                format={format}
                style={{
                  width: '100px',
                  marginRight: '10px',
                  maxWidth: '100%',
                }}
              />
              <span> to </span>
              <TimePicker
                defaultValue={moment('17:00', format)}
                format={format}
                style={{
                  width: '100px',
                  marginRight: '10px',
                  maxWidth: '100%',
                }}
              />
              <Radio.Group style={{ display: 'flex', flexDirection: 'column' }}>
                <Radio value="paid">Paid</Radio>
                <Radio value="unpaid">Unpaid</Radio>
              </Radio.Group>
              <span>| time count: 01:00 </span>
            </Space>
          </Form.Item>
          <Form.Item label="Reason  ">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Divider>
            <Space>
              <Button>Register</Button>
              <Button>Cancel</Button>
            </Space>
          </Divider>
        </Form>
      </>
    </Dialog>
  )
}
LeaveModal.propTypes = {
  isOpen: PropTypes.bool,
}
export default LeaveModal
