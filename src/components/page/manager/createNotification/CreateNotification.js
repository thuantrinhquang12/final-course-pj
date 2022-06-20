import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Col, Form, Input, Row, Upload } from 'antd'
import React, { useState } from 'react'
import styles from './CreateNotification.scss'
import { dateTime, typePopup } from '../../../index'
import moment from 'moment'
import { post } from '../../../service/requestApi'

const CreateNotification = () => {
  const [form] = Form.useForm()
  const [state, setState] = useState()
  const [selectDivision, setDivision] = useState(true)

  const handleChange = (info) => {
    setState(info.fileList)
  }

  const getFile = (e) => {
    if (Array.isArray(e)) {
      console.log('file1', e)
      return e
    }
    return e && e.fileList
  }

  const onSubmit = async (values) => {
    const { subject, message, attachment, published_to: publishedTo } = values

    const data = {
      published_date: dateTime.formatDate(moment.now()),
      subject,
      message,
      status: 1,
      attachment,
      created_by: 1,
      published_to: publishedTo.includes('all') ? ['all'] : publishedTo,
    }
    try {
      await post('/admin/notifications/store', data)
      // typePopup.popupNotice(
      //   typePopup.SUCCESS_MESSAGE,
      //   'Đăng thành công',
      //   'ok nha',
      // )
    } catch (e) {
      typePopup.popupNotice(
        typePopup.ERROR_MESSAGE,
        'Không thành công',
        'ok nha',
      )
    }
  }

  return (
    <>
      <div className={styles.notificationContainer}>
        <Form
          form={form}
          name="basic"
          initialValues={{ published_to: ['all'] }}
          onFinish={(values) => onSubmit(values)}
          autoComplete="off"
        >
          <Form.Item
            name="subject"
            className={styles.InputField}
            rules={[
              {
                required: true,
                message: 'Required to subject',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Subject"
            />
          </Form.Item>

          <Form.Item
            name="message"
            className={styles.InputField}
            rules={[
              {
                required: true,
                message: 'Required to message',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Message"
            />
          </Form.Item>

          <Form.Item
            name="attachment"
            valuePropName="fileList"
            getValueFromEvent={getFile}
            className={styles.InputField}
            // rules={[
            //   {
            //     required: true,
            //     message: 'Required to attachment',
            //   },
            // ]}
          >
            <Upload.Dragger
              beforeUpload={(file) => {
                console.log('file', file)
                return false
              }}
              onChange={handleChange}
              multiple={false}
              maxCount={1}
              defaultFileList={state}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item name="published_to" label="Published To">
            <Checkbox.Group>
              <Row>
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
                    All &nbsp;
                  </Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item className={styles.ItemSignin}>
            <Button className={styles.Button} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default CreateNotification
