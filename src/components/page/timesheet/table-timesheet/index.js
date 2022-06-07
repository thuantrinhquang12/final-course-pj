import React from 'react'
import { Table, Space, Button } from 'antd'
import 'antd/dist/antd.css'
export default function Timesheet(props) {
  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      key: 'no',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Check in',
      dataIndex: 'check_in',
      key: 'check_in',
    },
    {
      title: 'Check out',
      dataIndex: 'check_out',
      key: 'check_out',
    },
    {
      title: 'Late',
      dataIndex: 'late',
      key: 'late',
    },
    {
      title: 'Early',
      dataIndex: 'early',
      key: 'early',
    },
    {
      title: 'In office',
      dataIndex: 'in_office',
      key: 'in_office',
    },
    {
      title: 'Ot',
      dataIndex: 'ot',
      key: 'ot',
    },
    {
      title: 'Work time',
      dataIndex: 'work_time',
      key: 'work_time',
    },
    {
      title: 'lack',
      dataIndex: 'lack',
      key: 'lack',
    },
    {
      title: 'Comp',
      dataIndex: 'comp',
      key: 'comp',
    },
    {
      title: 'Pleave',
      dataIndex: 'p_leave',
      key: 'p_leave',
    },
    {
      title: 'Uleave',
      dataIndex: 'u_leave',
      key: 'u_leave',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Action',

      key: 'action',
      render: () => (
        <Space>
          <Button>Forget</Button>
          <Button>Late</Button>
          <Button>Early</Button>
          <Button>Leave</Button>
        </Space>
      ),
    },
  ]
  return (
    <>
      <Table columns={columns} dataSource={props}></Table>
    </>
  )
}
