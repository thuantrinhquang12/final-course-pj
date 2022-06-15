import React, { useEffect, useState } from 'react'
import { get } from '../service/requestApi'
import ItemTimeSheet from './ItemTimeSheet'

const Worksheet = () => {
  const [timeSheet, setTimeSheet] = useState([])

  const getTimeSheet = async () => {
    const res = await get(`/worksheet`)
    setTimeSheet(res.data)
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
