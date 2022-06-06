/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import moment from 'moment'
import ForgetModal from './forgetModal/forgetModal'
import LeaveModal from './leaveModal/leaveModal'
import LateEarly from './RgLateEarly/index/index'

const ItemTimeSheet = ({ row }) => {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
    isOpenLateEarly: false,
  })
  const handleClickModal = (type) => {
    const modalType = type.toUpperCase()
    switch (modalType) {
      case 'FORGET':
        setIsOpen({
          ...isOpen,
          isOpenForget: !isOpen.isOpenForget,
        })
        break
      case 'LEAVE':
        setIsOpen({
          ...isOpen,
          isOpenLeave: !isOpen.isOpenLeave,
        })
        break
      case 'LATE_EARLY':
        setIsOpen({
          ...isOpen,
          isOpenLateEarly: !isOpen.isOpenLeave,
        })
        break
      default:
        throw new Error('An error occurred')
    }
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px',
      }}
    >
      <div>{moment.unix(row.work_date).format('YYYY/MM/DD')}</div>
      <div>{moment(row.check_in).format('hh:mm:ss a')}</div>
      <div>{moment(row.check_out).format('hh:mm:ss a')}</div>
      <div>{row.late}</div>
      <div>{row.early}</div>
      <div>{row.work_time}</div>
      <div>{row.in_office}</div>
      <button
        type="button"
        onClick={() => {
          handleClickModal('forget')
        }}
      >
        Forget
      </button>
      <button
        type="button"
        onClick={() => {
          handleClickModal('leave')
        }}
      >
        Leave
      </button>
      <button
        type="button"
        onClick={() => {
          handleClickModal('late_early')
        }}
      >
        Late_Early
      </button>
      {isOpen.isOpenForget && (
        <ForgetModal
          isOpen={isOpen.isOpenForget}
          row={row}
          handleCloseForget={() => {
            setIsOpen((isOpen.isOpenForget = false))
          }}
        ></ForgetModal>
      )}
      {isOpen.isOpenLeave && (
        <LeaveModal
          isOpen={isOpen.isOpenLeave}
          row={row}
          handleCloseLeave={() => {
            setIsOpen((isOpen.isOpenLeave = false))
          }}
        ></LeaveModal>
      )}

      <LateEarly
        isOpen={isOpen.isOpenLateEarly}
        row={row}
        handleCloseLateEarly={() => {
          setIsOpen((isOpen.isOpenLateEarly = false))
        }}
      ></LateEarly>
    </div>
  )
}

export default ItemTimeSheet
