import React, { useState } from 'react'
import 'antd/dist/antd.min.css'
import { Table } from 'antd'
import { Row, Col } from 'antd'
import styles from './index.module.scss'
import { typePopup } from '../../../index'
import { Scrollbars } from 'react-custom-scrollbars'
const Index = () => {
  const [page, setPage] = useState(10)
  const Department = 'HRD'

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
      title: 'No',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'To Department',
      dataIndex: 'toDepartment',
      key: 'toDepartment',
    },
    {
      title: 'publishedDate',
      dataIndex: 'publishedDate',
      key: 'publishedDate',
      sorter: (a, b) => {
        const prevDate = new Date(a.publishedDate)
        const NowDate = new Date(b.publishedDate)
        return prevDate.getTime() - NowDate.getTime()
      },
    },
    {
      title: 'Attachment',
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
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
      render: (payload, item) => {
        return (
          <p
            onClick={() => {
              console.log(typePopup)
              if (
                item.toDepartment === 'All' ||
                Department === item.toDepartment
              ) {
                typePopup.popupNotice(
                  typePopup.SUCCESS_MESSAGE,
                  'Thành công',
                  'Quí lắm ms cho đọc nha!',
                  1,
                )
              } else {
                typePopup.popupNotice(
                  typePopup.ERROR_MESSAGE,
                  'Thát bại',
                  'Xin lõi, bạn méo có quyền đọc thông báo này!',
                  1,
                )
              }
            }}
          >
            {payload}
          </p>
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
      <Scrollbars style={{ width: '100%', height: '100%' }}>
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
      </Scrollbars>
      <Table
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
