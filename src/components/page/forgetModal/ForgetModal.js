import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { TimePicker, Input, Checkbox, Row, Col, Skeleton } from 'antd'
import {
  getRequests,
  postRequests,
  putRequests,
  deleteRequests,
} from './requestSlice'
import {
  DialogRequest,
  dateTime,
  typeStatusRequest,
  typeRequest,
  handleDateTime,
  handleField,
  buttonForm,
  tryCatch,
  messageRequest,
} from '../../index'
import styles from './ForgetModal.module.scss'

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
    defaultValues: {
      checkInTime: dateTime.momentType('08:00'),
      checkOutTime: dateTime.momentType('17:00'),
    },

    resolver: yupResolver(schema),
  })

  const { request, status } = useSelector((state) => state.requests)

  useEffect(() => {
    if (row.requests.length !== 0) {
      for (const request of row.requests) {
        if (request.request_type === typeRequest.REQUEST_FORGET) {
          setRequestExists(true)
          dispatch(requestSlice.getRequests(request.request_id))
        }
      }
    }
  }, [])

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue('checkInTime', dateTime.momentType(request.check_in))
      setValue('checkOutTime', dateTime.momentType(request.check_out))
      setValue('specialReason', request.special_reason)
      setValue('reasonInput', request.reason)
    }
  }, [request])

  const onSubmit = async (values, e) => {
    console.log()
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_FORGET,
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          request_for_date: dateTime.formatDate(row.work_date),
          error_count: +((values.specialReason || []).length !== 0),
          special_reason: values.specialReason || [],
          reason: values.reasonInput,
          status: typeStatusRequest.SEND,
          created_at: currentTime.current,
        }
        await tryCatch.handleTryCatch(
          dispatch(requestSlice.postRequests(newRequest)),
          messageRequest.CREATE,
          handleCloseModal,
        )
        break
      case 'UPDATE':
        const updateRequest = {
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          error_count: +((values.specialReason || []).length !== 0),
          special_reason: values.specialReason || [],
          reason: values.reasonInput,
          update_at: currentTime.current,
        }
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.putRequests({
              id: request.id,
              requestData: updateRequest,
            }),
          ),
          messageRequest.UPDATE,
          handleCloseModal,
        )
        break
      case 'DELETE':
        await tryCatch.handleTryCatch(
          dispatch(requestSlice.deleteRequests(request.id)),
          messageRequest.DELETE,
          handleCloseModal,
        )
        break
      default:
        throw new Error('An error occurred')
    }
  }

  const handleCloseModal = () => {
    handleCloseForget()
    dispatch(requestSlice.getRequests(-1))
  }

  return (
    <DialogRequest
      isOpen={isOpen}
      handleModal={handleCloseModal}
      title="Register Forget Check-in/Check-out"
      listButton={buttonForm.formRequestButton}
      statusRequest={request.status}
      requestExists={requestExists}
      statusGetRequest={status}
    >
      <>
        <form id="myForm" onSubmit={handleSubmit(onSubmit)}>
          {status === 'loading' ? (
            <Skeleton paragraph={{ rows: 10 }}></Skeleton>
          ) : (
            <>
              {requestExists && (
                <Row>
                  <>
                    <Col flex="150px">Registration date: </Col>
                    <Col flex="auto">{request?.create_at}</Col>
                  </>
                </Row>
              )}
              <Row>
                <Col flex="150px">Register for date: </Col>
                <Col flex="auto">
                  {dateTime.formatTimestampToDate(row.work_date)}
                </Col>
              </Row>
              <Row>
                <Col flex="150px">
                  Check-in: <span className={styles.requiredField}>(*)</span>
                </Col>
                <Col flex="auto">
                  <Controller
                    name="checkInTime"
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
                <Col flex="150px">
                  Check-out: <span className={styles.requiredField}>(*)</span>
                </Col>
                <Col flex="auto">
                  <Controller
                    name="checkOutTime"
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
                <Col flex="150px">Special reason: </Col>
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
                            <Checkbox value={0}>
                              Check-in not counted as error
                            </Checkbox>
                            <Checkbox value={1}>
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
                <Col flex="150px" style={{ marginBottom: '10px' }}>
                  Reason: <span className={styles.requiredField}>(*)</span>
                </Col>
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
            </>
          )}
        </form>
      </>
    </DialogRequest>
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
