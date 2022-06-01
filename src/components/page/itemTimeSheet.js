/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import moment from 'moment'
import ForgetModal from './forgetModal/forgetModal'

const ItemTimeSheet = ({ row }) => {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
  })
  const handleClickModal = (requestType) => {
    switch (requestType) {
      case 'forget':
        setIsOpen({
          ...isOpen,
          isOpenForget: !isOpen.isOpenForget,
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
      {isOpen.isOpenForget && (
        <ForgetModal
          isOpen={isOpen.isOpenForget}
          row={row}
          handleCloseForget={() => {
            setIsOpen((isOpen.isOpenForget = false))
          }}
        ></ForgetModal>
      )}
    </div>
  )
}

export default ItemTimeSheet
