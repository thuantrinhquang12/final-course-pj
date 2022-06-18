import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tag, Button, Modal } from 'antd'
import RequestDetail from '../requestDetail/RequestDetail'
import { checkConfirm } from './checkConfirm'
import {
  getRequests,
  putRequestsManager,
  putRequestsReject,
} from './managerSlice'
import {
  checkRequestStatus,
  checkRequestStatusColor,
} from '../../../utils/checkRequest'
import {
  endPoint,
  dateTime,
  tryCatch,
  messageRequest,
  CMTable,
} from '../../../index'
import '../../../common/createModal/ModalRequest.scss'
import './Manager.scss'

const Manager = () => {
  const [dataTable, setDataTable] = useState([])
  const [rowData, setRowData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [reload, setReload] = useState(false)
  const commentInput = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

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
    if (requests.length !== 0) {
      const data = requests.map((request) => {
        const newRequest = { key: request.id, ...request }
        return newRequest
      })
      setDataTable(data)
    }
  }, [requests])

  const onClickConfirm = async () => {
    const comment = commentInput.current.resizableTextArea.props.value
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsManager({
          url: endPoint.PUT_REQUEST_MANAGER + rowData.id,
          data: {
            status: 1,
            comment: comment ? comment : 'Manager confirmed request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(!reload)
      },
    )
  }
  const onClickRejectManager = async () => {
    const comment = commentInput.current.resizableTextArea.props.value
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsReject({
          url: endPoint.PUT_REQUEST_MANAGER + rowData.id,
          data: {
            status: -1,
            comment: comment ? comment : 'Manager reject request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(!reload)
      },
    )
  }
  const onClickApproved = async () => {
    const comment = commentInput.current.resizableTextArea.props.value
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsManager({
          url: endPoint.PUT_REQUEST_ADMIN + rowData.id,
          data: {
            status: 2,
            comment: comment ? comment : 'Admin approved request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(!reload)
      },
    )
  }
  const onClickRejectAdmin = async () => {
    const comment = commentInput.current.resizableTextArea.props.value
    await tryCatch.handleTryCatch(
      dispatch(
        putRequestsReject({
          url: endPoint.PUT_REQUEST_ADMIN + rowData.id,
          data: {
            status: -1,
            comment: comment ? comment : 'Admin reject request',
          },
        }),
      ),
      messageRequest.UPDATE,
      () => {
        setIsOpen(false)
        setReload(!reload)
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
  const confirmCloseModal = (e) => {
    Modal.confirm({
      title: 'CLOSE MODAL',
      content: 'Are you sure ?',
      okText: 'Cancel',
      cancelText: 'OK',
      okButtonProps: {
        type: 'default',
      },
      cancelButtonProps: {
        style: { padding: '0 28px' },
        type: 'primary',
      },
      onCancel() {
        handleCloseModal()
      },
    })
  }
  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const columns = [
    {
      title: <div>No</div>,
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => {
        return <span className="tb_center">{currentPage - 1 + record.key}</span>
      },
    },
    {
      title: 'Member name',
      dataIndex: 'full_name',
      key: 'full_name',
    },

    {
      title: 'Request type',
      dataIndex: 'request_type',
      key: 'request_type',
      render: (type) => {
        switch (type) {
          case 1:
            return <span className="tb_center">Forget</span>
          case 2:
          case 3:
            return <span className="tb_center">Leave</span>
          case 4:
            return <span className="tb_center">Late/Early</span>
          case 5:
            return <span className="tb_center">OT</span>
          default:
            break
        }
      },
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Date Created',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => (
        <span className="tb_center">{dateTime.formatDateTime(date)}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_) => {
        return (
          <>
            <div className="dFlex">
              <Tag color={checkRequestStatusColor(_)}>
                {checkRequestStatus(_)}
              </Tag>
            </div>
          </>
        )
      },
    },
  ]
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <>
          <button
            style={currentPage === 1 ? { cursor: 'not-allowed' } : {}}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentPage(1)
            }}
            className="ant-pagination-item"
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button
            className="ant-pagination-item"
            style={currentPage === 1 ? { cursor: 'not-allowed' } : {}}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </>
      )
    }

    if (type === 'next') {
      const lastPage = Math.ceil(requests.length / perPage)
      return (
        <>
          <button
            className="ant-pagination-item"
            style={currentPage === lastPage ? { cursor: 'not-allowed' } : {}}
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button
            style={currentPage === lastPage ? { cursor: 'not-allowed' } : {}}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentPage(lastPage)
            }}
            className="ant-pagination-item"
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </>
      )
    }

    return originalElement
  }

  return (
    <div>
      {dataTable && (
        <>
          <CMTable
            title={() => {
              return (
                <>
                  <h2>Requests</h2>
                </>
              )
            }}
            loading={status === 'loading'}
            className="tableManager"
            data={dataTable}
            width={{
              id: '5%',
              full_name: '20%',
              request_type: '15%',
              reason: '30%',
              create_at: '15%',
              status_id: '10%',
            }}
            columns={columns}
            onRow={(record) => {
              return {
                onClick: () => {
                  setIsOpen(true)
                  setRowData(record)
                },
              }
            }}
            sorter={({ created_at: 'date' }, { status: 'number' })}
            scroll={{
              x: 1000,
              y: 350,
            }}
            styleHead={{
              id: { position: 'tb_center' },
              reason: { position: 'tb_start' },
            }}
            styleBody={{
              full_name: { position: 'tb_center' },
              requestType: { position: 'tb_center' },
            }}
            pagination={{
              current: currentPage,
              onShowSizeChange: (page, size) => {
                setPerPage(size)
              },
              itemRender: itemRender,
              onChange: (size, page) => {
                setCurrentPage(size)
              },
            }}
          />
        </>
      )}
      {isOpen && (
        <Modal
          visible={isOpen}
          title="Request Detail"
          onCancel={checkConfirm(
            rowData.status,
            roleUser,
            handleCloseModal,
            confirmCloseModal,
          )}
          footer={
            roleUser === 'Manager'
              ? rowData.manager_confirmed_status !== 0
                ? [
                    <Button
                      key="cancel"
                      onClick={checkConfirm(
                        rowData.status,
                        roleUser,
                        handleCloseModal,
                        confirmCloseModal,
                      )}
                      style={{ padding: '0 25px' }}
                    >
                      Cancel
                    </Button>,
                  ]
                : [
                    <Button
                      key="confirm"
                      type="primary"
                      onClick={onClickConfirm}
                      loading={status === 'loadingManagerUpdate'}
                      htmlType="submit"
                      form="myForm"
                    >
                      Confirm
                    </Button>,
                    <Button
                      key="cancel"
                      onClick={checkConfirm(
                        rowData.status,
                        roleUser,
                        handleCloseModal,
                        confirmCloseModal,
                      )}
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
              ? rowData.admin_approved_status !== 0
                ? [
                    <Button
                      key="cancel"
                      onClick={checkConfirm(
                        rowData.status,
                        roleUser,
                        handleCloseModal,
                        confirmCloseModal,
                      )}
                      style={{ padding: '0 25px' }}
                    >
                      Cancel
                    </Button>,
                  ]
                : [
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
                      onClick={checkConfirm(
                        rowData.status,
                        roleUser,
                        handleCloseModal,
                        confirmCloseModal,
                      )}
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
          width={1000}
        >
          <RequestDetail
            row={rowData}
            refInput={commentInput}
            roleUser={roleUser}
          ></RequestDetail>
        </Modal>
      )}
    </div>
  )
}

export default Manager
