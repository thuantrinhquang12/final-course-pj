import React, { useState } from 'react'
import { Table, Row, Col } from 'antd'
import { dateTime } from '../../../index'
import styles from './Index.module.scss'
import './Index.scss'

const Index = () => {
  const [page, setPage] = useState(10)

  const dataSource = [
    {
      key: '1',
      no: '1',
      subject: 'Chính sách bảo hiểm 2022',
      author: 'Nguyễn Thị Hương',
      toDepartment: 'All',
      publishedDate: '2022/09/29',
      attchment: 'link Official Notice',
      detail: 'View',
      fixed: 'left',
    },
    {
      key: '2',
      no: '2',
      subject: 'Giới thiệu phúc lợi của công ty',
      author: 'Nguyễn Thị Hương',
      toDepartment: 'All',
      publishedDate: '2022/03/20',
      attchment: 'link Official Notice',
      detail: 'View',
      fixed: 'left',
    },
    {
      key: '3',
      no: '3',
      subject: 'Qui trình phỏng vấn',
      author: 'Nguyễn Thị Hương',
      toDepartment: 'HRD',
      publishedDate: '2022/04/20',
      attchment: 'link Official Notice',
      detail: 'View',
    },
    {
      key: '4',
      no: '4',
      subject: 'Thông báo chuyển văn phòng',
      author: 'Nguyễn Thị Hương',
      toDepartment: 'All',
      publishedDate: '2022/05/20',
      attchment: 'link Official Notice',
      detail: 'View',
    },
    {
      key: '5',
      no: '5',
      subject: 'Hướng dẫn thủ tục thoi sản',
      author: 'Nguyễn Thị Hương',
      toDepartment: 'BRC',
      publishedDate: '2022/06/20',
      attchment: 'link Official Notice',
      detail: 'View',
    },
    {
      key: '6',
      no: '6',
      subject: 'An toàn thông tin',
      author: 'Đỗ Nam Hải',
      toDepartment: 'All',
      publishedDate: '2022/07/20',
      attchment: 'link Official Notice',
      detail: 'View',
    },
  ]

  const columns = [
    {
      title: <p className={styles.whiteColor}>No</p>,
      dataIndex: 'no',
      key: 'no',
      render: (payload) => {
        return <p>{payload}</p>
      },
    },
    {
      title: <p className={styles.whiteColor}>Subject</p>,
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
      dataIndex: 'author',
      key: 'author',
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
      dataIndex: 'toDepartment',
      key: 'toDepartment',
      render: (payload) => {
        return <p className={styles.tableHeader}>{payload}</p>
      },
    },
    {
      title: (
        <p className={`${styles.tableHeader} ${styles.whiteColor}`}>
          Published Date
        </p>
      ),
      dataIndex: 'publishedDate',
      key: 'publishedDate',
      sorter: (a, b) => {
        const prevDate = new Date(a.publishedDate)
        const NowDate = new Date(b.publishedDate)
        return prevDate.getTime() - NowDate.getTime()
      },
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
      dataIndex: 'attchment',
      key: 'attchment',
      render: (payload) => {
        return (
          <a
            href="https://github.com/thanhliem26/SearchUserGitHub/blob/main/src/components/pages/UserSearch/UserList/UserInfo.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            {payload}
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
            {payload}
          </a>
        )
      },
    },
  ]

  const handleStylePage = (number) => {
    return number === page
      ? {
          color: '#1e72cf',
        }
      : null
  }

  return (
    <>
      <div className={styles.listNotice} style={{ width: '100%' }}>
        <Row style={{ height: '100%' }}>
          <Col xs={24} md={12} xl={12}>
            <div className={styles.titleNotice}>
              <h1>Official Notice</h1>
            </div>
          </Col>
          <Col xs={24} md={12} xl={12}>
            <div className={styles.itemPage}>
              <h3>
                Item per page:
                <span
                  style={handleStylePage(10)}
                  onClick={() => setPage((prev) => 10)}
                >
                  10,
                </span>
                <span
                  style={handleStylePage(20)}
                  onClick={() => setPage((prev) => 20)}
                >
                  20,
                </span>
                <span
                  style={handleStylePage(50)}
                  onClick={() => setPage((prev) => 50)}
                >
                  50.
                </span>
              </h3>
            </div>
          </Col>
        </Row>
      </div>
      <Table
        className="tableNotice"
        pagination={{ pageSize: page }}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1000,
          y: 300,
        }}
      />
    </>
  )
}

export default Index
