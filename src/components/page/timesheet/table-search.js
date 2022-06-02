import React from 'react'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import { useState } from 'react'
import moment from 'moment'
import { Button, Space } from 'antd'
import ForgetModal from '../forgetModal/forgetModal'
import LeaveModal from '../leaveModal/leaveModal'

function TableTimeSheet({ row }) {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
  })
  console.log(row.state.date)

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
      key: '1',
      title: 'No',
      dataIndex: `${row.key}`,
    },
    {
      key: '2',
      title: 'Date',
      dataIndex: `${row.date}`,
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      key: '3',
      title: 'Check in',
      dataIndex: `${row.checkin}`,
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      key: '3',
      title: 'Check out',
      dataIndex: `${row.checkout}`,
    },
    {
      key: '3',
      title: 'Late',
      dataIndex: `${row.late}`,
    },
    {
      key: '3',
      title: 'Early',
      dataIndex: `${row.early}`,
    },
    {
      key: '3',
      title: 'In Office',
      dataIndex: `${row.inoffice}`,
    },
    {
      key: '3',
      title: 'Ot',
      dataIndex: `${row.ot}`,
    },
    {
      key: '3',
      title: 'Work time',
      dataIndex: `${row.worktime}`,
    },
    {
      key: '3',
      title: 'Lack',
      dataIndex: `${row.lack}`,
    },
    {
      key: '3',
      title: 'Comp',
      dataIndex: `${row.comp}`,
    },
    {
      key: '3',
      title: 'Pleave',
      dataIndex: `${row.pleave}`,
    },
    {
      key: '3',
      title: 'U leave',
      dataIndex: `${row.uleave}`,
    },
    {
      key: '3',
      title: 'Note',
      dataIndex: `${row.note}`,
    },
    {
      key: '11',
      title: 'Action',
      render: (_, actions) => (
        <Space size="middle">
          <Button
            onClick={() => {
              handleClickModal('forget')
            }}
          >
            FORGET
          </Button>
          <Button>Late/Early</Button>
          <Button
            onClick={() => {
              handleClickModal('leave')
            }}
          >
            LEAVE
          </Button>
        </Space>
      ),
    },
  ]
  return (
    <>
      <Table columns={columns} pagination={true} dataSource={row.data}></Table>
      <div>
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
    </>
  )
}
export default TableTimeSheet
