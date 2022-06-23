import React, { useEffect, useState } from 'react'
import './ChangeShiff.scss'
import { Row, Col, Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { getDataListUser } from './slice/slice'
import { useDispatch, useSelector } from 'react-redux'
import TableCs from '../../common/table/Table'
import debounce from '../../utils/debounce'
import distance from '../../utils/distance'

import Modal from './Modal'

const ChangeShift = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [modal, setModal] = useState({ isOpen: false, data: [] })
  const [heightTable, setHeightTable] = useState(200)
  const [loading, setLoading] = useState(false)

  const changeShift = useSelector((state) => {
    return state?.changeShift
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDataListUser(''))
  }, [loading])

  useEffect(() => {
    const height = distance('change_Shift', 65)
    setHeightTable(height.heightTable)
  }, [])

  const handleUpdate = () => {
    setLoading((prev) => !prev)
  }

  const onChangeData = (e) => {
    dispatch(getDataListUser(e.target.value))
  }

  const handleSearchUser = debounce(onChangeData, 500)

  const handleCloseModal = () => {
    setModal({ isOpen: false, data: [] })
  }

  const onShowSizeChange = (page, size) => {
    setPerPage(size)
  }

  const onChange = (size, page) => {
    setCurrentPage(size)
  }

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
            <i className="fa-solid fa-angles-left" />
          </button>
          <button
            className="ant-pagination-item"
            style={currentPage === 1 ? { cursor: 'not-allowed' } : {}}
          >
            <i className="fa-solid fa-angle-left" />
          </button>
        </>
      )
    }

    if (type === 'next') {
      const lastPage = Math.ceil(changeShift.userList.length / perPage)
      return (
        <>
          <button
            className="ant-pagination-item"
            style={currentPage === lastPage ? { cursor: 'not-allowed' } : {}}
          >
            <i className="fa-solid fa-angle-right" />
          </button>
          <button
            style={currentPage === lastPage ? { cursor: 'not-allowed' } : {}}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentPage(lastPage)
            }}
            className="ant-pagination-item"
          >
            <i className="fa-solid fa-angles-right" />
          </button>
        </>
      )
    }

    return originalElement
  }

  const columns = [
    {
      title: <div>No</div>,
      dataIndex: 'id',
      key: 'id',
      render: (payload, records) => {
        return (
          <div className="resetMargin">
            <> {currentPage - 1 + Number(records.key)}</>
          </div>
        )
      },
    },
    {
      title: <div>Member Name</div>,
      dataIndex: 'member_name',
      key: 'member_name',
      render: (payload, records) => {
        return <div>{payload}</div>
      },
    },
    {
      title: <div>Email</div>,
      dataIndex: 'email',
      key: 'email',
      render: (payload, records) => {
        return <div>{payload}</div>
      },
    },
    {
      title: <div>Division Name</div>,
      dataIndex: 'division_name',
      key: 'division_name',
      render: (payload, records) => {
        return <div>{payload}</div>
      },
    },
    {
      title: <div>Shift name</div>,
      dataIndex: 'shift_name',
      key: 'shift_name',
      render: (payload, records) => {
        return <div>{payload}</div>
      },
    },
    {
      title: <div>Action</div>,
      dataIndex: 'shift_name',
      key: 'shift_name',
      render: (payload, records) => {
        return (
          <Button
            type="primary"
            onClick={() => setModal({ isOpen: true, data: records })}
          >
            Change Shift
          </Button>
        )
      },
    },
  ]

  return (
    <div className="ChangeShiff" id="change_Shift">
      <Row>
        <Col xs={24} md={22} xl={22}>
          <Input
            size="large"
            placeholder="Enter your name"
            prefix={<SearchOutlined />}
            onChange={handleSearchUser}
          />
          <TableCs
            className="Table__User"
            title={(recored, index) => {
              return <h2>UserMember List</h2>
            }}
            data={changeShift.userList}
            columns={columns}
            width={{
              id: '5%',
            }}
            loading={changeShift.loading}
            scroll={{
              x: 1000,
              y: heightTable,
            }}
            pagination={{
              current: currentPage,
              total: changeShift.userList.length,
              onShowSizeChange: onShowSizeChange,
              itemRender: itemRender,
              onChange: onChange,
            }}
          />
        </Col>
      </Row>
      {modal.isOpen && (
        <Modal
          modal={modal}
          handleClose={handleCloseModal}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  )
}

export default ChangeShift
