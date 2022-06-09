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
      <div>{row.work_date}</div>
      <div>{moment(row.check_in).format('HH:mm')}</div>
      <div>{moment(row.check_out).format('HH:mm')}</div>
      <div>{row.late}</div>
      <div>{row.early}</div>
      <div>{row.work_time}</div>
      <div>{row.in_office}</div>
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
