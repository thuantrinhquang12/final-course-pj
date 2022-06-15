import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.min.css'
import { Table, Typography } from 'antd'
import axios from 'axios'
import moment from 'moment'
// import { get } from '../../../service/requestApi'
const { Text } = Typography
export default function ModalLogTimesheet({ date }) {
  console.log(date)
  const [dateTimeLog, setDateTimeLog] = useState([])
  const getDataTimeLog = async () => {
    const res = await axios(
      `http://54.179.42.101/api/time-log/?work_date=${moment(date).format(
        'YYYY-DD-MM ',
      )}`,
    )
    setDateTimeLog(res.data)
  }
  useEffect(() => {
    getDataTimeLog()
  }, [])
  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'key',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        return <Text>{moment(date).format('YYYY/MM/DD, dddd')} </Text>
      },
    },
    {
      title: 'Checktime',
      dataIndex: 'checktime',
      key: 'checktime',
      render: (checktime) => {
        return <Text>{moment(checktime).format('HH:mm')}</Text>
      },
    },
  ]
  return (
    <>
      <Table
        columns={columns}
        dataSource={dateTimeLog}
        pagination={{ position: ['none'] }}
      ></Table>
    </>
  )
}
