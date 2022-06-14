import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Row, Col, Skeleton, TimePicker } from 'antd'
import {
  DialogRequest,
  dateTime,
  typeRequest,
  handleField,
  buttonForm,
  tryCatch,
  endPoint,
  messageRequest,
  requestSlice,
} from '../../index'
import styles from './RegisterOT.module.scss'
import moment from 'moment'

const RegisterOT = ({ isOpen, row, handleCloseOT }) => {
  const [requestExists, setRequestExists] = useState(false)
  const [errorTimeOT, setErrorTimeOT] = useState(false)

  const dispatch = useDispatch()

  const dateIn = new Date(row.checkin_original).getTime()
  const dateOut = new Date(row.checkout_original).getTime()
  const DateOT = (dateOut - dateIn) / (1000 * 3600) - 10
  const actualOvertime = new Date(DateOT * 60 * 60 * 1000)
    .toISOString()
    .slice(11, 16)

  const schema = yup.object().shape({
    reasonInput: yup
      .string()
      .required('Please enter reason')
      .max(100, 'Please enter not too 100 characters'),
    timeRequestOT: yup.date().nullable().required('Please enter timeRequestOT'),
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
    const checkRequestExists = async () => {
      await dispatch(
        requestSlice.getRequestsOfDay({
          url: endPoint.GET_REQUEST_OT,
          date: row.work_date,
        }),
      )
    }
    checkRequestExists()
  }, [])

  useEffect(() => {
    const checkRequestExists = async () => {
      await dispatch(
        requestSlice.getRequestsOfDay({
          url: endPoint.GET_REQUEST_OT,
          date: row.work_date,
        }),
      )
    }
    checkRequestExists()
  }, [])

  const date2 = new Date(`01/01/2022 ${request.request_ot_time}`)

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue('reasonInput', request.reason)
      setValue('timeRequestOT', moment(date2))
      setRequestExists(true)
    }
  }, [request])

  const onSubmit = async (values, e) => {
    if (
      dateTime.timeToDecimal(dateTime.formatTime(values.timeRequestOT)) > DateOT
    ) {
      setErrorTimeOT(true)
      return null
    }
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()

    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_OT,
          request_for_date: row.work_date,
          check_in: dateTime.formatTime(row.checkin_original),
          check_out: dateTime.formatTime(row.checkout_original),
          request_ot_time: dateTime.formatTime(values.timeRequestOT),
          reason: values.reasonInput,
        }

        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.postRequests({
              url: endPoint.POST_REQUEST_OT,
              requestData: newRequest,
            }),
          ),
          messageRequest.CREATE,
          handleCloseOT,
        )
        break
      case 'UPDATE':
        const updateRequest = {
          request_type: typeRequest.REQUEST_OT,
          request_for_date: row.work_date,
          check_in: dateTime.formatTime(row.checkin_original),
          check_out: dateTime.formatTime(row.checkout_original),
          request_ot_time: dateTime.formatTime(values.timeRequestOT),
          reason: values.reasonInput,
        }
        console.log(updateRequest)
        await tryCatch.handleTryCatch(
          dispatch(
            requestSlice.putRequests({
              id: request.id,
              requestData: updateRequest,
              url: endPoint.PUT_REQUEST_OT,
            }),
          ),
          messageRequest.UPDATE,
          handleCloseOT,
        )
        break
      case 'DELETE':
        await tryCatch.handleTryCatch(
          dispatch(requestSlice.deleteRequests(request.id)),
          messageRequest.DELETE,
          handleCloseOT,
        )
        break
      default:
        throw new Error('An error occurred')
    }
  }
  const handleCloseModal = () => {
    handleCloseOT()
    dispatch(
      requestSlice.getRequestsOfDay({
        url: endPoint.GET_REQUEST_LEAVE_OF_DAY,
        date: -1,
      }),
    )
  }

  return (
    <DialogRequest
      isOpen={isOpen}
      handleModal={handleCloseModal}
      title="Register Overtime"
      listButton={buttonForm.formRequestButton}
      statusRequest={request.status}
      requestExists={requestExists}
      statusGetRequest={status}
    >
      <>
        <form
          id="myForm"
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          {status === 'loading' ? (
            <Skeleton paragraph={{ rows: 10 }}></Skeleton>
          ) : (
            <>
              <Row>
                <Col flex="150px">Register for date: </Col>
                <Col flex="auto">{dateTime.formatDate(row?.work_date)}</Col>
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
                  <Col flex="150px">Request OT: </Col>
                  <Col flex="auto">
                    <Controller
                      name="timeRequestOT"
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
                        </>
                      )}
                    />
                  </Col>
                  <Col flex="100%">
                    {errorTimeOT && (
                      <span className={styles.errorField}>
                        OT time must be less Actual Overtime
                      </span>
                    )}
                    {errors.timeRequestOT && (
                      <span className={styles.errorField}>
                        {errors.timeRequestOT?.message}
                      </span>
                    )}
                  </Col>
                </div>
                <div className={styles.groupCol}>
                  <Col flex="150px">Actual Overtime: </Col>
                  <Col flex="auto">{actualOvertime}</Col>
                </div>
              </Row>
              <Row>
                <Col flex="100%">
                  <h3>NOTE:</h3>
                </Col>
                <Col flex="100%">
                  <span>
                    - Thời gian bắt đầu được tính OT là sau 01:00 sau giờ kết
                    thúc làm việc chính thức
                  </span>
                </Col>
                <Col flex="100%">
                  <p>
                    Ví dụ ca làm việc từ 08:00 AM đến 17:00 PM, thì thời gian
                    được bắt đầu tính OT là 18:00 PM
                  </p>
                </Col>
                <Col flex="100%">
                  <span>
                    - Thời gian request OT
                    <span style={{ color: 'red' }}> không lớn hơn </span> thời
                    gian Overtime Actual. Các trường hợp OT khi remote cần yêu
                    cầu qua email.
                  </span>
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
                          rows={4}
                          disabled={handleField.disableField(request.status)}
                          {...field}
                          autoSize={{ minRows: 5, maxRows: 5 }}
                          style={{ border: ' black 1px solid' }}
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

RegisterOT.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseOT: PropTypes.func,
}
export default RegisterOT
