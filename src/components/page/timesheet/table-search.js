import React from 'react'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

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
      title: 'Uabc',
      dataIndex: 'checkin',
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'checkout',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'late',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'early',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'inoffice',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'ot',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'worktime',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'lack',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'comp',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'pleave',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'uleave',
    },
    {
      key: '3',
      title: 'Uabc',
      dataIndex: 'note',
    },
  ]
  return (
    <>
      <Table columns={columns} pagination={true} dataSource={dataTable}></Table>
    </>
  )
}
export default TableTimeSheet
