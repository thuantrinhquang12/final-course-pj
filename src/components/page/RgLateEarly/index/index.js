import React from 'react'
import { Row, Col, DatePicker, Space, Input } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import styles from './index.module.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import handleTime from './handleTime'
import moment from 'moment'
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
} from '../../../index'

const Index = ({ handleCloseLateEarly, isOpen, row }) => {
  const date = '2022-02-12'
  const { request, status } = useSelector((state) => state.requests)
  const dispatch = useDispatch()

  console.log('row', row)

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

  const onSubmit = async (values, e) => {
    console.log('check', values, e)
    const buttonSubmit = e.nativeEvent.submitter.name.toUpperCase()
    switch (buttonSubmit) {
      case 'REGISTER':
        const newRequest = {
          request_type: typeRequest.REQUEST_LATE_EARLY,
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          request_for_date: dateTime.formatDate(row.work_date),
          reason: values.reasonInput,
          status: typeStatusRequest.SEND,
          created_at: currentTime.current,
        }
        await tryCatch.handleTryCatch(
          dispatch(postRequests(newRequest)),
          messageRequest.CREATE,
          handleCloseLateEarly,
        )
        break
      case 'UPDATE':
        const updateRequest = {
          check_in: dateTime.formatTime(values.checkInTime),
          check_out: dateTime.formatTime(values.checkOutTime),
          reason: values.reasonInput,
          update_at: currentTime.current,
        }
        await tryCatch.handleTryCatch(
          dispatch(putRequests({ id: request.id, requestData: updateRequest })),
          messageRequest.UPDATE,
          handleCloseLateEarly,
        )
        break
      case 'DELETE':
        await tryCatch.handleTryCatch(
          dispatch(deleteRequests(request.id)),
          messageRequest.DELETE,
          handleCloseLateEarly,
        )
        break
      default:
        throw new Error('An error occurred')
    }
  }

  return (
    <>
      <DialogRequest
        title="Register Late/Early"
        handleModal={handleCloseLateEarly}
        isOpen={isOpen}
        listButton={buttonForm.formRequestButton}
        statusRequest={request.status}
        statusGetRequest={status}
      >
        <>
          <form id="myForm" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col xs={24} md={24} xl={24}>
                <div className={styles.formGroup}>
                  <Col xs={6} md={6} xl={4}>
                    <h3>Register for date:</h3>
                  </Col>
                  <Col xs={20} md={20} xl={20}>
                    <h3>{date}</h3>
                  </Col>
                </div>
              </Col>

              <Col xs={24} md={24} xl={24}>
                <div className={styles.formGroup}>
                  <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                    <Col xs={12} md={12} xl={8}>
                      <h3>Check-in:</h3>
                    </Col>
                    <Col xs={12} md={12} xl={16}>
                      <h3>{dateTime.formatTime(row?.checkin_original)}</h3>
                    </Col>
                  </Col>
                  <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                    <Col xs={12} md={12} xl={8}>
                      <h3>Check-out:</h3>
                    </Col>
                    <Col xs={12} md={12} xl={16}>
                      <h3>{dateTime.formatTime(row?.checkout_original)}</h3>
                    </Col>
                  </Col>
                </div>
              </Col>

              <Col xs={24} md={24} xl={24}>
                <div className={styles.formGroup}>
                  <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                    <Col xs={12} md={12} xl={8}>
                      <h3>Late time:</h3>
                    </Col>
                    <Col xs={12} md={12} xl={16}>
                      <h3 style={{ color: 'red' }}>
                        {handleTime('08:00', row.late) !== null
                          ? handleTime('08:00', row.late)
                          : ''}
                      </h3>
                    </Col>
                  </Col>
                  <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                    <Col xs={12} md={12} xl={8}>
                      <h3>Early:</h3>
                    </Col>
                    <Col xs={12} md={12} xl={16}>
                      <h3 style={{ color: 'red' }}>
                        {handleTime(row.early, '17:00') !== null
                          ? handleTime(row.early, '17:00')
                          : ''}
                      </h3>
                    </Col>
                  </Col>
                </div>
              </Col>

              <Col xs={24} md={24} xl={24}>
                <div className={styles.formGroup}>
                  <Col xs={24} md={12} xl={12} style={{ display: 'flex' }}>
                    <Col xs={6} md={12} xl={8}>
                      <h3>
                        Date cover up:{' '}
                        <span className={styles.requiredField}>(*)</span>
                      </h3>
                    </Col>
                    <Col xs={18} md={12} xl={16}>
                      <Controller
                        name="checkDateTime"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Space direction="vertical" size={12}>
                              <DatePicker
                                format={dateTime.formatDateTypeYear}
                                {...field}
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
                    <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                      <Col xs={12} md={10} xl={8}>
                        <h3>Overtime:</h3>
                      </Col>
                      <Col xs={12} md={14} xl={16}>
                        <h3>00:16</h3>
                      </Col>
                    </Col>
                    <Col xs={12} md={12} xl={12} style={{ display: 'flex' }}>
                      <Col xs={12} md={14} xl={11}>
                        <h3>Time request:</h3>
                      </Col>
                      <Col xs={12} md={10} xl={13}>
                        <h3>00:10</h3>
                      </Col>
                    </Col>
                  </Col>
                </div>
              </Col>

              <Col xs={24} md={24} xl={24}>
                <div className={styles.formGroup}>
                  <Col xs={4} md={4} xl={4} style={{ display: 'flex' }}>
                    <h3>
                      Reason: <span className={styles.requiredField}>(*)</span>
                    </h3>
                  </Col>
                  <Col xs={20} md={20} xl={20}>
                    <Controller
                      name="reasonInput"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input.TextArea
                            placeholder="Controlled autosize"
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
          </form>
        </>
      </DialogRequest>
    </>
  )
}

export default Index
