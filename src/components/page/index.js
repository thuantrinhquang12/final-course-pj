/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { get } from '../service/requestApi'
import ItemTimeSheet from './itemTimeSheet'
const Worksheet = () => {
  const [timesheet, setTimesheet] = useState([])

  const getTimeSheet = async () => {
    const res = await get(`users/1/timesheet`)
    setTimesheet(res)
  }
  useEffect(() => {
    getTimeSheet()
  }, [])

  // const handleClose = () => {
  //   setIsOpen(false)
  // }
  return (
    <>
      {timesheet.length !== 0 &&
        timesheet.map((item) => {
          return <ItemTimeSheet key={item.id} row={item}></ItemTimeSheet>
        })}
    </>
  )
}

export default Worksheet
