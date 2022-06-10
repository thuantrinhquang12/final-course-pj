import React, { useState } from 'react'
import moment from 'moment'
import ForgetModal from './forgetModal/ForgetModal'
import LeaveModal from './leaveModal/LeaveModal'
import RegisterOT from './registerOT/RegisterOT'

const ItemTimeSheet = ({ row }) => {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
    isOpenOT: false,
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
      case 'OT':
        setIsOpen({
          ...isOpen,
          isOpenOT: !isOpen.isOpenOT,
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
      <div>Date: {moment.unix(row.work_date).format('YYYY/MM/DD')}</div>
      <div>Checkin: {moment(row.check_in).format('hh:mm:ss a')}</div>
      <div>Check out: {moment(row.check_out).format('hh:mm:ss a')}</div>
      <div>Late: {row.late}</div>
      <div>Early: {row.early}</div>
      <div>In office: {row.in_office}</div>
      <div>OT: {row.ot}</div>
      <div>Work time: {row.work_time}</div>
      <div>Lack: {row.lack_time}</div>
      <div>Pleave: {row.pleave}</div>
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
          handleClickModal('ot')
        }}
      >
        OT
      </button>
      {isOpen.isOpenForget && (
        <ForgetModal
          isOpen={isOpen.isOpenForget}
          row={row}
          handleCloseForget={() => {
            setIsOpen((isOpen.isOpenForget = false))
          }}
        />
      )}
      {isOpen.isOpenLeave && (
        <LeaveModal
          isOpen={isOpen.isOpenLeave}
          row={row}
          handleCloseLeave={() => {
            setIsOpen((isOpen.isOpenLeave = false))
          }}
        />
      )}
      {isOpen.isOpenOT && (
        <RegisterOT
          isOpen={isOpen.isOpenOT}
          row={row}
          handleCloseOT={() => {
            setIsOpen((isOpen.isOpenOT = false))
          }}
        />
      )}
    </div>
  )
}

export default ItemTimeSheet
