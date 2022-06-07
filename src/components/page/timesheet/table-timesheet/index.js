import React, { useState, useEffect } from 'react'
import { Table, Space, Button } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'
import ForgetModal from '../../forgetModal/forgetModal'
import LeaveModal from '../../leaveModal/leaveModal'

export default function Timesheet(props) {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
  })
  const [dataTable, setDataTable] = useState()
  const getTimeSheet = async () => {
    const res = await axios(
      `https://62957a16810c00c1cb6190ee.mockapi.io/timesheet/timesheet`,
    )
    return setDataTable(res.data)
  }
  useEffect(() => {
    getTimeSheet()
  }, [])
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
        throw new Error('err')
    }
  }

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
          <Button
            onClick={() => {
              handleClickModal('forget')
            }}
          >
            Forget
          </Button>
          <Button>Late/Early</Button>

          <Button
            onClick={() => {
              handleClickModal('leave')
            }}
          >
            Leave
          </Button>
        </Space>
      ),
    },
  ]
  return (
    <>
      <Table columns={columns} dataSource={dataTable}></Table>
      {isOpen.isOpenForget && (
        <ForgetModal
          isOpen={isOpen.isOpenForget}
          row={props}
          handleCloseForget={() => {
            setIsOpen((isOpen.isOpenForget = false))
          }}
        ></ForgetModal>
      )}
      {isOpen.isOpenLeave && (
        <LeaveModal
          isOpen={isOpen.isOpenLeave}
          row={props}
          handleCloseLeave={() => {
            setIsOpen((isOpen.isOpenLeave = false))
          }}
        ></LeaveModal>
      )}
    </>
  )
}
