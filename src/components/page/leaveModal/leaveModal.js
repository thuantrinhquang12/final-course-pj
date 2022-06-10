import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { TimePicker, Input, Checkbox, Radio, Row, Col, Skeleton } from 'antd'
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
  requestSlice,
} from '../../index'

import styles from './LeaveModal.module.scss'

const LeaveModal = ({ isOpen, row, handleCloseLeave }) => {
  const [requestExists, setRequestExists] = useState(false)
  const [leaveAllDayCheck, setLeaveAllDayCheck] = useState(false)
  const [leaveStart, setLeaveStart] = useState()
  const [leaveEnd, setLeaveEnd] = useState()
  const [timeCount, setTimeCount] = useState()
  const currentTime = useRef(handleDateTime.getCurrentTime())
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    reasonInput: yup
      .string()
      .required('Please enter reason')
      .max(100, 'Please enter not too 100 characters'),
  })
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      radioPaid: 'paid',
    },
    resolver: yupResolver(schema),
  })

  const { request, status } = useSelector((state) => state.requests)

  useEffect(() => {
    if (row.requests.length !== 0) {
      for (const request of row.requests) {
        if (
          request.request_type === typeRequest.REQUEST_LEAVE_PAID ||
          request.request_type === typeRequest.REQUEST_LEAVE_UNPAID
        ) {
          setRequestExists(true)
          dispatch(requestSlice.getRequests(request.request_id))
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue(
        'checkboxLeaveAllDay',
        request.leave_all_day === typeRequest.LEAVE_ALL_DAY
          ? [typeRequest.LEAVE_ALL_DAY]
          : [],
      )
      setValue(
        'radioPaid',
        request.request_type === typeRequest.REQUEST_LEAVE_PAID
          ? 'paid'
          : request.request_type === typeRequest.REQUEST_LEAVE_UNPAID
          ? 'unpaid'
          : '',
      )
      setValue('reasonInput', request.reason)
      setLeaveStart(request?.leave_start)
      setLeaveEnd(request?.leave_end)
    }
  }, [request])

  useEffect(() => {
    if (leaveStart && leaveEnd) {
      const start = moment(leaveStart, dateTime.formatTimeType)
      const end = moment(leaveEnd, dateTime.formatTimeType)
      const millisecond = end.diff(start, 'millisecond')
      const timeCount = moment()
        .hour(0)
        .minute(0)
        .millisecond(millisecond)
        .format(dateTime.formatTimeType)
      setTimeCount(timeCount)
    }
  }, [leaveStart, leaveEnd])

  const handleOnChange = (values, timeString) => {
    const [leaveStart, leaveEnd] = timeString
    setLeaveStart(leaveStart)
    setLeaveEnd(leaveEnd)
  }

  const onSubmit = async (values, e) => {
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type:
            values.radioPaid == 'paid'
              ? typeRequest.REQUEST_LEAVE_PAID
              : values.radioPaid == 'unpaid'
              ? typeRequest.REQUEST_LEAVE_UNPAID
              : '',
          leave_start: leaveAllDayCheck ? '' : leaveStart,
          leave_end: leaveAllDayCheck ? '' : leaveEnd,
          request_for_date: dateTime.formatTimestampToDate(row.work_date),
          leave_all_day:
            (values.checkboxLeaveAllDay || []).length !== 0
              ? typeRequest.LEAVE_ALL_DAY
              : typeRequest.LEAVE_BY_RANGE,
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
          request_type:
            values.radioPaid == 'paid'
              ? typeRequest.REQUEST_LEAVE_PAID
              : values.radioPaid == 'unpaid'
              ? typeRequest.REQUEST_LEAVE_UNPAID
              : '',
          leave_start: leaveStart,
          leave_end: leaveEnd,
          leave_all_day:
            (values.checkboxLeaveAllDay || []).length !== 0
              ? typeRequest.LEAVE_ALL_DAY
              : typeRequest.LEAVE_BY_RANGE,
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

  const handleChangeLeaveAllDay = (e) => {
    e.target.checked ? setLeaveAllDayCheck(true) : setLeaveAllDayCheck(false)
  }

  const handleCloseModal = () => {
    handleCloseLeave()
    dispatch(requestSlice.getRequests(-1))
  }

  return (
    <DialogRequest
      isOpen={ispen}
      handleModal={handleCloseModal}
      title="Register Leave"
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
                  {dateTime.formatTimestampToDate(row?.work_date)}
                </Col>
              </Row>
              <Row>
                <div className={styles.groupCol}>
                  <Col flex="150px">Check-in: </Col>
                  <Col flex="auto">
                    {dateTime.formatTime(row?.checkin_original)}
                  </Col>
                </div>
                <div className={styles.groupCol}>
                  <Col flex="150px">Check-out: </Col>
                  <Col flex="auto">
                    {dateTime.formatTime(row?.checkout_original)}
                  </Col>
                </div>
              </Row>
              <Row>
                <div className={styles.groupCol}>
                  <Col flex="150px">Work time: </Col>
                  <Col flex="auto">{dateTime.formatTime(row?.work_time)}</Col>
                </div>
                <div className={styles.groupCol}>
                  <Col flex="150px">Lack time: </Col>
                  <Col flex="auto">{dateTime.formatTime(row?.lack_time)}</Col>
                </div>
              </Row>
              <Row>
                <Col flex="auto">
                  <Controller
                    name="checkboxLeaveAllDay"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Checkbox.Group
                          disabled={handleField.disableField(request.status)}
                          {...field}
                        >
                          <Checkbox
                            onChange={handleChangeLeaveAllDay}
                            value={typeRequest.LEAVE_ALL_DAY}
                          >
                            Leave All Day
                          </Checkbox>
                        </Checkbox.Group>
                      </>
                    )}
                  />
                </Col>
              </Row>
              <Row style={{ flexWrap: 'nowrap', alignItems: 'center' }}>
                <Col flex="150px">Range</Col>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <Col flex="auto">
                      <TimePicker.RangePicker
                        disabled={
                          handleField.disableField(request.status) ||
                          handleField.disableFieldWhenChoose(leaveAllDayCheck)
                        }
                        showTime={{
                          defaultValue:
                            Object.keys(request).length !== 0
                              ? [
                                  moment(
                                    request?.leave_start,
                                    dateTime.formatTimeType,
                                  ),
                                  moment(
                                    request?.leave_end,
                                    dateTime.formatTimeType,
                                  ),
                                ]
                              : [],
                        }}
                        onChange={handleOnChange}
                        format={dateTime.formatTimeType}
                        style={{
                          width: '201px',
                          marginRight: '10px',
                          maxWidth: '100%',
                        }}
                      />
                    </Col>
                  </div>
                  <div>
                    <Controller
                      name="radioPaid"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Radio.Group
                            disabled={handleField.disableField(request.status)}
                            {...field}
                          >
                            <Radio value={'paid'}>Paid</Radio>
                            <Radio value={'unpaid'}>Unpaid</Radio>
                          </Radio.Group>
                        </>
                      )}
                    />
                  </div>
                  <div>
                    | TimeCount:
                    <span
                      style={handleDateTime.compareTime(
                        timeCount,
                        row.lack_time,
                      )}
                    >
                      {timeCount}
                    </span>
                  </div>
                </div>
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
                </Col>
              </Row>
            </>
          )}
        </form>
      </>
    </DialogRequest>
  )
}

LeaveModal.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseLeave: PropTypes.func,
  // row: PropTypes.shape({
  //   requests: PropTypes.array,
  //   work_date: PropTypes.string,
  //   check_in: PropTypes.string,
  //   check_out: PropTypes.string,
  // }),
}
export default LeaveModal
