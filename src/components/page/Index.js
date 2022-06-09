/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { get } from '../service/requestApi'
import ItemTimeSheet from './ItemTimeSheet'
const Worksheet = () => {
  const [timeSheet, setTimeSheet] = useState([])

  const getTimeSheet = async () => {
    const res = await get(`users/1/timesheet`)
    setTimeSheet(res)
  }

  useEffect(() => {
    getTimeSheet()
  }, [])

  return (
    <>
      {(timeSheet || []).length !== 0 &&
        timeSheet.map((item) => {
          return <ItemTimeSheet key={item.id} row={item}></ItemTimeSheet>
        })}
    </>
  )
}

export default Worksheet
