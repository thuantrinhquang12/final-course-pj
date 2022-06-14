/* disable eslint object-curly-spacing */
import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import styles from './Index.module.scss'
import './Index.scss'
import { dateTime, CMTable } from '../../../index'
import { getDataListNotice } from '../slice/slice'
import { useDispatch, useSelector } from 'react-redux'

const Index = () => {
  const dispatch = useDispatch()
  const dataTable = useSelector((state) => {
    return state.noticeList.tableData
  })

  const stateNotice = useSelector((state) => {
    return state.noticeList
  })

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
      render: (payload) => {
        return (
          <a
            href="https://github.com/thanhliem26/SearchUserGitHub/blob/main/src/components/pages/UserSearch/UserList/UserInfo.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            View
          </a>
        )
      },
    },
  ]

  const onShowSizeChange = (page, size) => {
    console.log('check', page, size)
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
            data={dataTable}
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
            styleBody={{ detail: { position: 'tb_end' } }}
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
    </div>
  )
}

export default Index
