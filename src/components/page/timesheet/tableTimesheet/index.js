import React, { useState } from 'react'
import { Table, Space, Button, Typography, Modal } from 'antd'
import 'antd/dist/antd.min.css'
import './table-timesheet.scss'
import ForgetModal from '../../forgetModal/ForgetModal'
import LeaveModal from '../../leaveModal/LeaveModal'
import RegisterOT from '../../registerOT/RegisterOT'
import moment from 'moment'
import ModalLogTimesheet from '../modalLogtimesheet/ModalLogtimesheet'

const { Text } = Typography

export default function Timesheet({ row }, sort) {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
  })

  const [checkModal, setCheckModal] = useState({
    row: [],
    name: '',
  })

  const [visible, setVisible] = useState(false)
  // const [dataTable, setDataTable] = useState([])
  // // const getTimeSheet = async () => {
  // //   const res = await axios(
  // //     `https://62957a16810c00c1cb6190ee.mockapi.io/timesheet/timesheet`,
  // //   )
  // //   setDataTable(res.data)
  // // }

  // // useEffect(() => {
  // //   getTimeSheet()
  // //   getTimeSheets()
  // // }, [])

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
      case 'OT':
        setIsOpen({
          ...isOpen,
          isOpenOT: !isOpen.isOpenOT,
        })
        break
      default:
        throw new Error('err')
    }
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
      sorter: {
        compare: (a, b) => b.id - a.id,
        multiple: 1,
      },
    },
    {
      title: 'Date',
      dataIndex: 'work_date',
      key: 'work_date',
      render: (date) => {
        return (
          <Text onClick={() => setVisible(true)}>
            {moment(date).format('DD/MM/YYYY|ddd')}{' '}
          </Text>
        )
      },
    },
    {
      title: 'Check in',
      dataIndex: 'checkin_original',
      key: 'checkin_original',
      render: (checkin_original) => {
        if (checkin_original !== null) {
          return <Text>{moment(checkin_original).format('DD/MM/YYYY ')} </Text>
        } else return <Text></Text>
      },
    },
    {
      title: 'Check out',
      dataIndex: 'checkout_original',
      key: 'checkout_original',
      render: (checkout_original) => {
        if (checkout_original !== null) {
          return <Text>{moment(checkout_original).format('DD/MM/YYYY ')} </Text>
        } else return <Text></Text>
      },
    },
    {
      title: 'Late',
      dataIndex: 'late',
      key: 'late',
      render: (late) => {
        if (late === '') {
          return ''
        } else return <Text type="danger">{late}</Text>
      },
    },
    {
      title: 'Early',
      dataIndex: 'early',
      key: 'early',
      render: (early) => {
        if (early === '') {
          return ''
        } else return <Text type="danger">{early}</Text>
      },
    },
    {
      title: 'In office',
      dataIndex: 'in_office',
      key: 'in_office',
      render: (in_office) => {
        if (in_office === null) {
          return <Text>--:--</Text>
        } else return <Text type="default">{in_office}</Text>
      },
    },
    {
      title: 'Ot',
      dataIndex: 'ot_time',
      key: 'ot_time',
      render: (ot_time) => {
        if (ot_time === null) {
          return <Text>00:00</Text>
        } else return <Text>{ot_time}</Text>
      },
    },
    {
      title: 'Work time',
      dataIndex: 'work_time',
      key: 'work_time',
      render: (workTime) => {
        if (workTime === '08:00') {
          return <Text type="danger">{workTime}</Text>
        } else return <Text type="default">{workTime}</Text>
      },
    },
    {
      title: 'Lack',
      dataIndex: 'lack',
      key: 'lack',
    },
    {
      title: 'Comp',
      dataIndex: 'compensation',
      key: 'compensation',
    },
    {
      title: 'Pleave',
      dataIndex: 'paid_leave',
      key: 'paid_leave',
    },
    {
      title: 'Uleave',
      dataIndex: 'unpaid_leave',
      key: 'unpaid_leave',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space>
          <Button
            size="small"
            onClick={() => {
              setCheckModal((prev) => {
                return {
                  row: record,
                  name: 'forget',
                }
              })
              handleClickModal('forget')
            }}
          >
            Forget
          </Button>

          <Button size="small">Late/Early</Button>

          <Button
            size="small"
            onClick={() => {
              setCheckModal((prev) => {
                return {
                  row: record,
                  name: 'leave',
                }
              })
              handleClickModal('leave')
            }}
          >
            Leave
          </Button>
          <Button
            size="small"
            onClick={() => {
              setCheckModal((prev) => {
                return {
                  row: record,
                  name: 'ot',
                }
              })
              handleClickModal('ot')
            }}
          >
            OT
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        dataSource={row}
        rowClassName={(record, index) =>
          index % 2 === 0 ? 'table-row-light' : 'table-row-dark'
        }
        sx={{ align: 'center', width: '100%' }}
      />
      <Modal
        title="Time Logs"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <ModalLogTimesheet />
      </Modal>
      {isOpen.isOpenForget && (
        <ForgetModal
          isOpen={true}
          row={checkModal.row}
          handleCloseForget={() => {
            setIsOpen((isOpen.isOpenForget = false))
          }}
        ></ForgetModal>
      )}
      {isOpen.isOpenLeave && (
        <LeaveModal
          isOpen={true}
          row={checkModal.row}
          handleCloseLeave={() => {
            setIsOpen((isOpen.isOpenLeave = false))
          }}
        ></LeaveModal>
      )}
      {isOpen.isOpenOT && (
        <RegisterOT
          isOpen={true}
          row={checkModal.row}
          handleCloseOT={() => {
            setIsOpen((isOpen.isOpenOT = false))
          }}
        />
      )}
    </>
  )
}
