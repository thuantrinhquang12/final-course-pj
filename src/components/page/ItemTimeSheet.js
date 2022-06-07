import React, { useState } from 'react'
import moment from 'moment'
import LeaveModal from './leaveModal/LeaveModal'

const ItemTimeSheet = ({ row }) => {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
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
      {isOpen.isOpenLeave && (
        <LeaveModal
          isOpen={isOpen.isOpenLeave}
          row={row}
          handleCloseLeave={() => {
            setIsOpen((isOpen.isOpenLeave = false))
          }}
        />
      )}
    </div>
  )
}

export default ItemTimeSheet
