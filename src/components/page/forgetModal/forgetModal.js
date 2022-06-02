import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
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
} from './requestSlice'
import {
  Dialog,
  dateTime,
  statusRequest,
  typeRequest,
  handleDateTime,
  handleField,
} from '../../index'
import styles from './forgetModal.module.scss'

const ForgetModal = ({ isOpen, row, handleCloseForget }) => {
  const [requestExists, setRequestExists] = useState(false)
  const currentTime = useRef(handleDateTime.getCurrentTime())
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    reasonInput: yup
      .string()
      .required('Please enter reason')
      .max(100, 'Please enter not too 100 characters'),
    checkInTime: yup.date().nullable().required('Please enter check-in'),
    checkOutTime: yup.date().nullable().required('Please enter check-out'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { request, status } = useSelector((state) => state.requests)

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

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue('checkInTime', dateTime.momentType(request.check_in))
      setValue('checkOutTime', dateTime.momentType(request.check_out))
      setValue('specialReason', !!request.error_count ? [0, 1] : [])
      setValue('reasonInput', request.reason)
    }
  }, [request])

  const onSubmit = async (values, e) => {
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_FORGET,
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          request_for_date: dateTime.formatDate(row.work_date),
          error_count: +((values.specialReason || []).length !== 0),
          reason: values.reasonInput,
          status: statusRequest.SEND,
          created_at: currentTime.current,
        }
        setRequestExists(true)
        await dispatch(postRequests(newRequest))
        break
      case 'UPDATE':
        const updateRequest = {
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          error_count: +((values.specialReason || []).length !== 0),
          reason: values.reasonInput,
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
        throw new Error('An error occurred')
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
                      <>
                        <TimePicker
                          disabled={handleField.disableField(request.status)}
                          format={dateTime.formatTimeType}
                          style={{
                            width: '100px',
                            marginRight: '10px',
                            maxWidth: '100%',
                          }}
                          {...field}
                        />
                        {errors.checkInTime && (
                          <span className={styles.errorField}>
                            {errors.checkInTime?.message}
                          </span>
                        )}
                      </>
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
                      <>
                        <TimePicker
                          disabled={handleField.disableField(request.status)}
                          format={dateTime.formatTimeType}
                          style={{ width: '100px', marginRight: '10px' }}
                          {...field}
                        />
                        {errors.checkOutTime && (
                          <span className={styles.errorField}>
                            {errors.checkOutTime?.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                  <span className="ant-form-text">
                    ({dateTime.formatTime(row.check_out)})
                  </span>
                </Col>
              </Row>
              <Row>
                <Col flex="150px">Special reason </Col>
                <Col flex="auto">
                  <Controller
                    name="specialReason"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Checkbox.Group
                          disabled={handleField.disableField(request.status)}
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
                      </>
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
                            disabled={handleField.disableField(request.status)}
                            {...field}
                          />
                          {errors.reasonInput && (
                            <span className={styles.errorField}>
                              {errors.reasonInput?.message}
                            </span>
                          )}
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
                    request.status !== statusRequest.APPROVED &&
                    request.status !== statusRequest.CONFIRMED && (
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
  // row: PropTypes.shape({
  //   requests: PropTypes.array,
  //   work_date: PropTypes.string,
  //   check_in: PropTypes.string,
  //   check_out: PropTypes.string,
  // }),
}
export default ForgetModal
