/* disable eslint object-curly-spacing */
import React, { useEffect, useState } from 'react'
import { Row, Col, Modal } from 'antd'
import styles from './Index.module.scss'
import './Index.scss'
import { dateTime, CMTable } from '../../../index'
import { getDataListNotice } from '../slice/slice'
import { useDispatch, useSelector } from 'react-redux'

const Index = () => {
  const [modal, setModal] = useState({ open: false, data: {} })
  const stateNotice = useSelector((state) => {
    return state.noticeList
  })

  console.log('modal', modal)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDataListNotice({ perPage: 10, page: 1 }))
  }, [])

  const columns = [
    {
      title: <p className={styles.BlackColor}>No</p>,
      dataIndex: 'id',
      key: 'id',
      render: (payload) => {
        return <p>{payload}</p>
      },
    },
    {
      title: <p className={styles.BlackColor}>Subject</p>,
      dataIndex: 'subject',
      key: 'subject',
      render: (payload) => {
        return <p>{payload}</p>
      },
    },
    {
      title: (
        <p className={`${styles.tableHeader} ${styles.whiteColor}`}>Author</p>
      ),
      dataIndex: 'subject',
      key: 'subject',
      render: (payload) => {
        return <p className={styles.tableHeader}>{payload}</p>
      },
    },
    {
      title: (
        <p className={`${styles.tableHeader} ${styles.whiteColor}`}>
          Department
        </p>
      ),
      dataIndex: 'published_to',
      key: 'published_to',
      render: (payload) => {
        return <p className={styles.tableHeader}>{payload[0].division_name}</p>
      },
    },
    {
      title: (
        <p className={`${styles.tableHeader} ${styles.whiteColor}`}>
          Published Date
        </p>
      ),
      dataIndex: 'published_date',
      key: 'published_date',
      render: (payload) => {
        const DATE = dateTime.formatDateTimes(new Date(payload))
        return <p className={styles.tableHeader}>{DATE}</p>
      },
    },
    {
      title: (
        <p className={`${styles.tableHeader} ${styles.whiteColor}`}>
          Attachment
        </p>
      ),
      dataIndex: 'attachment',
      key: 'attachment',
      render: (payload) => {
        const string =
          payload && payload.length > 50 ? payload.slice(0, 50) : payload
        return (
          <a href={`${payload}`} target="_blank" rel="noopener noreferrer">
            {`${string}...`}
          </a>
        )
      },
    },
    {
      title: <p className={styles.whiteColor}>Detail</p>,
      dataIndex: 'detail',
      key: 'detail',
      render: (payload, record) => {
        return (
          <p
            className="tb_center"
            onClick={() => setModal({ open: true, data: record })}
          >
            View
          </p>
        )
      },
    },
  ]

  const onShowSizeChange = (page, size) => {
    dispatch(getDataListNotice({ perPage: size, page: page }))
  }

  const itemRender = (_, type, originalElement) => {
    const style = {
      width: 30,
      height: 33,
      marginLeft: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: `#7d7d81`,
      borderRadius: 5,
    }
    if (type === 'prev') {
      return (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getDataListNotice({
                  perPage: stateNotice.per_page,
                  page: 1,
                }),
              )
            }}
            style={style}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button style={style}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </>
      )
    }

    if (type === 'next') {
      return (
        <>
          <button style={style}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getDataListNotice({
                  perPage: stateNotice.per_page,
                  page: stateNotice.lastPage,
                }),
              )
            }}
            style={style}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </>
      )
    }

    return originalElement
  }

  const onChange = (size, page) => {
    dispatch(getDataListNotice({ perPage: page, page: size }))
  }

  return (
    <div className={styles.Home}>
      <Row
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '50px 0',
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <Col xs={24} md={20} xl={20}>
          <CMTable
            title={(data) => {
              return <h1>Official Notice</h1>
            }}
            // pagination={{ pageSize: page }}
            className="tableNotice"
            data={stateNotice.tableData}
            // remove={['published_to']}
            columns={columns}
            sorter={{ no: 'number', author: 'string', publishedDate: 'date' }}
            scroll={{
              x: 1000,
              y: 350,
            }}
            styleHead={{
              id: { position: 'tb_start' },
              subject: { position: 'tb_start' },
              created_by: { position: 'tb_center' },
              published_date: { position: 'tb_center' },
              detail: { position: 'tb_center' },
            }}
            // styleBody={{ detail: { position: 'tb_center' } }}
            pagination={{
              current: stateNotice.currentPage,
              total: stateNotice.total,
              onShowSizeChange: onShowSizeChange,
              itemRender: itemRender,
              onChange: onChange,
            }}
          />
        </Col>
      </Row>
      <Modal
        wrapClassName="modalNotice"
        title="Notice Detail"
        visible={modal.open}
        onCancel={() =>
          setModal((prev) => {
            return { ...prev, open: false }
          })
        }
      >
        <Row>
          <Col
            xs={24}
            md={24}
            xl={24}
            style={{ display: 'flex', borderBottom: '2px solid #ab9f9f' }}
          >
            <Col xs={12} md={12} xl={12}>
              <h3 style={{ marginBottom: '20px' }}>User Member</h3>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-user"></i>
                  <div className="formGroupText">
                    <p>Name:</p>
                    <p>Berenice Connelly</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-envelope"></i>
                  <div className="formGroupText">
                    <p>Email:</p>
                    <p>vinaphone232@gmail.com</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-user"></i>
                  <div className="formGroupText">
                    <p>Nick name:</p>
                    <p>NamDx Update composer</p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-phone"></i>
                  <div className="formGroupText">
                    <p>Phone:</p>
                    <p>0263862877</p>
                  </div>
                </div>
              </Col>
            </Col>
            <Col xs={12} md={12} xl={12}>
              <h3 style={{ marginBottom: '20px' }}>To Department</h3>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-building"></i>
                  <div className="formGroupText">
                    <p>To department:</p>
                    <p>
                      {modal.data.published_to &&
                        modal.data.published_to[0].division_name}
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-calendar"></i>
                  <div className="formGroupText">
                    <p>Published date: </p>
                    <p>{modal?.data?.published_date}</p>
                  </div>
                </div>
              </Col>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24} xl={24}>
            <h3 style={{ marginBottom: '20px' }}>Detail</h3>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <p style={{ fontWeight: 600 }}>Subject: {modal?.data?.subject}</p>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <p style={{ fontWeight: 600 }}>
              Attachment: {modal?.data?.attachment}
            </p>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <p style={{ fontWeight: 600 }}>Message: {modal?.data?.message}</p>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Index
