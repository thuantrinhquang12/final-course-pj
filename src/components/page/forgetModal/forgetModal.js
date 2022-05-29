/* eslint-disable react/prop-types */

/* Xử lý khi người dùng hết lượt request
Xử lý khi request tồn tại và set default valute cho checkbox
Khi gui request set request da ton tai, va tim cach de lay dc
request ngay luc do de có thể update luôn
*/
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRequests,
  postRequests,
  putRequests,
  deleteRequests,
} from '../requestSlice'
import {
  TimePicker,
  Input,
  Divider,
  Button,
  Checkbox,
  Row,
  Space,
  Col,
  Skeleton,
} from 'antd'
const format = 'HH:mm'

import { Dialog } from '../../index'
// import styles from './forgetModal.module.scss'

const ForgetModal = ({ isOpen, row, handleCloseForget }) => {
  const [requestExists, setRequestExists] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const dispatch = useDispatch()
  const { request, status, message } = useSelector((state) => state.requests)
  console.log(message)
  const { handleSubmit, control, setValue } = useForm()
  const onSubmit = async (values, e) => {
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: 1,
          check_in: moment(values.check_in).format(format),
          check_out: moment(values.check_out).format(format),
          request_for_date: moment.unix(row.date).format('YYYY-MM-DD'),
          error_count: +!!values.special_reason,
          reason: values.reason,
          status: 'send',
          created_at: currentTime,
        }
        setRequestExists(true)
        await dispatch(postRequests(newRequest))
        break
      case 'UPDATE':
        const updateRequest = {
          check_in: moment(values.check_in).format(format),
          check_out: moment(values.check_out).format(format),
          error_count: +!!values.special_reason,
          reason: values.reason,
          update_at: currentTime,
        }
        await dispatch(
          putRequests({ id: request.id, requestData: updateRequest }),
        )
        break
      case 'DELETE':
        await dispatch(deleteRequests(request.id))
        break
      default:
        throw new Error('CO loi roi dmm')
    }
  }

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue('current_time', moment('10:00', format))
      setValue('check_in', moment(request.check_in, format))
      setValue('check_out', moment(request.check_out, format))
      setValue('special_reason', request.reason)
      setValue('reason', request.reason)
    }
  }, [request])
  useEffect(() => {
    setCurrentTime(moment().format('YYYY-MM-DD H:mm:s'))
  }, [isOpen])
  useEffect(() => {
    if (row.requests.length !== 0) {
      for (const request of row.requests) {
        if (request.request_type === 1) {
          setRequestExists(true)
          dispatch(getRequests(request.request_id))
        }
      }
    }
  }, [])
  const handleCloseModal = () => {
    handleCloseForget()
    dispatch(getRequests(-1))
  }

  return (
    <Dialog
      isOpen={isOpen}
      handleModal={handleCloseModal}
      title="Register Forget Check-in/Check-out"
    >
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          {status === 'loading' ? (
            <Skeleton paragraph={{ rows: 10 }}></Skeleton>
          ) : (
            <>
              <Row>
                <>
                  <Col flex="150px">Registration: </Col>
                  <Col flex="auto">{request.create_at || currentTime}</Col>
                </>
              </Row>
              <Row>
                <Col flex="150px">Register for date: </Col>
                <Col flex="auto">
                  {moment.unix(row.date).format('YYYY-MM-DD')}
                </Col>
              </Row>
              <Row>
                <Col flex="150px">Check-in:(*): </Col>
                <Col flex="auto">
                  <Controller
                    name="check_in"
                    defaultValue={moment('08:00', format)}
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        disabled={
                          request.status === 'confirmed' ||
                          request.status === 'approved'
                            ? true
                            : false
                        }
                        value={moment(request.check_in, format)}
                        format={format}
                        style={{
                          width: '100px',
                          marginRight: '10px',
                          maxWidth: '100%',
                        }}
                        {...field}
                      />
                    )}
                  />
                  <span className="ant-form-text">
                    ({moment(row.check_in).format(format)})
                  </span>
                </Col>
              </Row>
              <Row>
                <Col flex="150px">Check-out:(*): </Col>
                <Col flex="auto">
                  <Controller
                    name="check_out"
                    defaultValue={moment('17:00', format)}
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        disabled={
                          request.status === 'confirmed' ||
                          request.status === 'approved'
                            ? true
                            : false
                        }
                        format={format}
                        style={{ width: '100px', marginRight: '10px' }}
                        {...field}
                      />
                    )}
                  />

                  <span className="ant-form-text">
                    ({moment(row.check_out).format(format)})
                  </span>
                </Col>
              </Row>
              <Row>
                <Col flex="150px">Specical reason </Col>
                <Col flex="auto">
                  <Controller
                    name="special_reason"
                    control={control}
                    render={({ field }) => (
                      <Checkbox.Group
                        disabled={
                          request.status === 'confirmed' ||
                          request.status === 'approved'
                            ? true
                            : false
                        }
                        {...field}
                      >
                        <Row style={{ marginBottom: 0 }}>
                          <Checkbox value="0">
                            Check-in not counted as error
                          </Checkbox>
                          <Checkbox value="B">
                            Check-out not counted as error
                          </Checkbox>
                        </Row>
                      </Checkbox.Group>
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col flex="150px">Reason</Col>
                <Col flex="100%">
                  {status === 'loading' ? (
                    <Skeleton active size="small" block={true}>
                      <Input.TextArea></Input.TextArea>
                    </Skeleton>
                  ) : (
                    <Controller
                      name="reason"
                      value={request.reason}
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input.TextArea
                            rows={4}
                            disabled={
                              request.status === 'confirmed' ||
                              request.status === 'approved'
                                ? true
                                : false
                            }
                            {...field}
                          />
                        </>
                      )}
                    />
                  )}
                </Col>
              </Row>
              <Divider>
                <Space>
                  {!requestExists && (
                    <Button name="register" htmlType="submit">
                      Register
                    </Button>
                  )}
                  {requestExists && (
                    <>
                      <Button name="update" htmlType="submit">
                        Update
                      </Button>
                      <Button name="delete" htmlType="submit">
                        Delete
                      </Button>
                    </>
                  )}
                  <Button onClick={handleCloseModal}>Cancel</Button>
                </Space>
              </Divider>
            </>
          )}
        </form>
      </>
    </Dialog>
  )
}
ForgetModal.propTypes = {
  isOpen: PropTypes.bool,
}
export default ForgetModal
