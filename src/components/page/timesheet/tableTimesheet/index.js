import React, { useState } from 'react'
import { Button, Typography } from 'antd'
import './table-timesheet.scss'
import ForgetModal from '../../forgetModal/ForgetModal'
import LeaveModal from '../../leaveModal/LeaveModal'
import RegisterOT from '../../registerOT/RegisterOT'
import LateEarlyModal from '../../lateEarlyModal/index/Index'
import moment from 'moment'
import ModalLogTimesheet from '../modalLogtimesheet/ModalLogtimesheet'
import PropTypes from 'prop-types'
import TableCS from '../../../common/table/Table'
import { useDispatch } from 'react-redux'
import { getTimeSheet } from '../slice/slice'
import {
  DoubleLeftOutlined,
  LeftOutlined,
  DoubleRightOutlined,
  RightOutlined,
} from '@ant-design/icons'
const { Text } = Typography

export default function Timesheet({ row, params }) {
  const [isOpen, setIsOpen] = useState({
    isOpenForget: false,
    isOpenLeave: false,
    isOpenOT: false,
    isOpenLateEarly: false,
  })
  const [checkModal, setCheckModal] = useState({
    row: [],
    name: '',
  })

  const [modal, setModal] = useState({ open: false, date: '' })
  const dispatch = useDispatch()

  const handleModal = () => {
    setModal({ open: false, date: '' })
  }

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
      case 'LATE_EARLY':
        setIsOpen({
          ...isOpen,
          isOpenLateEarly: !isOpen.isOpenLateEarly,
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

      render: (payload, records) => {
        return (
          <p className="resetMargin tb_center">
            <> {(row.current_page - 1) * 10 + Number(records.key) + 1}</>
          </p>
        )
      },
    },
    {
      title: 'Date',
      dataIndex: 'work_date',
      key: 'work_date',
      width: 110,
      render: (date) => {
        return <Text>{moment(date).format('DD/MM/YYYY ddd')} </Text>
      },
    },
    {
      title: 'Check in',
      dataIndex: 'checkin_original',
      key: 'checkin_original',

      render: (checkin) => {
        if (checkin !== null) {
          return <Text>{moment(checkin).format('HH:mm')} </Text>
        } else <Text></Text>
      },
    },
    {
      title: 'Check out',
      dataIndex: 'checkout_original',
      key: 'checkout_original',

      render: (checkout) => {
        if (checkout !== null) {
          return <Text>{moment(checkout).format('HH:mm ')} </Text>
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
      render: (office) => {
        if (office === null) {
          return <Text>--:--</Text>
        } else return <Text type="default">{office}</Text>
      },
    },
    {
      title: 'Ot',
      dataIndex: 'ot_time',
      key: 'ot_time',
      render: (ot) => {
        if (ot === null) {
          return <Text>00:00</Text>
        } else return <Text>{ot}</Text>
      },
    },
    {
      title: 'Work time',
      dataIndex: 'work_time',
      key: 'work_time',
      render: (workTime) => {
        if (workTime === '08:00') {
          return <Text type="default">{workTime}</Text>
        } else return <Text type="danger">{workTime}</Text>
      },
    },
    {
      title: 'Lack',
      dataIndex: 'lack',
      key: 'lack',
      render: (payload, record) => {
        let color = null
        if (record.note) {
          const check = record.note.split('|')
          check.map((item) => {
            const status = item.split(' ')
            if (status[1] === 'Approved') {
              const lackTime = payload ? payload : '00:00'
              const compensation = record.compensation
                ? record.compensation
                : '00:00'
              const checkTime =
                Number(lackTime.replace(':', '')) <
                Number(compensation.replace(':', ''))
              color = checkTime ? 'black' : 'yellow'
            }
          })
        } else {
          color = 'red'
        }
        return <p style={{ color: color }}>{payload}</p>
      },
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
      render: (record) => {
        let arrayNote = record
        if (arrayNote) {
          arrayNote = record.split('|')
          arrayNote = arrayNote.map((item) => {
            const status = item.split(' ')
            return {
              name: status[0],
              status: status[1],
            }
          })
        }

        return (
          <div className="note">
            {record ? (
              <>
                <p>Status</p>
                <div className="note__status">
                  {arrayNote.map((item, index) => {
                    const color =
                      item.status === 'Approved'
                        ? '#17de17'
                        : item.status === 'Confirmed'
                        ? '#3030ed'
                        : 'red'
                    return (
                      <div className="formGroup" key={index}>
                        <span>{item.name}:</span>
                        <h4 style={{ color: color }}>{item.status}</h4>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 250,
      render: (record) => (
        <div className="action">
          <label
            className="action_false"
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
            <span className="action_false"> Forget</span>
          </label>

          <label
            className="action_false"
            size="small"
            onClick={() => {
              setCheckModal((prev) => {
                return {
                  row: record,
                  name: 'late_early',
                }
              })
              handleClickModal('late_early')
            }}
          >
            <span className="action_false"> Late/Early</span>
          </label>

          <label
            className="action_false"
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
            <span className="action_false"> Leave</span>
          </label>
          <label
            className="action_false"
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
            <span className="action_false"> OT</span>
          </label>
        </div>
      ),
    },
  ]

  const onShowSizeChange = (page, size) => {
    dispatch(getTimeSheet({ ...params, page: page, perPage: size }))
  }

  const onChange = (size, page) => {
    dispatch(getTimeSheet({ ...params, page: size, perPage: page }))
  }

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <>
          <Button
            icon={<DoubleLeftOutlined />}
            disabled={row.current_page === 1}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getTimeSheet({ ...params, page: 1, perPage: row.per_page }),
              )
            }}
            className="ant-pagination-item"
          ></Button>
          <Button
            className="ant-pagination-item"
            disabled={row.current_page === 1}
            icon={<LeftOutlined />}
          ></Button>
        </>
      )
    }

    if (type === 'next') {
      return (
        <>
          <Button
            className="ant-pagination-item"
            disabled={row.current_page === row.last_page}
            icon={<RightOutlined />}
          ></Button>
          <Button
            disabled={row.current_page === row.last_page}
            icon={<DoubleRightOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getTimeSheet({
                  ...params,
                  page: row.last_page,
                  perPage: row.per_page,
                }),
              )
            }}
            className="ant-pagination-item"
          ></Button>
        </>
      )
    }

    return originalElement
  }

  return (
    <>
      <TableCS
        className="tableTimeSheet"
        scroll={{
          x: 1000,
          y: 'auto',
        }}
        rowClassName={(record) => {
          const checkDate = moment(record.work_date).format('dddd')
          return checkDate === 'Saturday' || checkDate === 'Sunday'
            ? 'row-null'
            : ''
        }}
        columns={columns}
        data={row ? row.data : []}
        width={{
          id: '5%',
          work_date: '10%',
          note: '10%',
          unpaid_leave: '6%',
          paid_leave: '6%',
        }}
        onRow={(record) => ({
          onClick: (e) => {
            if (
              e.target.className === 'action' ||
              e.target.className === 'action_false'
            ) {
              e.stopPropagation()
            } else {
              setModal({ open: true, date: record.work_date })
            }
          },
        })}
        pagination={{
          current: row.current_page,
          total: row.total,
          onShowSizeChange: onShowSizeChange,
          itemRender: itemRender,
          onChange: onChange,
        }}
      />
      {modal.open && (
        <ModalLogTimesheet modal={modal} handleClose={handleModal} />
      )}

      {isOpen.isOpenForget && (
        <ForgetModal
          isOpen={true}
          row={checkModal.row}
          handleCloseForget={() => {
            setIsOpen((isOpen.isOpenForget = false))
          }}
        ></ForgetModal>
      )}
      {isOpen.isOpenLateEarly && (
        <LateEarlyModal
          isOpen={true}
          row={checkModal.row}
          handleCloseLateEarly={() => {
            setIsOpen((isOpen.isOpenLateEarly = false))
          }}
        ></LateEarlyModal>
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
Timesheet.propTypes = {
  row: PropTypes.object,
  params: PropTypes.object,
}
