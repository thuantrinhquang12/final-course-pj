import React, { useState, useEffect } from 'react'
import { Modal, Row, Col, Select } from 'antd'
import { get, put } from '../../service/requestApi'
import {
  UserOutlined,
  FieldTimeOutlined,
  MailOutlined,
  HomeOutlined,
  DashboardOutlined,
  EditOutlined,
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import { typePopup } from '../../index'
import './ChangeShiff.scss'
import { checkShift } from './checkShift'
const ModalChangeShift = ({ modal, handleClose, handleUpdate }) => {
  const [shift, setShift] = useState(modal.data.shift_id)
  const [shiftList, setShiftList] = useState([])

  const { Option } = Select

  useEffect(() => {
    const getShiftList = async () => {
      const response = await get('admin/shift/index')
      setShiftList(response.data)
    }
    getShiftList()
  }, [])

  const handleChange = (value) => {
    setShift(value)
  }

  const handleSubmit = async () => {
    const response = await put(`admin/shift/update/${modal.data.id}`, {
      shift_id: shift,
    })
    if (response.status) {
      typePopup.popupNotice(
        typePopup.SUCCESS_MESSAGE,
        'Update Success',
        'Change Shift',
      )
      handleUpdate()
      handleClose()
    } else {
      typePopup.popupNotice(
        typePopup.ERROR_MESSAGE,
        'Update Failed',
        'Change Shift',
      )
    }
  }
  return (
    <>
      <Modal
        wrapClassName="change_Shift"
        title={<h2>Change Shift</h2>}
        visible={modal.isOpen}
        width={1000}
        onCancel={() => handleClose()}
        onOk={handleSubmit}
      >
        <div className="userInfo">
          <h2>User Info</h2>
          <Row>
            <Col xs={24} md={24} xl={24}>
              <Row>
                <Col xs={12} md={12} xl={12}>
                  <p>
                    <UserOutlined />
                    &nbsp;Member Name:&nbsp; {modal.data.member_name}
                  </p>
                </Col>
                <Col xs={12} md={12} xl={12}>
                  <p>
                    <MailOutlined /> &nbsp;Email: &nbsp; {modal.data.email}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} xl={12}>
                  <p>
                    <FieldTimeOutlined />
                    &nbsp; Check In: &nbsp; {modal.data.check_in}
                  </p>
                </Col>
                <Col xs={12} md={12} xl={12}>
                  <p>
                    <FieldTimeOutlined /> &nbsp;Check Out: &nbsp;{' '}
                    {modal.data.check_out}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} xl={12}>
                  <p>
                    <HomeOutlined /> &nbsp;Division: &nbsp;{' '}
                    {modal.data.division_name}
                  </p>
                </Col>
                <Col xs={12} md={12} xl={12}>
                  <p>
                    <DashboardOutlined />
                    &nbsp;Shift Name: &nbsp; {modal.data.shift_name}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={24} xl={24}>
                  <EditOutlined />
                  &nbsp; Change Shift: &nbsp;
                  <Select
                    defaultValue={`${modal.data.shift_name} - (${modal.data.check_in} - ${modal.data.check_out})`}
                    style={{
                      width: 170,
                    }}
                    onChange={handleChange}
                  >
                    {shiftList &&
                      shiftList.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {checkShift(
                              item.shift_name,
                              item.check_in,
                              item.check_out,
                            )}
                          </Option>
                        )
                      })}
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}
ModalChangeShift.propTypes = {
  modal: PropTypes.object,
  handleClose: PropTypes.func,
  handleUpdate: PropTypes.func,
}

export default ModalChangeShift
