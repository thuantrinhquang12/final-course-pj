import { UnorderedListOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import React, { useState } from 'react'
import styles from './CreateNotification.scss'
import { dateTime, typePopup } from '../../../index'
import moment from 'moment'
import { post } from '../../../service/requestApi'
import TextArea from 'antd/lib/input/TextArea'

const CreateNotification = () => {
  const [form] = Form.useForm()
  const [selectDivision, setDivision] = useState(true)

  const onSubmit = async (values) => {
    const { subject, message, published_to: publishedTo } = values
    const selectedFile = document.getElementById('myfile').files[0]
    console.log(selectedFile)
    const data = {
      published_date: dateTime.formatDate(moment.now()),
      subject,
      message,
      status: 1,
      attachment: selectedFile,
      created_by: 1,
      published_to: publishedTo.includes('all')
        ? JSON.stringify(['all'])
        : JSON.stringify(publishedTo),
    }

    // try {
    //   const res = await post('/admin/notifications/store', data, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   })
    //   if (res.status === true) {
    //     typePopup.popupNotice(
    //       typePopup.SUCCESS_MESSAGE,
    //       'Success',
    //       'Create success message',
    //     )
    //     form.resetFields()
    //   } else return false
    // } catch (e) {
    //   typePopup.popupNotice(
    //     typePopup.ERROR_MESSAGE,
    //     'Reject',
    //     'Generate failure message',
    //   )
    // }
  }

  const onReset = () => {
    form.resetFields()
  }

  return (
    <>
      <div className="notificationContainer">
        <Form
          form={form}
          name="basic"
          initialValues={{ published_to: ['all'] }}
          onFinish={(values) => onSubmit(values)}
          autoComplete="off"
        >
          <h1 style={{ textAlign: 'center' }}>Create Notifications</h1>
          <Form.Item
            name="subject"
            className={styles.InputField}
            rules={[
              {
                required: true,
                message: 'Required to subject',
              },
              {
                max: 50,
                message: 'Subject cannot be longer than 50 characters',
              },
            ]}
          >
            <Input prefix={<UnorderedListOutlined />} placeholder="Subject" />
          </Form.Item>

          <Form.Item
            name="message"
            className={styles.InputField}
            rules={[
              {
                required: true,
                message: 'Required to message',
              },
              {
                max: 100,
                message: 'Message cannot be longer than 100 characters',
              },
            ]}
          >
            <TextArea
              placeholder="Message"
              autoSize={{ minRows: 5, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item
            name="file"
            rules={[
              {
                required: true,
                message: 'Required to file',
              },
            ]}
          >
            <Input type="file" id="myfile" name="myfile" />
          </Form.Item>

          <label>Published To : </label>
          <Form.Item name="published_to">
            <Checkbox.Group>
              <Row className="divisionName">
                <Col span={8}>
                  <Checkbox
                    value={1}
                    style={{
                      lineHeight: '32px',
                    }}
                    disabled={selectDivision && true}
                  >
                    D1
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={2}
                    style={{
                      lineHeight: '32px',
                    }}
                    disabled={selectDivision && true}
                  >
                    D2
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={3}
                    style={{
                      lineHeight: '32px',
                    }}
                    disabled={selectDivision && true}
                  >
                    D3
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={4}
                    style={{
                      lineHeight: '32px',
                    }}
                    disabled={selectDivision && true}
                  >
                    D4
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={5}
                    style={{
                      lineHeight: '32px',
                    }}
                    disabled={selectDivision && true}
                  >
                    D5
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value={6}
                    style={{
                      lineHeight: '32px',
                    }}
                    disabled={selectDivision && true}
                  >
                    D6
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    value="all"
                    style={{
                      lineHeight: '32px',
                    }}
                    onChange={() => setDivision((prev) => !prev)}
                  >
                    All
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item className="ItemSignin">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default CreateNotification
