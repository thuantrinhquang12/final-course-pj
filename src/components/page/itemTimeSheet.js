import React, { useState } from 'react'
import moment from 'moment'
import ForgetModal from './forgetModal/forgetModal'

const ItemTimeSheet = ({ row }) => {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
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
      <div>Wd: {row.work_date}</div>
      <div>Ci:{moment(row.check_in).format('HH:mm')}</div>
      <div>Co:{moment(row.check_out).format('HH:mm')}</div>
      <div>Late: {row.late}</div>
      <div>Early: {row.early}</div>
      <div>Wt: {row.work_time}</div>
      <div>In office: {row.in_office}</div>
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
