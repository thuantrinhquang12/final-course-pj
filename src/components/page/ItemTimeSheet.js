import React, { useState } from 'react'
import moment from 'moment'
import ForgetModal from './forgetModal/ForgetModal'
import LeaveModal from './leaveModal/LeaveModal'
import RegisterOT from './RegisterOT/RegisterOT'

const ItemTimeSheet = ({ row }) => {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
    isOpenOT: false,
  })

<<<<<<< HEAD
  const handleClickModal = (type) => {
=======
  const handleClickModal = (type) => () => {
>>>>>>> demo
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
<<<<<<< HEAD
      <div>wd{row.work_date}</div>
      <div>
        ci
        {row.checkin_original
          ? moment(row.check_in || row.checkin_original).format('HH:mm')
          : '--|--'}
      </div>
      <div>
        co{' '}
        {row.checkout_original
          ? moment(row.check_in || row.checkout_original).format('HH:mm')
          : '--|--'}
      </div>
      <div>l{row.late ? row.late : '--|--'}</div>
      <div>e{row.early ? row.early : '--|--'}</div>
      <div>lack{row.lack_time ? row.lack_time : '--|--'}</div>
      <div>wt{row.work_time ? row.work_time : '--|--'}</div>
      <div>if{row.in_office ? row.in_office : '--|--'}</div>

      <button type="button" onClick={handleClickModal('leave')}>
=======
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
      <button
        type="button"
        onClick={() => {
          handleClickModal('leave')
        }}
      >
>>>>>>> develop
        Leave
      </button>
      <button type="button" onClick={handleClickModal('ot')}>
        OT
      </button>
      <button type="button" onClick={handleClickModal('forget')}>
        Forget
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
