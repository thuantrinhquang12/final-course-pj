/* eslint-disable react/prop-types */

/* Xử lý khi người dùng hết lượt request
Xử lý khi request tồn tại và set default valute cho checkbox
Khi gui request set request da ton tai, va tim cach de lay dc
request ngay luc do de có thể update luôn
Xử lý lấy dữ liệu của check box specialReason khi request tòn tại
 */
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
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
import {
  getRequests,
  postRequests,
  putRequests,
  deleteRequests,
} from '../requestSlice'
import {
  Dialog,
  typeRequest,
  statusRequest,
  getDateTime,
  dateTime,
} from '../../index'
// import styles from './forgetModal.module.scss'

const ForgetModal = ({ isOpen, row, handleCloseForget }) => {
  const [requestExists, setRequestExists] = useState(false)
  const currentTime = useRef(getDateTime.getCurrentTime())
  const { handleSubmit, control, setValue } = useForm()
  const dispatch = useDispatch()
  const { request, status, message } = useSelector((state) => state.requests)
  console.log(message)
  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue('checkInTime', dateTime.momentType(request.check_in))
      setValue('checkOutTime', dateTime.momentType(request.check_out))
      setValue('specialReason', !!request.error_count ? [0, 1] : [])
      setValue('reasonInput', request.reason)
    }
  }, [request])

  useEffect(() => {
    if (row.requests.length !== 0) {
      for (const request of row.requests) {
        if (request.request_type === typeRequest.REQUEST_FORGET) {
          setRequestExists(true)
          dispatch(getRequests(request.request_id))
        }
      }
    }
  }, [])

  const onSubmit = async (values, e) => {
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_FORGET,
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          request_for_date: dateTime.formatDate(row.date),
          error_count: +!!values.specialReason,
          reason: values.reason,
          status: statusRequest.SEND,
          created_at: currentTime.current,
        }
        setRequestExists(true)
        await dispatch(postRequests(newRequest))
        break
      case 'UPDATE':
        const updateRequest = {
          check_in: dateTime.formatTime(values.check_in),
          check_out: dateTime.formatTime(values.check_out),
          error_count: +!!values.special_reason,
          reason: values.reason,
          update_at: currentTime.current,
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
                  <Col flex="auto">
                    {request?.create_at || currentTime.current}
                  </Col>
                </>
              </Row>
              <Row>
                <Col flex="150px">Register for date: </Col>
                <Col flex="auto">{dateTime.formatDate(row.work_date)}</Col>
              </Row>
              <Row>
                <Col flex="150px">Check-in:(*): </Col>
                <Col flex="auto">
                  <Controller
                    name="checkInTime"
                    defaultValue={dateTime.momentType('08:00')}
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        disabled={
                          request.status === statusRequest.CONFIRMED ||
                          request.status === statusRequest.APPROVED
                            ? true
                            : false
                        }
                        format={dateTime.formatTimeType}
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
                    ({dateTime.formatTime(row.check_in)})
                  </span>
                </Col>
              </Row>
              <Row>
                <Col flex="150px">Check-out:(*): </Col>
                <Col flex="auto">
                  <Controller
                    name="checkOutTime"
                    defaultValue={dateTime.momentType('17:00')}
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        disabled={
                          request.status === statusRequest.CONFIRMED ||
                          request.status === statusRequest.APPROVED
                            ? true
                            : false
                        }
                        format={dateTime.formatTimeType}
                        style={{ width: '100px', marginRight: '10px' }}
                        {...field}
                      />
                    )}
                  />
                  <span className="ant-form-text">
                    ({dateTime.formatTime(row.check_out)})
                  </span>
                </Col>
              </Row>
              <Row>
                <Col flex="150px">Specical reason </Col>
                <Col flex="auto">
                  <Controller
                    name="specialReason"
                    control={control}
                    render={({ field }) => (
                      <Checkbox.Group
                        disabled={
                          request.status === statusRequest.CONFIRMED ||
                          request.status === statusRequest.APPROVED
                            ? true
                            : false
                        }
                        {...field}
                      >
                        <Row style={{ marginBottom: 0 }}>
                          <Checkbox value={1}>
                            Check-in not counted as error
                          </Checkbox>
                          <Checkbox value={0}>
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
                      name="reasonInput"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input.TextArea
                            rows={4}
                            disabled={
                              request.status === statusRequest.CONFIRMED ||
                              request.status === statusRequest.APPROVED
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
                  {requestExists &&
                    request.status !== statusRequest.CONFIRMED &&
                    statusRequest.APPROVED && (
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
  handleCloseForget: PropTypes.func,
}
export default ForgetModal
