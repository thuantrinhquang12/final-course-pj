import React from 'react'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Button, Space } from 'antd'

function TableTimeSheet() {
  const [loading, setLoading] = useState(false)
  console.log(loading)
  const [dataTable, setDataTable] = useState([])
  useEffect(() => {
    setLoading(true)
    axios
      .get('https://62957a16810c00c1cb6190ee.mockapi.io/timesheet/timesheet')
      .then((res) => {
        setDataTable(res.data)
        console.log(dataTable)
      })
  }, [])
  const columns = [
    {
      key: '1',
      title: 'No',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'Date',
      dataIndex: 'date',
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      key: '3',
      title: 'Check in',
      dataIndex: 'checkin',
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      key: '3',
      title: 'Check out',
      dataIndex: 'checkout',
    },
    {
      key: '3',
      title: 'Late',
      dataIndex: 'late',
    },
    {
      key: '3',
      title: 'Early',
      dataIndex: 'early',
    },
    {
      key: '3',
      title: 'In Office',
      dataIndex: 'inoffice',
    },
    {
      key: '3',
      title: 'Ot',
      dataIndex: 'ot',
    },
    {
      key: '3',
      title: 'Work time',
      dataIndex: 'worktime',
    },
    {
      key: '3',
      title: 'Lack',
      dataIndex: 'lack',
    },
    {
      key: '3',
      title: 'Comp',
      dataIndex: 'comp',
    },
    {
      key: '3',
      title: 'Pleave',
      dataIndex: 'pleave',
    },
    {
      key: '3',
      title: 'U leave',
      dataIndex: 'uleave',
    },
    {
      key: '3',
      title: 'Note',
      dataIndex: 'note',
    },
    {
      key: '11',
      title: 'Action',
      render: (_, actions) => (
        <Space size="middle">
          <Button>Forget</Button>
          <Button>Late/Early</Button>
          <Button>Leave</Button>
        </Space>
      ),
    },
  ]
  return (
    <>
      <Table columns={columns} pagination={true} dataSource={dataTable}></Table>
    </>
  )
}
export default TableTimeSheet
