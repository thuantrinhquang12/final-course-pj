import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Row, Col, Skeleton, TimePicker } from 'antd'
import {
  getRequests,
  postRequests,
  putRequests,
  deleteRequests,
} from '../leaveModal/requestSlice'
typeStatusRequest
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

import styles from '../leaveModal/leaveModal.module.scss'

const LeaveModal = ({ isOpen, row, handleCloseOT }) => {
  const [requestExists, setRequestExists] = useState(false)
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
    resolver: yupResolver(schema),
  })

  const { request, status } = useSelector((state) => state.requests)

  useEffect(() => {
    if (row.requests.length !== 0) {
      for (const request of row.requests) {
        if (request.request_type === typeRequest.REQUEST_OT) {
          setRequestExists(true)
          dispatch(getRequests(request.request_id))
          break
        }
      }
    }
  }, [])

  useEffect(() => {
    if (Object.keys(request).length !== 0) {
      setValue('reasonInput', request.reason)
      setValue('reasonInput', request.reason)
    }
  }, [request])

  const onSubmit = async (values, e) => {
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_OT,
          request_for_date: dateTime.formatTimestampToDate(row.work_date),
          reason: values.reasonInput,
          status: typeStatusRequest.SEND,
          created_at: currentTime.current,
        }

        await tryCatch.handleTryCatch(
          dispatch(postRequests(newRequest)),
          messageRequest.CREATE,
          handleCloseOT,
        )
        break
      case 'UPDATE':
        const updateRequest = {
          request_type: typeRequest.REQUEST_OT,
          reason: values.reasonInput,
          update_at: currentTime.current,
        }
        await tryCatch.handleTryCatch(
          dispatch(putRequests({ id: request.id, requestData: updateRequest })),
          messageRequest.UPDATE,
          handleCloseOT,
        )
        break
      case 'DELETE':
        await tryCatch.handleTryCatch(
          dispatch(deleteRequests(request.id)),
          messageRequest.DELETE,
          handleCloseOT,
        )
        break
      default:
        throw new Error('An error occurred')
    }
  }

  return (
    <DialogRequest
      isOpen={isOpen}
      handleModal={handleCloseOT}
      title="Register Overtime"
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
                          {errors.checkInTime && (
                            <span className={styles.errorField}>
                              {errors.checkInTime?.message}
                            </span>
                          )}
                        </>
                      )}
                    />
                  </Col>
                </div>
                <div className={styles.groupCol}>
                  <Col flex="150px">Actual Overtime: </Col>
                  <Col flex="auto">
                    {row?.checkout_original - row?.checkin_original}
                  </Col>
                </div>
              </Row>
              <Row>
                <Col flex="100%">
                  <h3>NOTE:</h3>
                </Col>
                <Col flex="100%">
                  <p>
                    Thời gian bắt đầu được tính OT là sau 01:00 sau giờ kết thúc
                    làm việc chính thức
                  </p>
                </Col>
                <Col flex="100%">
                  <p>
                    Ví dụ ca làm việc từ 08:00 AM đến 17:00 PM, thì thời gian
                    được bắt đầu tính OT là 18:00 PM
                  </p>
                </Col>
                <Col flex="100%">
                  <span>
                    - Thời gian request OT <span>không lớn hơn</span> thời gian
                    Overtime Actual. Các trường hợp OT khi remote cần yêu cầu
                    qua email.
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
                        <Input.TextAreas
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
  handleCloseOT: PropTypes.func,
  // row: PropTypes.shape({
  //   requests: PropTypes.array,
  //   work_date: PropTypes.string,
  //   check_in: PropTypes.string,
  //   check_out: PropTypes.string,
  // }),
}
export default LeaveModal
