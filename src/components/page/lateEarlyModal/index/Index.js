import React, { useState, useEffect } from 'react'
import { Row, Col, DatePicker, Space, Input, Skeleton } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import styles from './Index.module.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { handlePlusTime, handleFormat, handleSubTime } from './handleTime'
import { get } from '../../../service/requestApi'
import moment from 'moment'
import PropTypes from 'prop-types'

import {
  DialogRequest,
  dateTime,
  typeStatusRequest,
  typeRequest,
  handleDateTime,
  buttonForm,
  tryCatch,
  messageRequest,
  requestSlice,
  endPoint,
} from '../../../index'

const Index = ({ handleCloseLateEarly, isOpen, row }) => {
  const [requestExists, setRequestExists] = useState(false)
  const { request, status } = useSelector((state) => state.requests)
  const [overTime, setOverTime] = useState(null)
  const [validateTime, setValidateTime] = useState(false)
  const timeRequest = handleFormat(handlePlusTime(row.late, row.early))

  const getCompensation = async (date) => {
    const response = await get(
      `worksheet/show-date?work_date=${dateTime.formatDate(date)}`,
    )
      .then((res) => {
        const checkOut = dateTime.formatTime(res.checkout_original)
        const checkIn = dateTime.formatTime(res.checkin_original)
        return handleSubTime(checkIn, checkOut)
      })
      .catch(() => {
        return null
      })
    return response
  }

  const dispatch = useDispatch()

  useEffect(() => {
    const checkRequestExists = async () => {
      await dispatch(
        requestSlice.getRequestsOfDay({
          url: endPoint.GET_REQUEST_LATE_EARLY_OF_DAY,
          date: row.work_date,
        }),
      )
    }
    checkRequestExists()
  }, [])

  const schema = yup.object().shape({
    reasonInput: yup
      .string()
      .required('Please enter reason')
      .max(100, 'Please enter not too 100 characters'),
    checkDateTime: yup.date().nullable().required('Please enter dateTime'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      checkDateTime: moment().subtract(1, 'days'),
    },

    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue('reasonInput', request.reason)
      setRequestExists(true)
    }
  }, [request])

  useEffect(() => {
    let dateTime = moment().subtract(1, 'days')
    if (requestExists) {
      dateTime = new Date(request.compensation_date)
    }
    const getTimeOver = async () => {
      const response = await getCompensation(dateTime)
      setOverTime(response)
    }
    getTimeOver()
  }, [requestExists])

  const onSubmit = async (values, e) => {
    const overTM = +(overTime ? overTime : '00:00').replace(':', '')
    const timeRq = +(timeRequest ? timeRequest : '00:00').replace(':', '')

    if (!overTime) {
      setValidateTime(true)
    }

    if (overTM < timeRq) {
      return null
    }
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_LATE_EARLY,
          check_in: dateTime.formatTime(row.checkin_original),
          check_out: dateTime.formatTime(row.checkout_original),
          request_for_date: dateTime.formatDate(row.work_date),
          reason: values.reasonInput,
          compensation_time: overTime,
          compensation_date: dateTime.formatDate(values.checkDateTime),
          status: typeStatusRequest.SEND,
        }
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.postRequests({
              url: endPoint.POST_REQUEST_LATE_EARLY,
              requestData: newRequest,
            }),
          ),
          messageRequest.CREATE,
          handleCloseModal,
        )
        break
      case 'UPDATE':
        const updateRequest = {
          request_type: typeRequest.REQUEST_LATE_EARLY,
          check_in: dateTime.formatTime(row.checkin_original),
          check_out: dateTime.formatTime(row.checkout_original),
          request_for_date: dateTime.formatDate(row.work_date),
          reason: values.reasonInput,
          compensation_time: overTime,
          compensation_date: dateTime.formatDate(values.checkDateTime),
          status: typeStatusRequest.SEND,
        }
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.putRequests({
              id: request.id,
              requestData: updateRequest,
              url: endPoint.PUT_REQUEST_LATE_EARLY,
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
    handleCloseLateEarly()
    dispatch(
      requestSlice.getRequestsOfDay({
        url: endPoint.GET_REQUEST_LATE_EARLY_OF_DAY,
        date: -1,
      }),
    )
  }

  return (
    <>
      <DialogRequest
        title="Register Late/Early"
        handleModal={handleCloseModal}
        isOpen={isOpen}
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
                  <Row style={{ marginBottom: 0 }}>
                    <Col xs={24} md={24} xl={24}>
                      <div className={styles.formGroup}>
                        <Col xs={6} md={6} xl={4}>
                          Registration date:
                        </Col>
                        <Col xs={20} md={20} xl={20}>
                          {dateTime.formatDateTime(request?.create_at)}
                        </Col>
                      </div>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col xs={24} md={24} xl={24}>
                    <div className={styles.formGroup}>
                      <Col xs={6} md={6} xl={4}>
                        Register for date:
                      </Col>
                      <Col xs={20} md={20} xl={20}>
                        {row.work_date}
                      </Col>
                    </div>
                  </Col>

                  <Col xs={24} md={24} xl={24}>
                    <div className={styles.formGroup}>
                      <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                        <Col xs={12} md={12} xl={8}>
                          Check-in:
                        </Col>
                        <Col xs={12} md={12} xl={16}>
                          {dateTime.formatTime(row?.checkin_original)}
                        </Col>
                      </Col>
                      <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                        <Col xs={12} md={12} xl={8}>
                          Check-out:
                        </Col>
                        <Col xs={12} md={12} xl={16}>
                          {dateTime.formatTime(row?.checkout_original)}
                        </Col>
                      </Col>
                    </div>
                  </Col>

                  <Col xs={24} md={24} xl={24}>
                    <div className={styles.formGroup}>
                      <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                        <Col xs={12} md={12} xl={8}>
                          Late time:
                        </Col>
                        <Col xs={12} md={12} xl={16}>
                          <h3 style={{ color: 'red' }}>
                            {row.late ? row.late : ''}
                          </h3>
                        </Col>
                      </Col>
                      <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                        <Col xs={12} md={12} xl={8}>
                          Early:
                        </Col>
                        <Col xs={12} md={12} xl={16}>
                          <h3 style={{ color: 'red' }}>
                            {row.early ? row.early : ''}
                          </h3>
                        </Col>
                      </Col>
                    </div>
                  </Col>

                  <Col xs={24} md={24} xl={24}>
                    <div className={styles.formGroup}>
                      <Col xs={24} md={12} xl={12} style={{ display: 'flex' }}>
                        <Col xs={6} md={12} xl={8}>
                          Date cover up:{' '}
                          <span className={styles.requiredField}>(*)</span>
                        </Col>
                        <Col xs={18} md={12} xl={16}>
                          <Controller
                            name="checkDateTime"
                            control={control}
                            render={({ field }) => (
                              <>
                                <Space direction="vertical" size={12}>
                                  <DatePicker
                                    disabledDate={(current) =>
                                      current.isAfter(moment())
                                    }
                                    format={dateTime.formatDateTypeYear}
                                    onChange={(e) => {
                                      const res = async () => {
                                        const respon = await getCompensation(e)
                                        setOverTime(respon)
                                        setValidateTime(false)
                                      }
                                      res()
                                      return field.onChange(e)
                                    }}
                                    defaultValue={
                                      request.compensation_date
                                        ? moment(request.compensation_date)
                                        : moment().subtract(1, 'days')
                                    }
                                  />
                                  {errors.checkDateTime && (
                                    <span className={styles.requiredField}>
                                      {errors.checkDateTime?.message}
                                    </span>
                                  )}
                                </Space>
                              </>
                            )}
                          />
                        </Col>
                      </Col>
                      <Col
                        xs={24}
                        md={12}
                        xl={12}
                        style={{ display: 'flex' }}
                        className={styles.formChild}
                      >
                        <Col
                          xs={12}
                          md={12}
                          xl={12}
                          style={{ display: 'flex' }}
                        >
                          <Col xs={12} md={10} xl={8}>
                            Overtime:
                          </Col>
                          <Col xs={12} md={14} xl={16}>
                            {validateTime && (
                              <span className={styles.requiredField}>
                                Time is not valid
                              </span>
                            )}
                            {overTime}
                          </Col>
                        </Col>
                        <Col
                          xs={12}
                          md={12}
                          xl={12}
                          style={{ display: 'flex' }}
                        >
                          <Col xs={12} md={14} xl={11}>
                            Time request:
                          </Col>
                          <Col xs={12} md={10} xl={13}>
                            <h3
                              style={handleDateTime.compareTime(
                                overTime ? overTime : '00:00',
                                timeRequest,
                              )}
                            >
                              {timeRequest}
                            </h3>
                          </Col>
                        </Col>
                      </Col>
                    </div>
                  </Col>

                  <Col xs={24} md={24} xl={24}>
                    <div className={styles.formGroup}>
                      <Col xs={6} md={6} xl={4} style={{ display: 'flex' }}>
                        Reason:
                        <span className={styles.requiredField}>(*)</span>
                      </Col>
                      <Col xs={18} md={18} xl={20}>
                        <Controller
                          name="reasonInput"
                          control={control}
                          render={({ field }) => (
                            <>
                              <Input.TextArea
                                autoSize={{
                                  minRows: 4,
                                  maxRows: 7,
                                }}
                                {...field}
                              />
                              {errors.reasonInput && (
                                <span className={styles.requiredField}>
                                  {errors.reasonInput?.message}
                                </span>
                              )}
                            </>
                          )}
                        />
                      </Col>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </form>
        </>
      </DialogRequest>
    </>
  )
}

Index.propTypes = {
  handleCloseLateEarly: PropTypes.func,
  isOpen: PropTypes.bool,
  row: PropTypes.object,
}

export default Index
