import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.min.css'
import { Table, Typography } from 'antd'
import axios from 'axios'
import moment from 'moment'

const { Text } = Typography
export default function ModalLogTimesheet() {
  const [dateTimeLog, setDateTimeLog] = useState([])
  const getDataTimeLog = async () => {
    const res = await axios(
      `https://62957a16810c00c1cb6190ee.mockapi.io/timesheet/timelogs`,
    )
    setDateTimeLog(res.data)
  }
  useEffect(() => {
    getDataTimeLog()
  }, [])
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'key',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => {
        return <Text>{moment(date).format('DD/MM/YYYY ')} </Text>
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
