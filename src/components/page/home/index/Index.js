/* eslint-disable object-curly-spacing */
import React, { useEffect, useState } from 'react'
import { Row, Col, Modal } from 'antd'
import styles from './Index.module.scss'
import './Index.scss'
import { dateTime, CMTable } from '../../../index'
import { getDataListNotice } from '../slice/slice'
import { useDispatch, useSelector } from 'react-redux'
import { saveAs } from 'file-saver'

const Index = () => {
  const [modal, setModal] = useState({ open: false, data: {} })
  // const [heightTable, setHeightTable] = useState(0)
  const stateNotice = useSelector((state) => {
    return state.noticeList
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDataListNotice({ perPage: 10, page: 1 }))
  }, [])

  // useEffect(() => {
  //   const Screen = screen.height
  //   const Header = document.querySelector('#Header').offsetHeight
  //   const HomeTable = document.querySelector('#HomeTable')
  //   ;(HomeTable.style.height = `${Screen - Header}px`),
  //     setHeightTable(HomeTable.offsetHeight - 450)
  // }, [])

  const columns = [
    {
      title: <p className={styles.whiteColor}>NO</p>,
      dataIndex: 'id',
      key: 'id',
      render: (payload, recored) => {
        return (
          <p className="tb_center">
            {(stateNotice.page - 1) * 10 + Number(recored.key)}
          </p>
        )
      },
    },
    {
      title: <p className={styles.whiteColor}>SUBJECT</p>,
      dataIndex: 'subject',
      key: 'subject',
      width: '20%',
      render: (payload) => {
        return <p className="textOverFlow">{payload}</p>
      },
    },
    {
      title: (
        <p className={`${styles.tableHeader} ${styles.whiteColor}`}>AUTHOR</p>
      ),
      dataIndex: 'created_by',
      key: 'created_by',
      render: (payload) => {
        return <p className={styles.tableHeader}>{payload}</p>
      },
    },
    {
      title: (
        <p className={`${styles.tableHeader} ${styles.whiteColor}`}>
          TO DEPARTMENT
        </p>
      ),
      dataIndex: 'published_to',
      key: 'published_to',
      render: (payload) => {
        const department = Array.isArray(payload)
          ? payload[0].division_name
          : 'ALL'
        return <p className={styles.tableHeader}>{department}</p>
      },
    },
    {
      title: (
        <p className={`${styles.tableHeader} ${styles.whiteColor}`}>
          PUBLISHED DATE
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
          ATTACHMENT
        </p>
      ),
      dataIndex: 'attachment',
      key: 'attachment',
      render: (payload) => {
        const test = () => {
          const indexofDot = payload.lastIndexOf('.')
          const pathFile = payload.slice(indexofDot, payload.length)
          if (pathFile === '.zip' || pathFile === '.rar') {
            saveAs(`${payload}`, `${payload}`)
            return null
          }
        }

        return (
          <p className="textOverFlow colorBlue" onClick={test}>
            {payload}
          </p>
        )
      },
    },
    {
      title: <p className={styles.whiteColor}>Detail</p>,
      dataIndex: 'detail',
      key: 'detail',
      width: '10%',
      render: (payload, record) => {
        return (
          <p
            className="tb_center colorBlue"
            onClick={() => setModal({ open: true, data: record })}
          >
            view
          </p>
        )
      },
    },
  ]

  const onShowSizeChange = (page, size) => {
    dispatch(getDataListNotice({ perPage: size, page: page }))
  }

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <>
          <button
            style={
              stateNotice.currentPage === 1 ? { cursor: 'not-allowed' } : {}
            }
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getDataListNotice({
                  perPage: stateNotice.per_page,
                  page: 1,
                }),
              )
            }}
            className="ant-pagination-item"
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button
            className="ant-pagination-item"
            style={
              stateNotice.currentPage === 1 ? { cursor: 'not-allowed' } : {}
            }
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
        </>
      )
    }

    if (type === 'next') {
      return (
        <>
          <button
            className="ant-pagination-item"
            style={
              stateNotice.currentPage === stateNotice.lastPage
                ? { cursor: 'not-allowed' }
                : {}
            }
          >
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button
            style={
              stateNotice.currentPage === stateNotice.lastPage
                ? { cursor: 'not-allowed' }
                : {}
            }
            onClick={(e) => {
              e.stopPropagation()
              dispatch(
                getDataListNotice({
                  perPage: stateNotice.per_page,
                  page: stateNotice.lastPage,
                }),
              )
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

  const onChange = (size, page) => {
    dispatch(getDataListNotice({ perPage: page, page: size }))
  }

  return (
    <div className={styles.Home} id="HomeTable">
      <Row
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '50px 0',
          borderRadius: 5,
        }}
      >
        <Col xs={24} md={22} xl={22}>
          <CMTable
            title={() => {
              return (
                <>
                  <h1>Official Notice</h1>
                </>
              )
            }}
            loading={stateNotice.loading}
            className="tableNotice"
            data={stateNotice.tableData}
            // remove={['published_to']}
            width={{ id: '5%' }}
            columns={columns}
            sorter={{ published_date: 'date' }}
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
        title={<h2>Notice Detail</h2>}
        visible={modal.open}
        width={1000}
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
              <h3
                style={{ marginBottom: '20px', color: 'black', fontSize: 20 }}
              >
                Author
              </h3>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-user"></i>
                  <div className="formGroupText">
                    <p>Name: &nbsp;</p>
                    <p>
                      {modal?.data?.created_by ? modal?.data?.created_by : ''}
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-envelope"></i>
                  <div className="formGroupText">
                    <p>Email: &nbsp;</p>
                    <p>
                      {modal?.data?.author_email
                        ? modal?.data?.author_email
                        : ''}
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-envelope"></i>
                  <div className="formGroupText">
                    <p>Other Email: &nbsp;</p>
                    <p>
                      {modal?.data?.author_other_email
                        ? modal?.data?.author_other_email
                        : ''}
                    </p>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-phone"></i>
                  <div className="formGroupText">
                    <p>Phone: &nbsp;</p>
                    <p>
                      {modal?.data?.author_phone
                        ? modal?.data?.author_phone
                        : ''}
                    </p>
                  </div>
                </div>
              </Col>
            </Col>
            <Col xs={12} md={12} xl={12}>
              <h3
                style={{ marginBottom: '20px', color: 'black', fontSize: 20 }}
              >
                To Department &nbsp;
              </h3>
              <Col xs={24} md={24} xl={24}>
                <div className="formGroup">
                  <i className="fa-solid fa-building"></i>
                  <div className="formGroupText">
                    <p>To department: &nbsp;</p>
                    <p>
                      {Array.isArray(modal?.data?.published_to)
                        ? modal?.data?.published_to[0].division_name
                        : 'ALL'}
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
            <h3 style={{ margin: '20px 0', color: 'black', fontSize: 20 }}>
              Detail
            </h3>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <p style={{ fontWeight: 600 }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Subject: </span>
              {modal?.data?.subject}
            </p>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <p
              className="colorBlue"
              style={{ fontWeight: 600 }}
              onClick={() => {
                saveAs(`${modal.data.attachment}`, `${modal.data.attachment}`)
              }}
            >
              <span style={{ fontWeight: 700, color: 'black' }}>
                {' '}
                Attachment:{' '}
              </span>
              {modal?.data?.attachment}
            </p>
          </Col>
          <Col xs={24} md={24} xl={24}>
            <p style={{ fontWeight: 600 }}>
              <span style={{ fontWeight: 700 }}>Message: </span>
              {modal?.data?.message}
            </p>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default Index
