/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import moment from 'moment'
import LeaveModal from '../page/leaveModal/leaveModal'

const ItemTimeSheet = ({ row }) => {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
  })
  const handleClickModal = (requestType) => {
    switch (requestType) {
      case 'leave':
        setIsOpen({
          ...isOpen,
          isOpenLeave: !isOpen.isOpenLeave,
        })
        break
      default:
        throw new Error('dm co loi roi')
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
      <div>{moment.unix(row.work_date).format('MM/DD/YYYY')}</div>
      <div>{moment(row.check_in).format('hh:mm:ss a')}</div>
      <div>{moment(row.check_out).format('hh:mm:ss a')}</div>
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
            setIsOpen((isOpen.isOpenForget = false))
          }}
        ></LeaveModal>
      )}
    </div>
  )
}

export default ItemTimeSheet
