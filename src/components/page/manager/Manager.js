/* eslint-disable  no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getRequests,
  putRequestsManager,
  putRequestsReject,
} from './managerSlice'
import { Table, Tag, Button, Modal } from 'antd'
import { endPoint, dateTime, tryCatch, messageRequest } from '../../index'
import RequestDetail from './requestDetail/RequestDetail'
import '../../common/createModal/ModalRequest.scss'
const columns = [
  {
    title: 'No',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'MemberId',
    dataIndex: 'member_id',
    key: 'memberId',
  },

  {
    title: 'RequestType',
    dataIndex: 'request_type',
    key: 'requestType',
    render: (type) => {
      switch (type) {
        case 1:
          return <span>Forget</span>
        case 2:
        case 3:
          return <span>Leave</span>
        case 4:
          return <span>Late/Early</span>
        case 5:
          return <span>OT</span>
        default:
          break
      }
    },
  },
  {
    title: 'Date Created',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (date) => <span>{dateTime.formatDateTime(date)}</span>,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (_, record) => (
      <>
        <Tag color="volcano">{record.status === 1 ? 'Confirm' : ''}</Tag>
      </>
    ),
  },
]

const Manager = () => {
  const [dataTable, setDataTable] = useState([])
  const [rowData, setRowData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [reload, setReload] = useState(false)

  const dispatch = useDispatch()

  const { role: roleUser } = useSelector((state) => state.userInfo?.currentUser)
  const { requests, status } = useSelector((state) => state.managerRequest)

  useEffect(() => {
    const getDataRequests = async () => {
      const url =
        roleUser === 'Admin'
          ? endPoint.GET_REQUEST_ADMIN
          : endPoint.GET_REQUEST_MANAGER
      await dispatch(
        getRequests({
          url,
        }),
      )
    }
    getDataRequests()
  }, [reload])

  useEffect(() => {
    if (requests) {
      const data = requests.map((request) => {
        const newRequest = { key: request.id, ...request }
        return newRequest
      })
      setDataTable(data)
    }
  }, [requests])

  const onClickConfirm = async () => {
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsManager({
          url: endPoint.PUT_REQUEST_MANAGER + rowData.id,
          data: {
            status: 1,
            comment: 'Confirm request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(true)
      },
    )
  }
  const onClickRejectManager = async () => {
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsReject({
          url: endPoint.PUT_REQUEST_MANAGER + rowData.id,
          data: {
            status: -1,
            comment: 'Manager reject request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(true)
      },
    )
  }
  const onClickApproved = async () => {
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsManager({
          url: endPoint.PUT_REQUEST_ADMIN + rowData.id,
          data: {
            status: 2,
            comment: 'Approved request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(true)
      },
    )
  }
  const onClickRejectAdmin = async () => {
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsReject({
          url: endPoint.PUT_REQUEST_ADMIN + rowData.id,
          data: {
            status: -1,
            comment: 'Admin reject request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(true)
      },
    )
  }

  const confirmReject = () => {
    const user = roleUser.toUpperCase()
    const rejectFunction =
      user === 'ADMIN'
        ? onClickRejectAdmin
        : user === 'MANAGER'
        ? onClickRejectManager
        : ''
    Modal.confirm({
      title: 'REQUEST',
      content: 'Are you sure reject request?',
      okText: 'Cancel',
      cancelText: 'OK',
      okButtonProps: {
        type: 'default',
      },
      cancelButtonProps: {
        style: { padding: '0 28px' },
        type: 'primary',
      },
      onCancel: rejectFunction,
    })
  }

  // const confirmCloseModal = () => {
  //   Modal.confirm({
  //     title: 'CLOSE MODAL',
  //     content: 'Are you sure ?',
  //     okText: 'Cancel',
  //     cancelText: 'OK',
  //     okButtonProps: {
  //       type: 'default',
  //     },
  //     cancelButtonProps: {
  //       style: { padding: '0 28px' },
  //       type: 'primary',
  //     },
  //     onCancel() {
  //       handleCloseModal()
  //     },
  //   })
  // }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div>
      {dataTable && (
        <Table
          columns={columns}
          bordered
          loading={status === 'loading'}
          dataSource={dataTable}
          scroll={{ x: 'calc(700px + 50%)', y: 500 }}
          onRow={(record) => {
            return {
              onClick: () => {
                setIsOpen(true)
                setRowData(record)
              },
            }
          }}
        />
      )}
      {isOpen && (
        <Modal
          visible={isOpen}
          title="Request Detail"
          onCancel={handleCloseModal}
          footer={
            roleUser === 'Manager'
              ? [
                  <Button
                    key="confirm"
                    type="primary"
                    onClick={onClickConfirm}
                    loading={status === 'loadingManagerUpdate'}
                  >
                    Confirm
                  </Button>,
                  <Button
                    key="cancel"
                    onClick={handleCloseModal}
                    style={{ padding: '0 25px' }}
                  >
                    Cancel
                  </Button>,
                  <Button
                    key="reject"
                    type="primary"
                    onClick={confirmReject}
                    loading={status === 'loadingRejectRequest'}
                    style={{ padding: '0 30px' }}
                    name="managerReject"
                    danger
                  >
                    Reject
                  </Button>,
                ]
              : roleUser === 'Admin'
              ? [
                  <Button
                    key="approved"
                    type="primary"
                    onClick={onClickApproved}
                    loading={status === 'loadingManagerUpdate'}
                  >
                    Approved
                  </Button>,
                  <Button
                    key="cancel"
                    onClick={handleCloseModal}
                    style={{ padding: '0 25px' }}
                  >
                    Cancel
                  </Button>,
                  <Button
                    key="reject"
                    type="primary"
                    onClick={confirmReject}
                    loading={status === 'loadingRejectRequest'}
                    style={{ padding: '0 30px' }}
                    name="adminReject"
                    danger
                  >
                    Reject
                  </Button>,
                ]
              : ''
          }
          className="modalRequestContainer"
          width={800}
        >
          <RequestDetail row={rowData}></RequestDetail>
        </Modal>
      )}
    </div>
  )
}

export default Manager
