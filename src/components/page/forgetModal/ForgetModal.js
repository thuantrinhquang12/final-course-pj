import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { TimePicker, Input, Checkbox, Row, Col, Skeleton } from 'antd'
import {
  DialogRequest,
  dateTime,
  typeStatusRequest,
  typeRequest,
  handleField,
  buttonForm,
  tryCatch,
  messageRequest,
  endPoint,
  requestSlice,
} from '../../index'
import { getErrorCount } from './handleErrorCount'
import styles from './ForgetModal.module.scss'

const ForgetModal = ({ isOpen, row, handleCloseForget }) => {
  const [requestExists, setRequestExists] = useState(false)

  const dispatch = useDispatch()
  const { request, status } = useSelector((state) => state.requests)

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

  useEffect(() => {
    const checkRequestExists = async () => {
      await dispatch(
        requestSlice.getRequestsOfDay({
          url: endPoint.GET_REQUEST_FORGET_OF_DAY,
          date: row.work_date,
        }),
      )
    }
    checkRequestExists()
  }, [])

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue(
        'checkInTime',
        dateTime.momentType(dateTime.formatTime(request?.check_in)),
      )
      setValue(
        'checkOutTime',
        dateTime.momentType(dateTime.formatTime(request?.check_out)),
      )
      setValue('specialReason', request.special_reason || [])
      setValue('reasonInput', request.reason)
      setRequestExists(true)
    }
  }, [request])

  const onSubmit = async (values, e) => {
    const { specialReason } = values
    const errorCount = getErrorCount(specialReason)
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_FORGET,
          request_for_date: row.work_date,
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          error_count: errorCount,
          reason: values.reasonInput,
          status: typeStatusRequest.SEND,
        }
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.postRequests({
              url: endPoint.POST_REQUEST_FORGET,
              requestData: newRequest,
            }),
          ),
          messageRequest.CREATE,
          handleCloseModal,
        )
        break
      case 'UPDATE':
        const updateRequest = {
          request_type: typeRequest.REQUEST_FORGET,
          request_for_date: row.work_date,
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          error_count: errorCount,
          reason: values.reasonInput,
        }
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.putRequests({
              id: request.id,
              requestData: updateRequest,
              url: endPoint.PUT_REQUEST_FORGET,
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
    dispatch(
      requestSlice.getRequestsOfDay({
        url: endPoint.GET_REQUEST_FORGET_OF_DAY,
        date: -1,
      }),
    )
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
            <Skeleton paragraph={{ rows: 10 }} />
          ) : (
            <>
              {requestExists && (
                <Row>
                  <Col flex="150px">Registration date: </Col>
                  <Col flex="auto">
                    {dateTime.formatDateTime(request?.create_at)}
                  </Col>
                </Row>
              )}
              <Row>
                <Col flex="150px">Register for date: </Col>
                <Col flex="auto">{row.work_date}</Col>
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
                          {...field}
                          style={{
                            width: '100px',
                            marginRight: '10px',
                            maxWidth: '100%',
                          }}
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
                    ({dateTime.formatTime(row.checkin_original)})
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
                    ({dateTime.formatTime(row.checkout_original)})
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
                      <Checkbox.Group
                        disabled={handleField.disableField(request.status)}
                        {...field}
                      >
                        <Row style={{ marginBottom: 0 }}>
                          <Checkbox value={1}>
                            Check-in not counted as error
                          </Checkbox>
                          <Checkbox value={2}>
                            Check-out not counted as error
                          </Checkbox>
                        </Row>
                      </Checkbox.Group>
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col flex="150px" style={{ marginBottom: '10px' }}>
                  Reason: <span className={styles.requiredField}>(*)</span>
                </Col>
                <Col flex="100%">
                  <Controller
                    name="reasonInput"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input.TextArea
                          autoSize={{ minRows: 5, maxRows: 5 }}
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
  row: PropTypes.object,
}

export default ForgetModal
