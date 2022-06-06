/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import moment from 'moment'
import ForgetModal from './forgetModal/forgetModal'
import LeaveModal from './leaveModal/leaveModal'

const RowTimesheet = ({ row }) => {
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
  const [isHoliday, setHoliday] = useState(false)
  const [late, setLate] = useState(false)
  const [early, setEarly] = useState(false)
  const [timeOT, setTimeOT] = useState(false)
  const [workTime, setWorkTime] = useState(false)
  const [lack, setLack] = useState(false)
  useEffect(() => {
    if (row.is_holiday === 1) {
      setHoliday(true)
    }
    if (row.late !== '00:00' && !row.note?.includes('Leave:Approved')) {
      setLate(true)
    }
    if (row.early !== '00:00' && !row.note?.includes('Late/Early:Approved')) {
      setEarly(true)
    }
    if (row.ot_time !== '00:00' && !row.note?.includes('OT:Approved')) {
      setTimeOT(true)
    }
    if (
      +row?.work_time?.replace(':', '') < 800 &&
      !row.note?.includes('Leave:Approved') &&
      !row.note?.includes('Forget:Approved') &&
      !row.note?.includes('Late/Early:Approved')
    ) {
      setWorkTime(true)
    }
    if (
      row.lack !== '00:00' &&
      !row.note?.includes('Leave:Approved') &&
      !row.note?.includes('Forget:Approved') &&
      !row.note?.includes('Late/Early:Approved')
    ) {
      setLack(1)
    }
    if (
      row.lack !== '00:00' &&
      (row.note?.includes('Leave:Approved') ||
        row.note?.includes('Forget:Approved') ||
        row.note?.includes('Late/Early:Approved'))
    ) {
      setLack(2)
    }
  }, [])
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
    </div>
  )
}

export default RowTimesheet
