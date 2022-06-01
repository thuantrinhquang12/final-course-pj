import React, { useState } from 'react'
import moment from 'moment'
import { Button, Space, Form, DatePicker } from 'antd'
import { Typography } from 'antd'
import { Radio } from 'antd'
import { Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './searchField.scss'
import 'antd/dist/antd.min.css'
import TableTimeSheet from '../table-search'

const { RangePicker } = DatePicker
const { Option } = Select
const { Title, Text } = Typography
const dateFormat = 'DD/MM/YYYY'
export default function SearchField(props) {
  const [choose, setChoose] = useState(1)
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  const [form] = Form.useForm()
  const onChangeChoose = (e) => {
    setChoose(e.target.value)
    console.log(choose)
  }

  return (
    <>
      <div className="search-field">
        <Form
          form={form}
          layout="horizontal"
          name="form_searchList"
          className="searchList"
          onFinish={onFinish}
          scrollToFirstError
          initialValues={{
            selected_date: 'this month',
            selected: 1,
            sort: 'ascending',
            dateRange: [
              moment('26/05/2022', dateFormat),
              moment('26/05/2022', dateFormat),
            ],
            radioGroup: 2,
          }}
        >
          <Title level={3}>My Time Sheet</Title>
          <div className="search-form">
            <div className="selected_choose">
              <Form.Item name="selected">
                <Radio.Group
                  name="radioGroup"
                  onChange={onChangeChoose}
                  value={choose}
                >
                  <Space direction="vertical" size={50}>
                    <Radio value={1}>Choose from list</Radio>
                    <Radio value={2}>Choose start, end</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className="selected_data">
              <Form.Item name="selected_date">
                <Select style={{ width: 150 }} disabled={choose === 2}>
                  <Option value="this month">This month</Option>
                  <Option value="last month">Last month</Option>
                  <Option value="last year">Last year</Option>
                  <Option value="all">All</Option>
                </Select>
              </Form.Item>
              <Form.Item name="dateRange">
                <RangePicker format={dateFormat} disabled={choose === 1} />
              </Form.Item>
            </div>
            <div className="selected_sort">
              <Text>Sort by work date</Text>
              <Form.Item name="sort">
                <Select style={{ width: 150 }}>
                  <Option value="ascending">Ascending</Option>
                  <Option value="descending">Descending</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="button-form-search">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              size="large"
              htmlType="submit"
            >
              Search
            </Button>
            <Button size="large">Reset</Button>
          </div>
        </Form>
        <TableTimeSheet></TableTimeSheet>
      </div>
    </>
  )
}
